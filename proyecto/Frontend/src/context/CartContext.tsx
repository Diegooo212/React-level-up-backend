// src/context/CartContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
// Asegúrate de que este tipo incluya 'clearCart', 'getCartTotalQuantity', etc.
import { CartContextType } from '../types/CartContext'; 
import { useAuth } from './AuthContext';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem('carritoReact');
      if (!storedCart) return [];
      
      const parsedItems = JSON.parse(storedCart) as CartItem[];
      
      return parsedItems.map(item => ({
        ...item,
        price: Number(item.price) || 0,
        cantidad: Number(item.cantidad) || 0,
        stock: Number(item.stock) || 0,
      }));
    } catch (error) {
      console.error("Error al cargar carrito de localStorage:", error);
      return [];
    }
  });

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('carritoReact', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    if (!currentUser) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate('/login');
      return;
    }
    let itemAddedOrIncremented = false;
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = (Number(existingItem.cantidad) || 0) + 1;
        if (newQuantity <= existingItem.stock) {
          itemAddedOrIncremented = true;
          return prevItems.map(item =>
            item.id === product.id ? { ...item, cantidad: newQuantity } : item
          );
        } else {
            alert(`No puedes añadir más ${product.name}, stock máximo (${existingItem.stock}) alcanzado.`);
            return prevItems; 
        }
      } else {
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: (product.onSale && product.discountPrice && product.discountPrice > 0) ? product.discountPrice : product.price,
            img: product.img,
            cantidad: 1, 
            stock: product.stock
        };
        itemAddedOrIncremented = true;
        return [...prevItems, cartItem];
      }
    });
    
    if (itemAddedOrIncremented) {
        alert(`${product.name} agregado al carrito!`);
    }
  };

  const removeFromCart = (itemId: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const changeQuantity = (itemId: string | number, delta: number) => {
    setCartItems(prevItems =>
      
      prevItems.map(item => {
          if (item.id === itemId) {
            const currentQuantity = Number(item.cantidad) || 0;
            const currentStock = Number(item.stock) || 0;
            let newQuantity = currentQuantity + delta;

            if (newQuantity < 1) newQuantity = 1;

            if (delta > 0 && newQuantity > currentStock) {
                newQuantity = currentStock;
                if (currentQuantity < currentStock) {
                  alert(`Stock máximo para ${item.name} es ${currentStock}.`);
                }
            }
            return { ...item, cantidad: newQuantity };
          }
          return item;
        }
      )
    );
  };

  const getCartTotalQuantity = (): number => {
      return cartItems.reduce((total, item) => total + (Number(item.cantidad) || 0), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue: CartContextType = {
    cartItems,
    addToCart: addToCart,
    removeFromCart,
    changeQuantity,
    getCartTotalQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};