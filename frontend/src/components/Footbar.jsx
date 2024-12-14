import {
  Box,
  Container,
  Flex,
  Text,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

const Footbar = () => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('black', 'white');
  const logoSrc = colorMode === 'light' ? '/logo.png' : '/logo-white.png';

  return (
    <Box
      as='footer'
      bg={bgColor}
      color={textColor}
      py={4}
      width='100%'
    >
      <Container
        maxW='1140px'
        px={4}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          flexDir={{ base: 'column', sm: 'row' }}
        >
          <Image
            src={logoSrc}
            alt='Logo'
            boxSize='120px'
            mb={{ base: 4, sm: 0 }}
          />
          <Text
            fontFamily="'Roboto', sans-serif"
            fontSize='lg'
            textAlign='center'
          >
            © 2024 Cazagemas.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footbar;
