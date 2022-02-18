'use strict'

const DiscordService = require('../services/discordService')
const IssuerService = require('../services/issuerService')
const { ISSUE_CREDENTIALS_TYPE = 'discords', FRONTEND_REDIRECT_URL } = process.env
const schema = require('../helpers/schema')

const issuer = new IssuerService()

const callback = async (req, res) => {
  try {
    const { code, state: address, encrypt = false, return_url } = req.query

    const discordService = await DiscordService.initialize(code)
    const userData = await discordService.getUserData()
    const userServers = await discordService.getUserServers()

    const servers = discordService.prepareDataForIssuing(userServers)

    const validationResults = await issuer.validateDataAgainstSchema(
      { servers },
      schema
    )

    if (validationResults.errors.length > 0) {
      throw new Error('schema got changed')
    }

    const issueResult = await issuer.issueStructeredData(
      { servers, holderDid: address },
      ISSUE_CREDENTIALS_TYPE,
      encrypt
    )

    userData.did = address

    const userVCData = userData
    const serversVCData = userServers


    res.status(302).redirect(return_url || FRONTEND_REDIRECT_URL)
  } catch (e) {
    res.status(302).redirect(return_url || FRONTEND_REDIRECT_URL)
  }
}

module.exports = callback
