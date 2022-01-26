import { Box, Flex, Heading, Icon, Text, Tooltip } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface ContinentInfoProps {
  text: string;
  countries: number;
  languages: number;
  topCitiesNum: number;
}

export function ContinentInfo({
  text,
  countries,
  languages,
  topCitiesNum,
}: ContinentInfoProps) {
  return (
    <Flex
      height={["25rem", "22rem", "20rem"]}
      width="100%"
      maxWidth="1024px"
      marginX="auto"
      paddingX={["2rem", "2rem", "1.5rem", "0"]}
      flexDirection={["column", "column", "row"]}
      justifyContent="center"
    >
      <Flex
        width={["100%", "100%", "50%"]}
        justifyContent="center"
        alignItems="center"
      >
        <Text lineHeight="2rem" textAlign="justify" fontSize="1.2rem">
          {text}
        </Text>
      </Flex>
      <Flex
        width={["100%", "100%", "50%"]}
        justifyContent="space-between"
        alignItems="center"
        paddingX={["1rem", "1rem", "3rem", "5rem"]}
        marginTop={["1rem", "1rem", "0"]}
      >
        <Flex
          flexDirection="column"
          alignItems={["left", "left", "center", "center"]}
        >
          <Heading color="yellow.500">{countries}</Heading>
          <Text fontSize={["1.2rem", "1.2rem", "1rem", "1rem"]}>países</Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems={["left", "left", "center", "center"]}
        >
          <Heading color="yellow.500">{languages}</Heading>
          <Text fontSize={["1.2rem", "1.2rem", "1rem", "1rem"]}>línguas</Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems={["left", "left", "center", "center"]}
        >
          <Heading color="yellow.500">{topCitiesNum}</Heading>

          <Text fontSize={["1.2rem", "1.2rem", "1rem", "1rem"]}>
            cidades + 100{" "}
            <Tooltip label="Cidades mais visitadas do mundo">
              <span>
                <Icon
                  as={AiOutlineInfoCircle}
                  fontSize="0.8rem"
                  color="gray.400"
                />
              </span>
            </Tooltip>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
