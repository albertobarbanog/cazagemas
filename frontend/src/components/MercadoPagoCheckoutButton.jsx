import { Button, useToast } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useEffect, useState } from 'react';

const MercadoPagoCheckoutButton = () => {
  const { cart } = useProductStore();
  const toast = useToast();
  const [mpLoaded, setMpLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onerror = () => {
      toast({
        title: 'Error',
        description: 'No se pudo cargar el SDK de Mercado Pago',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    };
    script.onload = () => {
      try {
        // Inicializar MercadoPago solo una vez
        window.mp = new window.MercadoPago(
          import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY,
          { locale: 'es-AR' }
        );
        setMpLoaded(true);
      } catch (error) {
        console.error('Error inicializando MercadoPago:', error);
        toast({
          title: 'Error',
          description: 'No se pudo inicializar Mercado Pago',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    if (!mpLoaded) {
      toast({
        title: 'Error',
        description: 'Mercado Pago aún no está cargado',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('/api/mercadopago/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart.map((item) => ({
            title: item.name,
            unit_price: Number(item.price), // Convertir a número
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (data.id) {
        window.mp.checkout({
          preference: {
            id: data.id,
          },
          autoOpen: true,
        });
      } else {
        throw new Error(data.message || 'Error creando preferencia');
      }
    } catch (error) {
      console.error('Error durante el checkout:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      colorScheme='blue'
      onClick={handleCheckout}
      isDisabled={!mpLoaded} // Deshabilitar si no está cargado
    >
      Pagar con Mercado Pago
    </Button>
  );
};

export default MercadoPagoCheckoutButton;
