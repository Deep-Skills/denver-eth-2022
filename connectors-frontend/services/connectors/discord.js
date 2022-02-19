import { getProvider, requestAccounts, takeMessageFromLocalStorageOrSign } from '../provider'


export const discordApi = async ({ identifiers, encrypt }) => {
  const provider = await getProvider()
  await requestAccounts(provider)
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const { signature, digest } = await takeMessageFromLocalStorageOrSign()
  let params = new URLSearchParams({
    address,
    identifiers,
    encrypt,
    signature,
    digest,
    return_url: window?.location?.href,
  })
  return fetch(`/api/discord/redirect?${params.toString()}`, {
    method: "GET",
  }).then(res => res.json())
}

export const discordConnector = async ({ identifiers, encrypt }) => {
  return await discordApi({ identifiers, encrypt }).then(({ url }) => url)
}
