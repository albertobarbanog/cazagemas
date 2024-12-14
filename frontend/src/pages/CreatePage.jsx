import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const DEFAULT_CATEGORY_ID = '12345'; // Reemplaza con el ID de categoría deseado
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    stock: 0,
    currency_id: 'CLP',
  });
  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image ||
      !newProduct.description
    ) {
      toast({
        title: 'Error',
        description: 'Por favor, complete todos los campos requeridos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const productWithCategory = {
      ...newProduct,
      category_id: DEFAULT_CATEGORY_ID,
    };

    const { success, message } = await createProduct(productWithCategory);

    toast({
      title: success ? 'Éxito' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      setNewProduct({
        name: '',
        price: '',
        image: '',
        description: '',
        stock: 1,
        currency_id: 'CLP',
      });
    }
  };

  return (
    <Container
      maxW={'container.sm'}
      py={8}
    >
      <VStack spacing={8}>
        <Heading>Crear Nuevo Producto</Heading>
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded={'lg'}
          shadow={'md'}
          w='full'
        >
          <VStack spacing={4}>
            <Input
              placeholder='Nombre del Producto'
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder='Precio'
              type='number'
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder='URL de la Imagen'
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Input
              placeholder='Descripción'
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Button
              colorScheme='blue'
              onClick={handleAddProduct}
              w='full'
            >
              Añadir Producto
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
