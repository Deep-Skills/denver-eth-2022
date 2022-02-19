import { Avatar, Box, Text } from "@chakra-ui/react"

export const AvatarList = ({ avatars, size = "md", max = 3 }) => {
  const restOfUsers = avatars.length - max
  return (
    <Box display="flex" alignItems="center">
      <Box display="flex">
        {avatars.slice(0, max).map((user, index) => (
          <Box key={index} ml={index !== 0 ? "-10px" : 0} zIndex={100 - index}>
            <Avatar
              borderRadius="full"
              size={size}
              src={`https://coordinape-prod.s3.amazonaws.com/${user.avatar}`}
            />
          </Box>
        ))}
      </Box>
      {restOfUsers > 0 && (
        <Box ml="9px">
          <Text color="gray.79" fontSize="md">
            {getRestText(restOfUsers)}
          </Text>
        </Box>
      )}
    </Box>
  )
}
export const getRestText = (rest) =>
  `+ ${convertNumberToWordsEN(rest)} other${rest > 1 ? "s" : ""}`
// https://gist.github.com/ForbesLindesay/5467742
export function convertNumberToWordsEN(value) {
  value = Math.floor(value)
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ]
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ]

  const numString = value.toString()

  if (value < 0) throw new Error("Negative numbers are not supported.")

  if (value === 0) return "zero"

  // the case of 1 - 20
  if (value < 20) {
    return ones[value]
  }

  if (numString.length === 2) {
    return tens[Number(numString[0])] + " " + ones[Number(numString[1])]
  }

  // 100 and more
  if (numString.length === 3) {
    if (numString[1] === "0" && numString[2] === "0")
      return ones[Number(numString[0])] + " hundred"
    else
      return (
        ones[Number(numString[0])] +
        " hundred and " +
        convertNumberToWordsEN(+(numString[1] + numString[2]))
      )
  }

  if (numString.length === 4) {
    const end = +(numString[1] + numString[2] + numString[3])
    if (end === 0) return ones[Number(numString[0])] + " thousand"
    if (end < 100)
      return (
        ones[Number(numString[0])] +
        " thousand and " +
        convertNumberToWordsEN(end)
      )
    return (
      ones[Number(numString[0])] + " thousand " + convertNumberToWordsEN(end)
    )
  }
  return ""
}
