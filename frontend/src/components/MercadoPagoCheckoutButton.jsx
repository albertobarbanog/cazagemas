import { Button, useToast } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useEffect } from 'react';

const MercadoPagoCheckoutButton = () => {
  const { cart } = useProductStore();
  const toast = useToast();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const mp = new window.MercadoPago(
        import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY,
        {
          locale: 'es-AR',
        }
      );

      mp.checkout({
        preference: {
          items: cart.map((item) => ({
            title: item.name,
            unit_price: item.price,
            quantity: item.quantity,
          })),
        },
        autoOpen: true,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [cart]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/mercadopago/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || 'Error creating preference');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
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
    >
      Pagar con Mercado Pago
    </Button>
  );
};

export default MercadoPagoCheckoutButton;
