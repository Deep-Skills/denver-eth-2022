import styles from "../styles/Home.module.css"
import { Header } from "../components/Header"
import { HugeTitle } from "../components/HugeTitle"
import { ConnectWallet } from "../components/ConnectWallet"
import { Box, Text, Image } from '@chakra-ui/react'
import { listenConnectionMetamask, connectMetamask, isMetamaskConnected } from "../services/metamask"
import { takeMessageFromLocalStorageOrSign } from "../services/provider"
import { useEffect, useState } from "react"
import { LitProtocolService } from "../services/litProtocolService"
import { DeepSkillsService } from "../services/DeepSkillsService"
import CeramicClient from "@ceramicnetwork/http-client"

export default function Home({ ceramicUrl }) {
  const [isConnected, setIsConnected] = useState(false)
  // const [ceramic, setCeramic] = useState()
  useEffect(() => {
    listenConnectionMetamask(setIsConnected)
    isMetamaskConnected().then(setIsConnected)
  }, [])
  const connectMetamaskHandler = async () => {
    try {
      await connectMetamask()
      const message = await takeMessageFromLocalStorageOrSign()
      localStorage.setItem('signedMessage', JSON.stringify(message))
      window.location = '/connectors'
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (!isConnected) {
      localStorage.removeItem('signedMessage')
    }
    
  }, [isConnected])
  const goToConnectors = () => {
    window.location = '/connectors'
  }
  return (
    <>
      <Header isMetamaskConnected={isConnected} onClick={connectMetamaskHandler} />
      <div className={styles.landing}>
        <div className={styles.hero}>
          <HugeTitle>Text</HugeTitle>
          <br />
          <Text fontSize='xl' color='#1D1E20'>
            Claim, explore and share your professional identity based on merit, skills and real working and learning experience. </Text>
          <br />
          <ConnectWallet isMetamaskConnected={isConnected} onClick={isConnected ? goToConnectors : connectMetamaskHandler} />
        </div>
        <div className={styles.hero}>
          <Box boxSize='lg'>
            <Image src='https://i.imgur.com/9AHOMSW.png' />
          </Box>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props:
    {
      ceramicUrl: process.env.CERAMIC_URL,
      chain: process.env.CHAIN
    }
  }
}