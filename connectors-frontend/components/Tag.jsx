import React from 'react'
import { Text } from '@chakra-ui/react'

const TagValuesEnum = {
  design: 'design',
  dataScience: 'dataScience',
  marketing: 'marketing',
  foodIndustry: 'foodIndustry',
}

export const Tag = ({ disabled, selected, value, onClick }) => {
  const color = getColorBasedOnValue(value)
  const background = disabled ? 'gray.28' : color
  const fontColor = disabled ? 'gray.50' : selected ? 'white' : color

  const handleClick = () => {
    onClick && onClick(value)
  }
  return (
    <Text
      variant="xx.small"
      as="span"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      px="12px"
      py="3px"
      mr="10px"
      height="20px"
      borderRadius="17px"
      color={fontColor}
      border="1px solid"
      textTransform="capitalize"
      fontWeight="800"
      fontSize="12px"
      borderColor={background}
      bg={selected || disabled ? background : 'transparent'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onClick={disabled ? () => undefined : handleClick}
    >
      {value}
    </Text>
  )
}

function splitCamelCase(value) {
  return value.replace(/([A-Z])/g, ' $1')
}

function getColorBasedOnValue(value) {
  switch (value) {
    case TagValuesEnum.design:
      return 'pink'
    case TagValuesEnum.dataScience:
      return 'teal'
    case TagValuesEnum.marketing:
      return 'brown2'
    case TagValuesEnum.foodIndustry:
      return 'brown1'
    default:
      return 'pink'
  }
}
