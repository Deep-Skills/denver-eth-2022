import { getProvider, requestAccounts, takeMessageFromLocalStorageOrSign } from '../provider'

export const githubApi = async ({  encrypt }) => {
  const provider = await getProvider()
  await requestAccounts(provider)
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const { signature, digest } = await takeMessageFromLocalStorageOrSign()
  let params = new URLSearchParams({
    address,
    encrypt,
    signature,
    digest,
    return_url: window?.location?.href,
  })
  return fetch(`/api/github/redirect?${params.toString()}`, {
    method: "GET",
  }).then(res => res.json())
}

export const githubConnector = async ({ encrypt }) => {
  return await githubApi({ encrypt }).then(({ url }) => url)
}
