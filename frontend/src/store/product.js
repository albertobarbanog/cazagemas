import { create } from 'zustand';

const getInitialCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const useProductStore = create((set, get) => ({
  products: [],
  cart: getInitialCart(),

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item._id === product._id
      );
      let updatedCart;
      if (existingProduct) {
        updatedCart = state.cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (product) => product._id !== productId
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  createProduct: async (product) => {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Añade el token en el encabezado
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (data.success) {
        set((state) => ({
          products: [...state.products, data.data],
        }));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  loadProducts: async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        set({ products: data.data });
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  },

  deleteProduct: async (productId) => {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token en el encabezado
        },
      });
      const data = await response.json();
      if (data.success) {
        set((state) => ({
          products: state.products.filter(
            (product) => product._id !== productId
          ),
        }));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateProduct: async (productId, updatedProduct) => {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Añade el token en el encabezado
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      if (data.success) {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === productId ? data.data : product
          ),
        }));
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
