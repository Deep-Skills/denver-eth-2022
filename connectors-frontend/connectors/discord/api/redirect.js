const redirectUri = require('../helpers/discordRedirectUrl')
const { DISCORD_APP_CLIENT_ID } = process.env
const DiscordService = require('../services/discordService')

const redirect = async (req, res) => {
  const { address, return_url, signature, digest, encrypt } = req.query
  const addressFromSignature = DiscordService.getVerifiedAddress(
    digest,
    signature
  )

  if (addressFromSignature !== address) {
    throw new Error('Invalid address')
  }

  const clientId = DISCORD_APP_CLIENT_ID
  const scope = 'identify guilds'
  const state = encodeURIComponent(address) // NOTE: kind of hack
  const responseType = 'code' // token
  const encodedScope = encodeURIComponent(scope)

  const authorizationUrl = `https://discord.com/api/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&scope=${encodedScope}&state=${state}`

  const encodedRedirectUri = encodeURIComponent(redirectUri)
  const url = `${authorizationUrl}&redirect_uri=${encodedRedirectUri}&prompt=consent`

  res.status(200).json({ url })
}

module.exports = redirect
