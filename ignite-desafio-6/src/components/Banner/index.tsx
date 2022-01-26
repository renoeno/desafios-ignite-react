import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { BannerImage } from "./bannerImage";

export function Banner() {
  return (
    <Flex height={360}>
      <Box
        width="100%"
        height={320}
        bgImage="/images/banner-bg.jpg"
        backgroundPosition="top"
        backgroundSize="cover"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginX={["10", "20"]}
        >
          <Stack
            width={["100%", "100%", "40%"]}
            spacing="8"
            marginTop={["5rem", "5rem", "0"]}
            alignSelf="center"
          >
            <Heading color="gray.50" fontWeight="500">
              5 continentes,
              <br /> infinitas possibilidades.
            </Heading>
            <Text color="gray.200">
              Chegou a hora de tirar do papel a viagem que você sempre sonhou.
            </Text>
          </Stack>

          <BannerImage />
        </Flex>
      </Box>
    </Flex>
  );
}
