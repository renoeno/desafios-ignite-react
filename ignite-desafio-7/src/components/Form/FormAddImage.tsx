import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type ImageType = {
  url: string;
  title: string;
  description: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: image =>
          image[0].size < 10485760 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: image =>
          /image\/(jpeg|png|gif)/.test(image[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: 'Título obrigatório',
      minLength: 2,
      maxLength: 20,
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: 65,
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (image: ImageType) => {
      const response = await api.post('/api/images', image);

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/images');
      },
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          status: 'warning',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
        });
        return;
      }
      const { title, description } = data;

      const image = {
        title,
        description,
        url: imageUrl,
      } as ImageType;

      await mutation.mutateAsync(image);

      toast({
        title: 'Imagem cadastrada',
        status: 'success',
        description: 'Sua imagem foi cadastrada com sucesso.',
      });
    } catch {
      toast({
        title: 'Falha no cadastro',
        status: 'error',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
      });
    } finally {
      setImageUrl('');
      setLocalImageUrl('');
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
