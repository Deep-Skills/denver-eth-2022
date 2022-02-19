import { getProvider, requestAccounts, takeMessageFromLocalStorageOrSign } from '../provider'

export const sourcecredApi = async (identifiers, did, digest, signature, encrypt) => {
  return fetch(
    `/api/sourcecred?identifiers=${identifiers}&did=${did}&digest=${digest}&signature=${signature}&encrypt=${encrypt}`,
    {
      method: "GET",
    }
  ).then(res => res.json())
}

export const sourcecredConnector = async (encrypt = false) => {
  const identifiers = ["dmfilipenko", "Dmytro-Filipenko"]
  const provider = await getProvider()
  await requestAccounts(provider)
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const { signature, digest } = await takeMessageFromLocalStorageOrSign()
  return await sourcecredApi(
    identifiers,
    address,
    digest,
    signature,
    encrypt
  )
}

