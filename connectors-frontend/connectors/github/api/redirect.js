let { GITHUB_APP_CLIENT_ID, HOST } = process.env
const GithubService = require('../services/githubService')

const redirect = async (req, res) => {
  const { address, signature, digest, encrypt, return_url } = req.query
  const addressFromSignature = GithubService.getVerifiedAddress(
    digest,
    signature
  )

  if (addressFromSignature !== address) {
    throw new Error('Invalid address')
  }
  const clientId = GITHUB_APP_CLIENT_ID
  const scope = 'read:user'
  const encodedScope = encodeURIComponent(scope)

  const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${encodedScope}`
  const redirectUri = `${HOST}/api/github/callback?address=${encodeURIComponent(
    address
  )}&return_url=${encodeURIComponent(return_url)}&encrypt=${encrypt}`

  const encodedRedirectUri = encodeURIComponent(redirectUri)
  const url = `${authorizationUrl}&redirect_uri=${encodedRedirectUri}`

  res.status(200).json({ url })
}

module.exports = redirect
