import { Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { BiDrink } from "react-icons/bi";
import { GiSurfBoard } from "react-icons/gi";
import { FaRegBuilding } from "react-icons/fa";
import { GiGreekTemple } from "react-icons/gi";
import { IoMdGlobe } from "react-icons/io";

import { TravelItem } from "./travelItem";

export function TravelTypes() {
  return (
    <Flex
      width="80%"
      marginX="auto"
      justifyContent="space-between"
      alignItems="center"
      height={200}
      flexWrap="wrap"
    >
      <TravelItem icon={BiDrink}>Vida noturna</TravelItem>
      <TravelItem icon={GiSurfBoard}>Praia</TravelItem>
      <TravelItem icon={FaRegBuilding}>Moderno</TravelItem>
      <TravelItem icon={GiGreekTemple}>Clássico</TravelItem>
      <TravelItem icon={IoMdGlobe}>E mais...</TravelItem>
    </Flex>
  );
}
