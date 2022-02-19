import { Image, Avatar, Box, BoxProps, Text } from "@chakra-ui/react"
import sclogo from "./sc-logo.png"

export const ReputationScore1 = ({
  logo,
  label,
  color = "white",
  size = "md",
}) => {
  const { width, height, lineHeight, fontSize } = getSize(size)
  return (
    <Box display="flex" alignItems="center">
      <Image
        borderRadius="full"
        width={width}
        height={height}
        src={sclogo.src}
        marginRight="12px"
      />
      <Box mb="2px">
        <Text
          color={color}
          fontWeight={800}
          fontSize="16px"
          textTransform="uppercase"
          lineHeight="17.71px"
        >
          {Math.round(parseFloat(label) * 100) / 100} CRED
        </Text>
      </Box>
    </Box>
  )
}

export const ReputationScore2 = ({
  logo,
  label,
  color = "white",
  size = "md",
}) => {
  const { width, height, lineHeight, fontSize } = getSize(size)
  return (
    <Box display="flex" alignItems="center">
      <Image
        borderRadius="full"
        width={width}
        height={height}
        src={logo}
        marginRight="12px"
      />
      <Box>
        <Box mb="2px">
          <Text
            color={color}
            fontWeight={800}
            fontSize="16px"
            textTransform="uppercase"
            lineHeight="17.71px"
          >
            {label} CLNY
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
function getSize(size) {
  if (size === "sm") {
    return {
      width: "30px",
      height: "30px",
      lineHeight: "20.24px",
      fontSize: "sm",
    }
  }
  if (size === "md") {
    return {
      width: "35px",
      height: "35px",
      lineHeight: "20.24px",
      fontSize: "md",
    }
  }
  return {
    width: "65px",
    height: "65px",
    lineHeight: "35.42px",
    fontSize: "3xl",
  }
}
