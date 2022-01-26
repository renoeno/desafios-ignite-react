import { Button, Box, Flex } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  id: string;
  title: string;
  description: string;
  ts: number;
  url: string;
};

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }) =>
    await api.get(`/api/images`, { params: { after: pageParam } });

  const getNextPageParam = imgResponse => {
    if (imgResponse.data.after) {
      return imgResponse.data.after;
    } else {
      return null;
    }
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, { getNextPageParam });

  const formattedData = useMemo(() => {
    if (data) {
      const newArray = data.pages.map(page => page.data.data).flat();

      return newArray;
    }
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Flex justifyContent="center" marginTop="2rem">
            <Button
              onClick={() => {
                fetchNextPage();
              }}
            >
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          </Flex>
        )}
      </Box>
    </>
  );
}
