import { Box, Link, Skeleton, Text } from "@chakra-ui/react"

export const SkillBoxLoading = () => {
  return (
    <Box
      display="inline-flex"
      width={['100%', '100%', '100%', '100%', "calc(50% - 20px)"]}
      m="10px"
      
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Skeleton h="150px" w="100%" />
    </Box>
  )
}
export const SkillBox = ({ skill, credentials, description, source }) => (
  <Box
    display="inline-flex"
    width={['100%', '100%', '100%', '100%', "calc(50% - 20px)"]}
    
    m="10px"
    p="10px"
    bgGradient="linear(to-b, #86156F, #4D43D1)"
    _hover={{
      bgGradient: "linear(to-b, #86156F 20%, #4D43D1)",
    }}
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
  >
    <>
      <Box p="13px 25px 11px">
        <Box display="flex" alignItems="baseline">
          <Box
            color="white"
            fontWeight="600"
            letterSpacing="wide"
            fontSize="18px"
          >
            {skill}
          </Box>
        </Box>

        {credentials && (
          <Box
            fontWeight="800"
            as="h4"
            lineHeight="tight"
            fontSize="16px"
            color="white"
            isTruncated
            my="10px"
          >
            {credentials} credentials
          </Box>
        )}
        {description && (
          <Text mt="20px" color="white">
            {description}
          </Text>
        )}
        {source && (
          <Text mt="20px" color="white" fontSize="sm" fontWeight="bold">
            {source}
          </Text>
        )}
        {credentials && (
          <Box>
            <Link
              href="https://chakra-ui.com"
              variant="nav.link"
              color="primary"
              fontWeight="600"
              cursor="pointer"
              mx="0px"
              _last={{ mr: "0" }}
            >
              See details
            </Link>
          </Box>
        )}
      </Box>
    </>
  </Box>
)
