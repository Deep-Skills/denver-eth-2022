import { getProvider, requestAccounts, takeMessageFromLocalStorageOrSign } from "../provider"
export const poapApi = async ({ signature, address, digest, encrypt }) => {
  return fetch(`/api/poap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signature,
      address,
      digest,
      encrypt
    }),
  }).then(res => res.json())
}

export const poapConnector = async (encrypt = false) => {
  const provider = await getProvider()
  await requestAccounts(provider)
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const { signature, digest } = await takeMessageFromLocalStorageOrSign()
  return await poapApi({
    address,
    signature,
    digest,
    encrypt
  })
}
