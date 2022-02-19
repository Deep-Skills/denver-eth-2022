
import { Text, Box, Container, Grid, HStack, GridItem, Heading, Button } from "@chakra-ui/react"
import { Header } from "../components/Header"
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

export default function Profiles({
  ceramicUrl,
}) {
  const [isConnected, setIsConnected] = useState(null)
  const [graph, setGraph] = useState(null)
  const [skills, setSkills] = useState(null)
  const [collaborators, setCollaborators] = useState(null)
  const [projects, setProjects] = useState(null)
  const [organisation, setOrganisation] = useState(null)
  const [showMore, setShowMore] = useState(false)

  const showMoreOrganisation = () => setShowMore(prev => !prev)

  useEffect(() => {
    listenConnectionMetamask(setIsConnected)
    isMetamaskConnected().then(setIsConnected)
  }, [])

  useEffect(() => {
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
  }, [isConnected, ceramicUrl])

  useEffect(() => {
    if (graph) {
      const apeprofiles = graph?.filter(x => x.type === 'apeprofiles')
      const poaps = graph?.filter(x => x.type === 'poaps')
      const github = graph?.filter(x => x.type === 'githubs')
      const apeSkills = Array.from(new Set(apeprofiles?.flatMap(x => x.skills))).slice(0, 3)
      const githubSkills = Array.from(new Set(github?.flatMap(x => x.languages))).slice(0, 3)
      const poapsSkill = Array.from(new Set(poaps?.flatMap(x => ({
        title: x.title,
        description: x.description,
        image: x.image
      }))))
      setSkills({
        poaps: poapsSkill,
        ape: apeSkills,
        github: githubSkills
      })
    }
  }, [graph])

  useEffect(() => {
    if (graph) {
      const apeprofiles = graph?.filter(x => x.type === 'apeprofiles')
      let profiles = Array.from(new Set(apeprofiles?.flatMap(x => x.collaborators).map(JSON.stringify))).map(JSON.parse)
      setCollaborators(profiles)
    }
  }, [graph])

  useEffect(() => {
    if (graph) {
      const apeprofiles = graph?.filter(x => x.type === 'apeprofiles')
      setProjects(apeprofiles)
    }
  }, [graph])

  useEffect(() => {
    if (graph) {
      const discords = graph?.filter(x => x.type === 'discords')
      const sourcecreds = graph?.filter(x => x.type === 'sourcecreds')
      const discordOrganisation = Array.from(new Set(discords?.flatMap(x => x.servers).map(JSON.stringify))).map(JSON.parse).sort((a, b) => a.servername.length - b.servername.length)
      setOrganisation({
        discord: discordOrganisation,
        sourcecred: sourcecreds
      })
    }
  }, [graph])


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
          <GridItem colSpan={4} pr="50px">
            <Section title="Skills">
              <Heading size="md" fontWeight="bold" mb="8" color="black">Skills</Heading>
              <Box ml="-10px" mt="-10px">
                {!skills ? <SkillBoxLoading /> : skills?.poaps.map((skill, idx) => (
                  <SkillBox
                    key={idx}
                    skill={skill.title}
                    description={skill.description}
                    source={"Poaps"}
                  />
                ))}
                {!skills && (
                  <>
                    <SkillBoxLoading />
                    <SkillBoxLoading />
                  </>
                )}
                {skills?.ape?.length > 0 && <SkillBox skill={skills?.ape.join(', ')} source={"Coordinape"} />}
                {skills?.github?.length > 0 && <SkillBox skill={skills?.github.join(', ')} source={"Github"} />}
                {(skills?.github?.length == 0 && skills?.ape?.length == 0 && skills?.poaps?.length == 0) && (
                  <Box ml="10px">
                    <Text>Connect coordinape, github and poap to see all your skills</Text>
                    <Button as="a" href="/connectors">Connect</Button>
                  </Box>
                )}
              </Box>
            </Section>
            <Section title="Projects">
              <Heading size="md" fontWeight="bold" mb="8" color="black">Projects</Heading>
              <Box mt="-10px" ml="-10px" alignItems={"flex-start"}>
                {!projects ? <ProjectBoxLoading /> : projects?.map((ape, idx) => {
                  const parsedDate = ape.date ? new Date(ape.date) : new Date()
                  return (
                    <ProjectBox
                      key={idx}
                      organizationName={ape.circle}
                      tag={ape.skills}
                      dateRange={`${parsedDate.getDate().toString().padStart(2, 0)}-${parsedDate.getMonth().toString().padStart(2, 0)}-${parsedDate.getFullYear()}`}
                      gives={ape.givesReceived}
                      users={ape.collaborators}
                    />
                  )
                })}
                {projects?.length == 0 && (
                  <Box ml="10px">
                    <Text>Connect coordinape to see your projects</Text>
                    <Button as="a" href="/connectors" color="black">Connect</Button>
                  </Box>
                )}
              </Box>
            </Section>
          </GridItem>
          <GridItem>
            <Section>
              <Heading size="md" fontWeight="bold" mb="40px" color="black">Organizations</Heading>
              <Text fontWeight="bold" color="black" mt="-25px">Sourcecred</Text>
              {!organisation?.sourcecred && (
                <>
                  <OrgBoxLoading />
                  <OrgBoxLoading />
                </>
              )}
              {organisation?.sourcecred?.length == 0 && (
                <Box my="20px">
                  <Text>Connect sourcecred to see your organisations list</Text>
                  <Button as="a" href="/connectors" color="black">Connect</Button>
                </Box>
              )}
              {!organisation?.sourcecred ? <OrgBoxLoading /> : organisation?.sourcecred?.map((sourcecred, idx) => (
                <OrgBox
                  key={idx}
                  organizationName={sourcecred.instance}
                  reputationScore1={sourcecred.credScore}
                />
              ))}

              <Text fontWeight="bold" color="black">Discord</Text>
              {!organisation?.discord && (
                <>
                  <OrgBoxLoading />
                  <OrgBoxLoading />
                </>
              )}
              {!organisation?.discord ? <OrgBoxLoading /> : organisation?.discord?.slice(0, 5)?.map((discord, idx) => (
                <OrgBox
                  key={idx}
                  organizationName={discord.servername}
                  organizationImage={`https://cdn.discordapp.com/icons/${discord.servericon}/${discord.serverid}.webp?size=40`}
                />
              ))}
              {organisation?.discord?.length == 0 && (
                <Box my="20px">
                  <Text>Connect discord to see your organisations list</Text>
                  <Button as="a" href="/connectors" color="black">Connect</Button>
                </Box>
              )}
              {organisation?.discord?.length > 0 && showMore && organisation?.discord?.slice(5).map((discord, idx) => (
                <OrgBox
                  key={idx}
                  organizationName={discord.servername}
                  organizationImage={`https://cdn.discordapp.com/icons/${discord.servericon}/${discord.serverid}.webp?size=40`}
                />
              ))}
              {organisation?.discord.length > 0 && <Text onClick={showMoreOrganisation} color="black" textDecoration="dotted" _hover={{
                cursor: 'pointer',
              }}>{!showMore ? 'Show more' : 'Hide more'}</Text>
              }
            </Section>
            <Section>
              <Heading size="md" fontWeight="bold" mb="8" color="black">Collaborators</Heading>
              {!collaborators ? <CollaboratorLoading /> : collaborators.map((collaborator, idx) => (
                <Collaborator
                  key={idx}
                  profileImg={collaborator.avatar}
                  name={collaborator.username}
                  address={collaborator.address} />
              ))}
              {!collaborators && (
                <>
                  <CollaboratorLoading />
                  <CollaboratorLoading />
                </>
              )}
              {collaborators?.length == 0 && (
                <Box>
                  <Text>Connect coordinape to see collaborators</Text>
                  <Button as="a" href="/connectors" color="black">Connect</Button>
                </Box>
              )}
            </Section>
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
