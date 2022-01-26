import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { Banner } from "../components/Banner";
import Carousel from "../components/Carousel";
import { Header } from "../components/Header";
import { TravelTypes } from "../components/TravelsTypes";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>world trip</title>
        <meta name="description" content="World trip website" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Flex flexDirection="column" marginBottom="2.5rem">
        <Header />
        <Banner />
        <TravelTypes />
        <Box
          width="100px"
          borderBottom="2px"
          borderColor="gray.700"
          alignSelf="center"
          height="1rem"
        ></Box>
        <Heading
          fontWeight="500"
          color="gray.700"
          align="center"
          marginTop="2.5rem"
        >
          Vamos nessa? <br /> Então escolha seu continente
        </Heading>
        <Box
          height="24rem"
          width={["100%", "100%", "100%", "80%"]}
          marginX="auto"
          marginTop="2.5rem"
        >
          <Carousel />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
