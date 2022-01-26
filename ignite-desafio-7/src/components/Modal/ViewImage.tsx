import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Button,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        colorScheme="pGray.800"
        bgColor="pGray.800"
        maxWidth="fit-content"
        padding="0"
      >
        <ModalBody padding="0">
          <Image
            src={imgUrl}
            maxWidth="900px"
            maxHeight="600px"
            objectFit="contain"
          />
        </ModalBody>
        <ModalFooter alignSelf="flex-start" padding=".5rem">
          <Link href={imgUrl}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
