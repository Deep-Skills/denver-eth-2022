import { InfoIcon, Avatar, Box, Text, Tooltip } from '@chakra-ui/react'

export const OrganizationButton = ({
  label,
  helperText,
  imageSrc,
  color = 'white',
  size = 'md',
  tooltipText,
  ...rest
}) => {
  const { width, height, lineHeight } = getSize(size)
  return (
    <Box display='flex' alignItems='center' {...rest}>
      <Avatar
        data-testid='organization-button-image'
        borderRadius='full'
        width={width}
        height={height}
        src={imageSrc}
        marginRight='12px'
      />
      <Box>
        <Box mb='2px'>
          <Text
            color={color}
            fontWeight={600}
            fontSize='14px'
            lineHeight={helperText ? '17.71px' : lineHeight}
            noOfLines={3}
          >
            {label}
          </Text>
        </Box>
        {!!helperText && (
          <Box display='flex'>
            <Text
              color='gray.79'
              fontSize='sm'
              fontWeight={450}
              lineHeight='17.71px'
              mr='5px'
            >
              {helperText}
            </Text>
            {!!tooltipText && (
              <Tooltip label={tooltipText} fontSize='sm'>
                <InfoIcon color='gray.79' />
              </Tooltip>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

function getSize(size){
    if (size === 'sm') {
      return {
        width: '30px',
        height: '30px',
        lineHeight: '20.24px',
        fontSize: 'sm'
      }
    }
    if (size === 'md') {
      return {
        width: '35px',
        height: '35px',
        lineHeight: '20.24px',
        fontSize: 'md'
      }
    }
    return {
      width: '65px',
      height: '65px',
      lineHeight: '35.42px',
      fontSize: '3xl'
    }
  }
