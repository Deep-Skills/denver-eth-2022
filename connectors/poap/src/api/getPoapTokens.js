'use strict'

const PoapService = require('../services/poapService')
const IssuerService = require('../services/issuerService')
const schema = require('../helpers/schema')
const withTimeout = require('../helpers/withTimeout')
const ISSUE_CREDENTIALS_TYPE = 'poaps'

const poapService = new PoapService()
const issuer = new IssuerService()

const getPoapTokens = withTimeout(async (req, res) => {
  try {
    const { address, signature, digest, encrypt } = req?.body
    const addressFromSignature = poapService.getVerifiedAddress(
      digest,
      signature
    )
    if (addressFromSignature !== address) {
      throw new Error('Invalid address')
    }
    const tokens = (await poapService.getTokensInfoOwnedBy(address))?.[0]
    let result = await issuer.validateDataAgainstSchema(tokens, schema)
    if (result.errors.length > 0) {
      throw new Error('schema got changed')
    }

    tokens.holderDid = address
    let results = await issuer.issueStructeredData(
      tokens,
      ISSUE_CREDENTIALS_TYPE,
      encrypt
    )
    res.status(200).json({ tokens, results })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = getPoapTokens
