import { coordinapeConnector } from "../services/connectors/coordinape"
import { poapConnector } from "../services/connectors/poap"
import { sourcecredConnector } from "../services/connectors/sourcecred"
import { discordConnector } from "../services/connectors/discord"
import { githubConnector } from "../services/connectors/github"

import { Header } from "../components/Header"

import { VStack, Button, Text, Box, Container, Grid, HStack, GridItem, Heading } from "@chakra-ui/react"
import { OrgBox, OrgBoxLoading } from "../components/OrgBox"
import { Section } from "../components/Section"
import { SkillBox, SkillBoxLoading } from "../components/SkillBox"
import { Collaborator, CollaboratorLoading } from "../components/Collaborator"
import { ProjectBox, ProjectBoxLoading } from "../components/ProjectBox"
import { listenConnectionMetamask, connectMetamask, isMetamaskConnected } from "../services/metamask"
import { useEffect, useState } from "react"
import { LitProtocolService } from "../services/litProtocolService"
import { DeepSkillsService } from "../services/DeepSkillsService"
import CeramicClient from "@ceramicnetwork/http-client"

const ConnectorButton = ({ notes, isLoading, isConnected, children, icon, bg, color = 'white', onClick, ...rest }) => {
  const [innerState, setInnerState] = useState({
    state: 'idle',
  })
  const onClickHandler = async () => {
    if (innerState.state === 'loading') return
    setInnerState({
      state: 'loading',
      message: null
    })
    try {
      let res = await onClick()
      if (res?.error) throw new Error(res.error)
      setInnerState({
        state: 'idle',
      })
    } catch (e) {
      setInnerState({
        state: 'error',
        message: e.message,
      })
    }
  }
  return (
    <Box >
      <VStack>
        <Button leftIcon={icon} bg={bg} color={color} size='lg' isLoading={isLoading || innerState.state == 'loading'} _hover={{
          boxShadow: "0 0 0 4px yellow",
        }} onClick={onClickHandler} {...rest}>
          {children}
        </Button>
        {innerState.message && <Text mt="10px" color="red" fontSize="sm" h="20px" w="100%">Got error: {innerState.message}</Text>}
      </VStack>
      <Text h="14px" textAlign="center">{isConnected && '*Connected'}</Text>

    </Box>
  )
}
export default function Connectors({
  ceramicUrl,
}) {
  const [isConnected, setIsConnected] = useState(null)
  const [graph, setGraph] = useState(null)
  const [sourceConnected, setSourceConnected] = useState(null)
  useEffect(() => {
    listenConnectionMetamask(setIsConnected)
    isMetamaskConnected().then(setIsConnected)
  }, [])

  useEffect(() => {
    console.log('GOGOOG')
    if (isConnected) {
      LitProtocolService.initlize().then((litProtocolService) => {
        window.litProtocolService = litProtocolService
        const ceramic = new CeramicClient(ceramicUrl)
        const deepSkillsService = new DeepSkillsService(ceramic, window.ethereum)
        return deepSkillsService.pullMySkills()
      }).then(d => {
        setGraph(d)
      })
    }
    if (isConnected === false) {
      localStorage.removeItem('signedMessage')
      window.location = '/'
    }
  }, [isConnected, ceramicUrl, sourceConnected])

  const [connectedConector, setConnectedConector] = useState({
    poap: null,
    discord: null,
    github: null,
    sourcecred: null,
    coordinape: null,
  })
  useEffect(() => {
    if (graph) {
      setConnectedConector({
        poap: Boolean(graph.find(x => x.type === 'poaps')),
        discord: Boolean(graph.find(x => x.type === 'discords')),
        github: Boolean(graph.find(x => x.type === 'githubs')),
        sourcecred: Boolean(graph.find(x => x.type === 'sourcecreds')),
        coordinape: Boolean(graph.find(x => x.type === 'apeprofiles')),
      })
    }

  }, [graph])
  const sourceClickHandler = (handler) => async () => {
    try {
      const resp = await handler()
      if (!resp?.error) {
        setGraph(null)
        setSourceConnected(Date.now())
      }
      return resp
    } catch {
      console.warn('ERRROR')
    }



  }
  return (

    <>
      <Header hideConnectButton={true} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(5, 1fr)'
          px={44}
          w="100%"
        >
          <GridItem colSpan={5} pr="50px">
            <Heading as="h1" size="xl" color="black" textAlign={"center"}>
              Set up your profile
            </Heading>
            <Text fontSize="xl" color="black" textAlign={"center"} m="40px">
              Connect accounts
            </Text>
            <Text color="black" textAlign={"center"}>
              Connect your accounts to enrich your profile with skills, contributions and credentials.
            </Text>
            <HStack spacing={10} justifyContent="center" mt="20px" alignItems="flex-start">
              <ConnectorButton
                bg="primary"
                color="white"
                isLoading={!graph}
                // disabled={connectedConector.coordinape}
                onClick={sourceClickHandler(async () => coordinapeConnector(true))}
                isConnected={connectedConector.coordinape}
              >
                Coordinape
              </ConnectorButton>
              <ConnectorButton
                bg="primary"
                color="white"
                isLoading={!graph}
                onClick={sourceClickHandler(async () => poapConnector(true))}
                isConnected={connectedConector.poap}
              >
                POAP
              </ConnectorButton>

              <ConnectorButton bg="primary" color="white" isLoading={!graph}
                isConnected={connectedConector.sourcecred}
                onClick={sourceClickHandler(async () => sourcecredConnector(false))}
                
              >
                Sourcecred*
              </ConnectorButton>
              <ConnectorButton bg="black" color="white" isLoading={!graph}
                // disabled={connectedConector.github}
                isConnected={connectedConector.github}
                onClick={sourceClickHandler(async () => githubConnector(true).then((url) => {
                  window.location = url
                }))}
              >
                Github
              </ConnectorButton>

              <ConnectorButton
                bg="#5165F6"
                color="white" isLoading={!graph}
                isConnected={connectedConector.discord}
                onClick={sourceClickHandler(async () => discordConnector(true).then((url) => {
                  window.location = url
                }))}
              >
                Discord
              </ConnectorButton>
            </HStack>
            <HStack mt="100px" alignItems="center" justifyContent="center">
              <Button

                as="a"
                color="white"
                bg="primary"
                href="/profile"
              >
                Explore your profile →
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </Box>

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