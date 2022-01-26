import { SimpleGrid, useDisclosure, Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function viewImageHandler(url) {
    setImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => {
          const data = {
            title: card.title,
            description: card.description,
            url: card.url,
            ts: card.ts,
          };
          return (
            <Card key={data.ts} data={data} viewImage={viewImageHandler} />
          );
        })}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl} />
    </>
  );
}
