import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

import { api } from "../../services/api";
import { GetStaticProps } from "next";
import { Header } from "../../components/Header";
import { ContinentBanner } from "../../components/Continent/continentBanner";
import { ContinentInfo } from "../../components/Continent/continentInfo";
import { TopCities } from "../../components/Continent/topCities";

type City = { name: string; country: string; image: string; flag: string };

type Continent = {
  id: number;
  title: string;
  name: string;
  countries: number;
  languages: number;
  image: string;
  description: string;
  topCities: City[];
};

interface ContinentProps {
  continent: Continent;
}

export default function Continent({ continent }: ContinentProps) {
  return (
    <>
      <Header />
      <ContinentBanner image={continent.image} name={continent.name} />
      <ContinentInfo
        text={continent.description}
        countries={continent.countries}
        languages={continent.languages}
        topCitiesNum={continent.topCities.length}
      />
      <TopCities topCities={continent.topCities} />
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps<ContinentProps> = async ({
  params,
}) => {
  const response = await api.get("continents");
  const continents = JSON.parse(JSON.stringify(response.data)) as Continent[];
  const continentIndex = continents.findIndex(
    (continent) => continent.title === params?.continent
  );

  console.log(continents[continentIndex]);

  const continent = continents[continentIndex];

  return {
    props: {
      continent,
    },
  };
};
