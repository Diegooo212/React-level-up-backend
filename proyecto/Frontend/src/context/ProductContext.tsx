import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductContextType } from '../types/ProductContextType';

// 1. Importamos el servicio en lugar del archivo JSON local
import { productService } from '../services/productService';

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  
  // 2. Iniciamos con un array vacío (mientras carga)
  const [products, setProducts] = useState<Product[]>([]);

  // 3. useEffect para cargar los datos reales al iniciar la app
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
      console.log("Productos cargados del Backend:", data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // --- Funciones CRUD conectadas al Backend ---

  const addProduct = async (newProduct: Product) => {
    try {
      // Guardamos en Backend primero
      const savedProduct = await productService.create(newProduct);
      // Luego actualizamos el estado local con el dato real del servidor
      setProducts(prevProducts => [savedProduct, ...prevProducts]);
    } catch (error) {
      console.error("Error creando producto:", error);
      alert("Error al crear el producto en el servidor.");
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await productService.update(updatedProduct);
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error("Error actualizando producto:", error);
      alert("Error al actualizar.");
    }
  };

  const deleteProduct = async (productId: string | number) => {
    try {
      await productService.delete(productId);
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== productId)
      );
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Error al eliminar.");
    }
  };

  const contextValue: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};