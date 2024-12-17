import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const AboutMe = () => {
  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <Box textAlign='center'>
        <Heading mb={4}>Sobre Mi</Heading>
        <Image
          borderRadius='full'
          boxSize='300px'
          src='/cazagemas.png'
          alt='Tatuadora'
          mx='auto'
          mb={4}
          transition='transform 0.3s'
          _hover={{ transform: 'scale(1.1)' }}
        />
        <Text
          fontSize='lg'
          mb={4}
        >
          ¡Hola! Soy Javiera, conocida como Cazagemas. Mi trabajo se centra en
          el estilo blackwork y anime con toques conceptuales, utilizando
          principalmente tinta negra con detalles a color. Mi estilo se
          caracteriza por líneas finas para lograr escenas de viñetas y
          personajes icónicos del anime y manga. Me apasiona la creación de
          obras que reflejen la personalidad de cada cliente, por lo que me tomo
          el tiempo para entender sus gustos y preferencias. 🖤🥺
        </Text>
        <HStack
          spacing={4}
          justify='center'
        >
          <IconButton
            as='a'
            href='https://www.facebook.com/cazagemas'
            target='_blank'
            aria-label='Facebook'
            icon={<FaFacebook />}
          />
          <IconButton
            as='a'
            href='https://www.instagram.com/cazagemas'
            target='_blank'
            aria-label='Instagram'
            icon={<FaInstagram />}
          />
          <IconButton
            as='a'
            href='https://www.tiktok.com/@cazagemas'
            target='_blank'
            aria-label='TikTok'
            icon={<FaTiktok />}
          />
        </HStack>
      </Box>
    </Container>
  );
};

export default AboutMe;
