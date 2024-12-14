import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState, useCallback } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { loadProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await loadProducts();
    } catch (err) {
      setError(
        'Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.'
      );
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Container
      maxW='container.xl'
      py={12}
      mb={20} // Añade un margen inferior para evitar que el footbar cubra el contenido
    >
      <VStack spacing={8}>
        <Text
          fontSize='30'
          fontWeight='bold'
          bgGradient='linear(to-r, pink.300, pink.500)'
          bgClip='text'
          textAlign='center'
          fontFamily='Cursive'
        >
          Productos Actuales 🚀
        </Text>

        {loading ? (
          <Spinner size='xl' />
        ) : error ? (
          <Alert
            status='error'
            rounded='md'
          >
            <AlertIcon />
            {error}
          </Alert>
        ) : products.length === 0 ? (
          <Text>No se encontraron productos.</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w='full'
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onImageClick={() => handleImageClick(product.image)}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxW='lg'>
          <ModalBody>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt='Producto Seleccionado'
                borderRadius='md'
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default HomePage;
