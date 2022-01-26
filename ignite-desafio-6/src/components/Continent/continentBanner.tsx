import { Box, Flex, Heading, Image } from "@chakra-ui/react";

interface ContinentBannerProps {
  name: string;
  image: string;
}

export function ContinentBanner({ name, image }: ContinentBannerProps) {
  return (
    <Flex
      width="100%"
      backgroundImage={image}
      height={["15rem", "25rem"]}
      position={["static", "relative"]}
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        color="gray.100"
        position={["static", "absolute"]}
        bottom="5rem"
        left="8rem"
      >
        {name}
      </Heading>
    </Flex>
  );
}
