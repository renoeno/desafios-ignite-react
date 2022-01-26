import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface TopCityProps {
  topCity: { name: string; country: string; image: string; flag: string };
}

export function TopCity({ topCity }: TopCityProps) {
  return (
    <Box
      width="16rem"
      height="16.5rem"
      borderRadius={8}
      border="1px"
      borderColor="rgba(255, 186, 8, 0.5)"
      overflow="hidden"
    >
      <Flex flexDirection="column">
        <Image src={topCity.image} height="10.5rem" />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          height="6rem"
          marginX="1.5rem"
        >
          <Flex flexDirection="column">
            <Text fontWeight="600" fontFamily="continent" fontSize="1.25rem">
              {topCity.name}
            </Text>
            <Text fontWeight="500" fontFamily="continent">
              {topCity.country}
            </Text>
          </Flex>

          <Image
            src={topCity.flag}
            rounded="full"
            width="1.5rem"
            height="1.5rem"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
