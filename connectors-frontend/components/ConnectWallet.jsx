import { Box } from '@chakra-ui/react'

export const ConnectWallet = ({ onClick, isMetamaskConnected }) => {
  return (
    <Box
      alignItems="center"
      as="button"
      borderRadius="md"
      bg={isMetamaskConnected ? 'gray.200' : 'primary'}
      color={isMetamaskConnected ? 'gray.800' : 'white'}
      fontSize="14"
      fontWeight="600"
      px={4}
      h={12}
      onClick={onClick}
    >
      {isMetamaskConnected ? 'To connectors' : 'Connect your Wallet'}
    </Box>
  )
}
