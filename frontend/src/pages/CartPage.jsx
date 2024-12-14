import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useProductStore } from '../store/product';
import MercadoPagoCheckoutButton from '../components/MercadoPagoCheckoutButton';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useProductStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <Heading
        as='h1'
        size='xl'
        mb={6}
      >
        Carrito de Compras
      </Heading>
      <VStack
        spacing={4}
        align='stretch'
      >
        {cart.length === 0 ? (
          <Text>Tu carrito está vacío.</Text>
        ) : (
          cart.map((product) => (
            <Box
              key={product._id}
              p={4}
              borderWidth='1px'
              borderRadius='lg'
            >
              <HStack
                justifyContent='space-between'
                alignItems='center'
              >
                <Text>{product.name}</Text>
                <HStack>
                  <Button
                    size='sm'
                    onClick={() =>
                      updateQuantity(product._id, product.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Text>{product.quantity}</Text>
                  <Button
                    size='sm'
                    onClick={() =>
                      updateQuantity(product._id, product.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </HStack>
                <Text>${product.price}</Text>
                <Button
                  size='sm'
                  colorScheme='red'
                  onClick={() => removeFromCart(product._id)}
                >
                  Eliminar
                </Button>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
      <Divider my={6} />
      <HStack
        justifyContent='space-between'
        alignItems='center'
      >
        <Text fontSize='xl'>Total: ${total}</Text>
        <MercadoPagoCheckoutButton total={total} />
      </HStack>
    </Container>
  );
};

export default CartPage;
