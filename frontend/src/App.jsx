import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footbar } from './components';
import {
  AboutMe,
  CartPage,
  ContactPage,
  CreatePage,
  EditProductPage,
  FailurePage,
  HomePage,
  LocationPage,
  LoginPage,
  SuccessPage,
  PendingPage, // Importar el nuevo componente
} from './pages';

function App() {
  return (
    <Box
      minH={'100vh'}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/create'
          element={<CreatePage />}
        />
        <Route
          path='/cart'
          element={<CartPage />}
        />
        <Route
          path='/success'
          element={<SuccessPage />}
        />
        <Route
          path='/failure'
          element={<FailurePage />}
        />
        <Route
          path='/pending'
          element={<PendingPage />}
        />{' '}
        {/* Nueva ruta */}
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/edit/:productId'
          element={<EditProductPage />}
        />
        <Route
          path='/about'
          element={<AboutMe />}
        />
        <Route
          path='/contact'
          element={<ContactPage />}
        />
        <Route
          path='/location'
          element={<LocationPage />}
        />
      </Routes>
      <Footbar />
    </Box>
  );
}

export default App;
