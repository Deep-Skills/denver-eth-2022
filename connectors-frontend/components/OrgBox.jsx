import { Box, Skeleton } from "@chakra-ui/react"
import {
  ReputationScore1,
  ReputationScore2,
} from "./ReputationScore/ReputationScore"
import { OrganizationButton } from "./OrganizationButton"

export const OrgBoxLoading = () => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      h="60px"
      mb="10px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Skeleton h="100%"></Skeleton>
    </Box>
  )
}

export const OrgBox = ({
  organizationImage,
  logo,
  organizationName,
  reputationScore1,
  reputationScore2,
}) => (
  <Box
    maxW="sm"
    bgGradient="linear(to-b, #2A61C3, #7868D0, #BE59BE, #F59579)"
    _hover={{
      bgGradient: "linear(to-b, #2A61C3 15%, #7868D0, #BE59BE, #F59579)",
    }}
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    mb="10px"
  >
    <Box p="15px" borderColor="white">
      <OrganizationButton
        label={organizationName}
        imageSrc={organizationImage}
        size="md"
      />
    </Box>
    {(reputationScore1 || reputationScore2) && (
      <Box
        p="14px 20px 18px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {reputationScore1 && (
          <ReputationScore1 label={reputationScore1} logo={logo} size="sm" />
        )}
        {reputationScore2 && (
          <ReputationScore2 label={reputationScore2} logo={logo} size="sm" />
        )}
      </Box>
    )}
  </Box>
)
