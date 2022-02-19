import { getProvider, requestAccounts } from '../provider'

export const coordinapeConnector = async (encrypt) => {
  const provider = await getProvider()
  await requestAccounts(provider)
  const signer = provider.getSigner()
  let now = Math.floor(Date.now() / 1000)
  const address = await signer.getAddress()

  const dataSign = `Login to Coordinape ${now}`
  const signature = await signer.signMessage(dataSign)
  return await coordinapeApi({
    signature,
    address,
    signature,
    data: dataSign,
    encrypt
  })
}

export const coordinapeApi = async ({ signature, address, data, hash, encrypt = true }) => {
  return fetch(`/api/coordinape`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signature,
      address,
      data,
      hash,
      encrypt,
    }),
  }).then(res => res.json())
}
