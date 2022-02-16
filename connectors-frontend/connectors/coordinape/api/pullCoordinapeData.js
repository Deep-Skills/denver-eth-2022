'use strict'

const CoordinApeService = require('../services/coordinApeService')
const IssuerService = require('../services/issuerService')
const schema = require('../helpers/schema')
const { ISSUE_CREDENTIALS_TYPE } = process.env
const issuerService = new IssuerService()
const withTimeout = require('../helpers/withTimeout')

const pullCoordinapeData = withTimeout(async (req, res) => {
  console.log('pullCoordinapeData')
  try {
    const { signature, address, data, hash } = req.body

    const coordinApeService = new CoordinApeService({
      signature,
      address,
      data,
      hash,
    })
    const token = await coordinApeService.getToken()
    coordinApeService.setToken(token)
    const pulledData = await coordinApeService.pullData()
    let validationResults = await issuerService.validateDataAgainstSchema(
      pulledData,
      schema
    )
    if (validationResults.errors.length > 0) {
      throw new Error('schema got changed')
    }
    let results = await issuerService.issueStructeredData(
      pulledData,
      ISSUE_CREDENTIALS_TYPE
    )

    const cordinapeProfileVCData = {
      skills: results?.profile?.skills,
      rest: results,
    }

    res.status(200).json({ cordinapeProfileVCData, results })
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: e.message })
  }
})

module.exports = pullCoordinapeData
