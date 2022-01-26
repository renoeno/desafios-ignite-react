import { Flex, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import { Logo } from "./logo";
import Link from "next/link";

export function Header() {
  const router = useRouter();
  router;
  return (
    <Flex
      as="header"
      width="100%"
      maxWidth={1480}
      height="5rem"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      {router.asPath !== "/" && (
        <Link href="/">
          <ChakraLink position="absolute" top={["2rem", "1.6rem"]} left="2rem">
            <Icon as={IoIosArrowBack} fontSize={["1rem", "1.8rem"]} />
          </ChakraLink>
        </Link>
      )}

      <Logo />
    </Flex>
  );
}
