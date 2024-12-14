import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({ product, onImageClick }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isDeleting, setIsDeleting] = useState(false);

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const { deleteProduct, updateProduct, addToCart } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isAuthenticated = !!localStorage.getItem('token');

  const handleDeleteProduct = async (pid) => {
    setIsDeleting(true);
    const { success, message } = await deleteProduct(pid);
    setIsDeleting(false);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Éxito',
        description: 'Producto eliminado con éxito',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Éxito',
        description: 'Producto actualizado con éxito',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: 'Éxito',
      description: 'Producto añadido al carrito',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w='full'
        objectFit='cover'
        onClick={onImageClick}
        cursor='pointer'
      />

      <Box p={4}>
        <Heading
          as='h3'
          size='md'
          mb={2}
        >
          {product.name}
        </Heading>

        <Text
          fontWeight='bold'
          fontSize='xl'
          color={textColor}
          mb={4}
        >
          ${product.price}
        </Text>

        <Text
          fontSize='md'
          color={textColor}
          mb={4}
        >
          {product.description}
        </Text>

        <HStack spacing={2}>
          {isAuthenticated && (
            <>
              <IconButton
                icon={<EditIcon />}
                onClick={onOpen}
                colorScheme='blue'
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDeleteProduct(product._id)}
                colorScheme='red'
                isLoading={isDeleting}
              />
            </>
          )}
          <Button onClick={() => handleAddToCart(product)}>
            Añadir al carrito
          </Button>
        </HStack>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actualizar Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Nombre del Producto'
                name='name'
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder='Precio'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder='URL de la Imagen'
                name='image'
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
              <Input
                placeholder='Descripción'
                name='description'
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Actualizar
            </Button>
            <Button
              variant='ghost'
              onClick={onClose}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
