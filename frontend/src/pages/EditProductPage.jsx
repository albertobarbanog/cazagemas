import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/product';
import {
  Container,
  VStack,
  Heading,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';

const EditProductPage = () => {
  const { productId } = useParams();
  const { products, updateProduct } = useProductStore();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const productToEdit = products.find((p) => p._id === productId);
    if (productToEdit) {
      setProduct(productToEdit);
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setImage(productToEdit.image);
    }
  }, [productId, products]);

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(productId, {
      name,
      description,
      price,
      image,
    });
    if (success) {
      toast({
        title: 'Producto editado.',
        description: 'El producto ha sido editado con éxito.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } else {
      toast({
        title: 'Error al editar el producto.',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <VStack spacing={4}>
        <Heading
          as='h1'
          size='xl'
        >
          Edit Product
        </Heading>
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descrición</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Precio</FormLabel>
          <Input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>URL de la imagen</FormLabel>
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme='blue'
          onClick={handleUpdate}
        >
          Actualiza el producto
        </Button>
      </VStack>
    </Container>
  );
};

export default EditProductPage;
