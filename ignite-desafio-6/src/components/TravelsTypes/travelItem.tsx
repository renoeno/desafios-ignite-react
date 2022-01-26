import { Icon, Flex, Text } from "@chakra-ui/react";
import { ElementType } from "react";

interface TravelItemsProps {
  children: string;
  icon: ElementType;
}

export function TravelItem({ children, icon }: TravelItemsProps) {
  return (
    <Flex flexDir="column" alignItems="center" marginX={["1rem", "1rem", "0"]}>
      <Icon
        fontSize="60"
        as={icon}
        color="yellow.500"
        display={["none", "none", "inline-block"]}
      />
      <Text
        fontWeight="600"
        fontSize="20px"
        textTransform="lowercase"
        marginTop="1rem"
      >
        {children}
      </Text>
    </Flex>
  );
}
