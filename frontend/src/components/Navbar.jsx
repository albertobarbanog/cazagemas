import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { PlusSquareIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al usuario a la página de inicio después de hacer logout
  };

  return (
    <Container
      maxW='1140px'
      px={4}
    >
      <Flex
        h={16}
        alignItems='center'
        justifyContent='space-between'
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight='bold'
          textTransform='uppercase'
          textAlign='center'
          bgGradient='linear(to-r, pink.300, pink.500)'
          bgClip='text'
          fontFamily='Roboto, sans-serif'
          mr={{ base: 0, sm: 4 }}
        >
          <Link to='/'>Productos 🎨</Link>
        </Text>

        <IconButton
          size='md'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label='Open Menu'
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack
          spacing={4}
          alignItems='center'
          display={{ base: 'none', md: 'flex' }}
        >
          {/* Links públicos */}
          <Link to='/about'>
            <Button variant='ghost'>Sobre Mi</Button>
          </Link>
          <Link to='/contact'>
            <Button variant='ghost'>Contacto</Button>
          </Link>
          <Link to='/location'>
            <Button variant='ghost'>Ubicación</Button>
          </Link>
          <Link to='/cart'>
            <Button variant='ghost'>🛒</Button>
          </Link>

          {/* Links privados */}
          {isAuthenticated ? (
            <>
              <Link to='/create'>
                <Button colorScheme='pink'>
                  <PlusSquareIcon mr={2} />
                  Agregar Publicación
                </Button>
              </Link>
              <Button
                colorScheme='red'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to='/login'>
              <Button colorScheme='pink'>Login</Button>
            </Link>
          )}

          {/* Modo oscuro/claro */}
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoon /> : <LuSun size='20' />}
          </Button>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box
          pb={4}
          display={{ md: 'none' }}
        >
          <VStack
            as={'nav'}
            spacing={4}
          >
            <Link to='/about'>
              <Button variant='ghost'>Sobre Mi</Button>
            </Link>
            <Link to='/contact'>
              <Button variant='ghost'>Contacto</Button>
            </Link>
            <Link to='/location'>
              <Button variant='ghost'>Ubicación</Button>
            </Link>
            <Link to='/cart'>
              <Button variant='ghost'>🛒</Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to='/create'>
                  <Button colorScheme='pink'>
                    <PlusSquareIcon mr={2} />
                    Agregar Publicación
                  </Button>
                </Link>
                <Button
                  colorScheme='red'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to='/login'>
                <Button colorScheme='pink'>Login</Button>
              </Link>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <IoMoon /> : <LuSun size='20' />}
            </Button>
          </VStack>
        </Box>
      ) : null}
    </Container>
  );
};

export default Navbar;
