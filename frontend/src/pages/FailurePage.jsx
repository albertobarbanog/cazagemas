import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const FailurePage = () => {
  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <Box textAlign='center'>
        <Heading
          mb={4}
          color='red.500'
        >
          Error en el pago
        </Heading>
        <Text
          fontSize='xl'
          mb={8}
        >
          Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
        </Text>
        <Button
          as={Link}
          to='/cart'
          colorScheme='red'
        >
          Volver al carrito
        </Button>
      </Box>
    </Container>
  );
};

export default FailurePage;
