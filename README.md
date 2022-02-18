# Decentralized Professional Identity Protocol
This application enables portability and verifiability of professional reputation aggregated from a number of sources (SourceCred, CoordinApe, Colony, POAP, Github, Discord, Twitter). The protocol gives full control over credentials to the user and avoids any points of centralized storage or verification of data.

This project demonstrates **bring your own data/credentials** concept:
- All data is issued by independent 3rd parties, such as Coordinape, Github, SourceCred instance
- By connecting your wallet with an application, it can request and read data from user's data stream
- Users are ultimately in control regarding who can see their reputation and credentials
- Any application or protocol is free to add their own connector for data issuance

We leverage various decentralized technologies, such as [Ethereum](https://ethereum.org/), [Decentralized Identifiers](https://www.w3.org/TR/did-core/), [Ceramic Network](https://ceramic.network/), [IPFS](https://ipfs.io/), [Lit Protocol](https://litprotocol.com/), [POAP](https://app.poap.xyz/).



This project was built during ETHDenver 2022 BUIDLathon. 

## Deployed demo version lives [here](https://denver-eth-2022-one.vercel.app/)

## Overview

Project Contains:

- Multiple connectors (pulling data from connector specific data hub)
- Issuer module: recieves data from trusted data connector and issue (sign) strctured [Ceramic](https://ceramic.network/) data according to the specific schema and store that data at the [Ceramic Stream](https://developers.ceramic.network/streamtypes/overview/)
- Frontend App 1
- Frontend App 2 (at this iteration just '../profile' page of main application)


Protocol supports flexible way of adding new data connectors. Currently supported connectors:

- [Githib](https://github.com/)
- [Coordinape](https://coordinape.com/)
- [Sourcecred](https://sourcecred.io/)
- [Discord](https://discord.com/)
- [Poap](https://poap.xyz/)


## Structure
For simplicity of deployment - all was wrapped into the one severless front end [application](https://github.com/DenisPopov15/denver-eth-2022/tree/main/connectors-frontend)

- Reference implementation of issuer as services/servers [issuer as a server](https://github.com/DenisPopov15/denver-eth-2022/tree/main/issuer)
- Reference implementation of connectors as services/servers: [server connectors](https://github.com/DenisPopov15/denver-eth-2022/tree/main/connectors)
- [Front end application](https://github.com/DenisPopov15/denver-eth-2022/tree/main/connectors-frontend)
- Serverless implementation as part of one app for [connectors](https://github.com/DenisPopov15/denver-eth-2022/tree/main/connectors-frontend/connectors)
- Serverless implementation as part of one app for [issuer](https://github.com/DenisPopov15/denver-eth-2022/tree/main/connectors-frontend/issuer)


## Setup

 - Not Required, but good to have whole system to run locally: Make sure you have setup [pm2](https://www.npmjs.com/package/pm2) on your machine
 - Setup SourceCred instance, go to the `connectors/sourceCred/instance` - create `.env` from `.env.example`, set there SOURCECRED_GITHUB_TOKEN, for this: [setup github token](https://github.com/settings/tokens) with read packages access only. And SOURCECRED_DISCORD_TOKEN - its discord bot token (for hackathon test purpose - ask Denis to provide it, specially setup for this purpose)
 - Go to connectors (+ issuer) folder and create `.env` file from `.env.example` there you will need mostly just add SERVICE_PRIVATE_KEY for each connector (which should/could be the same for each connector) and then set for the issuer `.env` paired to that TRUSTED_PUBLIC_KEY
 - Install dependencies for each services - just run `npm run fullInstall` from root project folder
 - Run the system `npm run startSystem` (will work only if pm2 installed)

## Frontend
You will need to create `.env.local` file in the `connectors-frontend` folder and set the following variables:

## Connectors

### Poap
To properly work with Poap you need to setup your ankr instance with the following:
`ANKR_JSONRPC_API_ENDPOINT`:
1. you need to register in the [Ankr](https://app.ankr.com/auth/login) 
2. select xDai network
3. Authorization with token when you create your xDai server

Also, [Poap smart contract](https://explorer.anyblock.tools/ethereum/poa/xdai/address/0x22c1f6050e56d2876009903609a2cc3fef83b415/) you can find ABIfor Poap contract.
