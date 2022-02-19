import { Box, Heading, Container } from "@chakra-ui/react"

export const Section = ({ title, children }) => {
  return (
    <Box mb="40px">
      {children}
    </Box>
  )
}
