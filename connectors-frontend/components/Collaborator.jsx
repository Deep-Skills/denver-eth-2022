import {
  VStack,
  HStack,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Avatar,
} from "@chakra-ui/react"
import { AvatarBadge, AvatarGroup } from "@chakra-ui/react"

export const CollaboratorLoading = ({ profileImg, address, name }) => {
  return (
    <HStack h="60px" w="100%" mb="10px">
      <SkeletonCircle size="10" />
      <VStack flexGrow="1">
        <SkeletonText noOfLines={2} spacing="4" w="100%" />
      </VStack>
    </HStack>
  )
}
export const Collaborator = ({ profileImg, address, name }) => {
  return (
    <HStack h="60px" w="100%" mb="10px">
      <Avatar src={`https://coordinape-prod.s3.amazonaws.com/${profileImg}`} />
      <VStack flexGrow="1" alignItems={"flex-start"}>
        <Box mb="0">
          <Text fontWeight="bold" color="black" spacing="4" w="100%">
            {name}
          </Text>
        </Box>
        <Box mt="0">
          <Text w="100px" color="primary" spacing="4" isTruncated>
            {address}
          </Text>
        </Box>
      </VStack>
    </HStack>
  )
}
