import { Skeleton, Box, BoxProps, Text } from "@chakra-ui/react"
import { Tag } from "./Tag"
import { OrganizationButton } from "./OrganizationButton"
import { AvatarList } from "./AvatarList"

//create loading component
export const ProjectBoxLoading = () => {
  return (
    <Box w="100%" borderWidth="1px" borderRadius="lg">
      <Skeleton h="150px" w="100%" />
    </Box>
  )
}
export const ProjectBox = ({
  // onCardClick,
  organizationHelperText,
  organizationImage,
  organizationName,
  projectTitle,
  projectDescription,
  tag,
  gives,
  dateRange,
  users,
  children,
}) => (
  <Box
    w="calc(50% - 20px)"
    m="10px"
    bgGradient="linear(to-b, #2E196A, #4BAEF5)"
    _hover={{
      bgGradient: "linear(to-b, #2E196A 20%, #4BAEF5)",
    }}
    flexDirection="column"
    borderWidth="1px"
    borderRadius="lg"
    display="inline-flex"
    overflow="hidden"
  >
    <Box p="13px 20px 11px" borderColor="white" borderBottomWidth="1px">
      <OrganizationButton
        label={organizationName}
        imageSrc={organizationImage}
        helperText={organizationHelperText?.text}
        tooltipText={organizationHelperText?.tooltipText}
        size="md"
      />
    </Box>

    <Box
      p="14px 25px 18px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box marginBottom="24px">
        {projectTitle && (
          <Box mb="10px">
            <Text color="white" variant="heading.3">
              {projectTitle}
            </Text>
          </Box>
        )}
        {projectDescription && (
          <Box mb="10px">
            <Text color="white" variant="paragraph">
              {projectDescription}
            </Text>
          </Box>
        )}

        <Box
          display="flex"
          flexDirection={{ base: "row", md: "column" }}
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent={{ base: "space-between", md: "center" }}
        >
          {dateRange && (
            <Box mb={{ base: "unset", md: "10px" }} order={{ base: 2, md: 1 }}>
              <Text color="white" fontWeight="800" variant="heading.6">
                {dateRange}
              </Text>
            </Box>
          )}
          {tag && (
            <Box order={{ base: 1, md: 2 }}>
              <Text color="white">Contributions:</Text>
              {tag.map((t, i) => (
                <Tag key={i} value={t} selected />
              ))}
            </Box>
          )}
        </Box>
      </Box>
      {gives && (
        <Box mb="24px">
          <Box mb="5px">
            <Text
              color="white"
              fontWeight="800"
              lineHeight="17.71px"
              fontSize="sm"
            >
              {gives} GIVEs
            </Text>
          </Box>
        </Box>
      )}
      {users && (
        <Box
          display="flex"
          flexDirection={{ base: "row", md: "column" }}
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent={{ base: "space-between", md: "center" }}
        >
          {!!children && (
            <Box mb={{ base: "unset", md: "24px" }}>{children}</Box>
          )}
          {!!users?.length && <AvatarList size="sm" avatars={users} />}
        </Box>
      )}
    </Box>
  </Box>
)
