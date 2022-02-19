'use strict'

const SourceCredService = require('../services/sourceCredService')
const ISSUE_CREDENTIALS_TYPE = 'sourcecreds'
const IssuerService = require('../services/issuerService')
const schema = require('../helpers/schema')
const withTimeout = require('../helpers/withTimeout')
const ethers = require('ethers')

const issuer = new IssuerService()

const pullSourceCredData = withTimeout(async (req, res) => {
  try {
    let { identifiers, did, digest, signature, encrypt } = req.query
    // TODO: instead of identifiers recieve Github and Discord VCs, check it map accounts names based on that
    if (!identifiers?.length) {
      throw new Error('identifiers is empty')
    }
    identifiers = identifiers.split(',')

    const addressFromSignature = ethers.utils.verifyMessage(digest, signature)
    if (addressFromSignature !== did) {
      throw new Error('Invalid address')
    }

    const sourceCredService = new SourceCredService()
    const rawData = await sourceCredService.pullData()

    const preparedDataForIssue = sourceCredService.prepareDataForIssuer(
      rawData.participants(),
      identifiers
    )

    const validationResults = await issuer.validateDataAgainstSchema(
      preparedDataForIssue,
      schema
    )

    if (validationResults.errors.length > 0) {
      throw new Error('schema got changed')
    }

    preparedDataForIssue.holderDid = did
    const issueResult = await issuer.issueStructeredData(
      preparedDataForIssue,
      ISSUE_CREDENTIALS_TYPE,
      encrypt
    )

    res.status(200).json(issueResult)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

module.exports = pullSourceCredData
