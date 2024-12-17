import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PendingPage = () => {
  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <Box textAlign='center'>
        <Heading
          mb={4}
          color='yellow.500'
        >
          Pago pendiente
        </Heading>
        <Text
          fontSize='xl'
          mb={8}
        >
          Tu pago está en proceso. Te notificaremos una vez se haya completado.
        </Text>
        <Button
          as={Link}
          to='/'
          colorScheme='yellow'
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default PendingPage;
