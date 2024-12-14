import { Box, Container, Heading, Text } from '@chakra-ui/react';

const LocationPage = () => {
  return (
    <Container
      maxW='container.md'
      py={12}
    >
      <Heading
        mb={4}
        textAlign='center'
        color='black'
      >
        🌸 Ubicación 🌸
      </Heading>
      <Text
        mb={4}
        textAlign='center'
        color='gray.500'
      >
        ¡Ven a visitarme a mi ubicación!.
      </Text>
      <Box
        as='iframe'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.396156149464!2d-70.6114416848005!3d-33.4264999807817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf646b0b7a4b%3A0x8d7b8b8b8b8b8b8b!2sAv.%20Providencia%201998%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus'
        width='100%'
        height='450'
        frameBorder='0'
        allowFullScreen=''
        aria-hidden='false'
        tabIndex='0'
        borderRadius='lg'
        boxShadow='lg'
      ></Box>
    </Container>
  );
};

export default LocationPage;
