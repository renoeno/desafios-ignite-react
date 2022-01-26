import { Box, Flex, Heading } from "@chakra-ui/react";
import { TopCity } from "./topCity";

type City = { name: string; country: string; image: string; flag: string };

interface TopCitiesProps {
  topCities: City[];
}

export function TopCities({ topCities }: TopCitiesProps) {
  return (
    <Flex
      maxWidth="1024px"
      width="100%"
      height="25rem"
      marginX="auto"
      flexDirection="column"
      alignItems="center"
      marginTop={["1.5rem", "1.5rem", "0", "0"]}
    >
      <Heading fontWeight="500" alignSelf="flex-start" marginLeft="1rem">
        Cidades + 100
      </Heading>
      <Flex
        flexWrap="wrap"
        marginTop="2rem"
        justifyContent={["center", "center", "center", "flex-start"]}
      >
        {topCities.map((topCity) => (
          <Box marginX="1rem" marginBottom="2rem">
            <TopCity topCity={topCity} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
