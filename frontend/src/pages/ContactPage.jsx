import { useState } from 'react';
import {
  Container,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: 'Error',
        description: 'Por favor, complete todos los campos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast({
        title: 'Mensaje enviado',
        description: 'Tu mensaje ha sido enviado con éxito',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Limpiar el formulario
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un error al enviar tu mensaje',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <Heading mb={6}>Contáctame 💌</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder='Nombre'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder='Correo Electrónico'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textarea
            placeholder='Mensaje'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type='submit'
            colorScheme='pink'
            w='full'
          >
            Enviar Mensaje ✨
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ContactPage;
