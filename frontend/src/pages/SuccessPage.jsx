import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <Box textAlign='center'>
        <Heading
          mb={4}
          color='green.500'
        >
          ¡Pago exitoso!
        </Heading>
        <Text
          fontSize='xl'
          mb={8}
        >
          Tu compra ha sido procesada correctamente.
        </Text>
        <Button
          as={Link}
          to='/'
          colorScheme='green'
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage;
