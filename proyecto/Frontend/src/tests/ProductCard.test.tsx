// src/tests/ProductCard.test.tsx
import React from 'react';
// ¡CAMBIO! Importamos 'within' (adentro de)
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../components/common/ProductCard';
import { Product } from '../types/Product';

const mockAddToCart = jest.fn(); 
jest.mock('../context/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    cartItems: [],
    removeFromCart: jest.fn(),
    changeQuantity: jest.fn(),
    getCartTotalQuantity: jest.fn(),
    clearCart: jest.fn(),
  }),
}));


describe('Componente: <ProductCard />', () => {

  const mockProductNormal: Product = {
    id: 'prod-001',
    name: 'Teclado Mecánico',
    description: 'Descripción de prueba',
    brand: 'Logitech',
    category: 'teclado',
    price: 100000,
    onSale: false,
    stock: 10,
    img: 'teclado.jpg',
  };
  const mockProductOferta: Product = {
    id: 'prod-002',
    name: 'Mouse Gamer',
    description: 'Un mouse en oferta',
    brand: 'Razer',
    category: 'mouse',
    price: 50000,
    onSale: true,
    discountPrice: 35000,
    stock: 5,
    img: 'mouse.jpg',
  };

  const renderComponent = (product: Product) => {
    return render(<ProductCard product={product} />);
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  /**
   * TAREA 1: Pruebas de renderizado (Correcto) - CORREGIDO
   */

  test('Renderizado Correcto: debe renderizar la info del producto (props)', () => {
    renderComponent(mockProductNormal);

    expect(screen.getByText('Teclado Mecánico')).toBeInTheDocument();
    
    const brandElement = screen.getByTestId('brand');
    const stockElement = screen.getByTestId('stock');

    expect(within(brandElement).getByText('Logitech')).toBeInTheDocument();
    expect(within(stockElement).getByText('10 unidades')).toBeInTheDocument();
  });

  /**
   * TAREA 2: Pruebas de renderizado (Condicional - Precio Normal) - CORREGIDO
   */

  test('Renderizado Condicional: debe mostrar solo el precio normal si NO está en oferta', () => {
    renderComponent(mockProductNormal);

    const precioNormal = screen.getByTestId('price-normal');
    
    expect(within(precioNormal).getByText(/\$100\.000/i)).toBeInTheDocument();

    expect(screen.queryByTestId('price-oferta')).not.toBeInTheDocument();
    expect(screen.queryByTestId('price-normal-tachado')).not.toBeInTheDocument();
  });

  /**
   * TAREA 3: Pruebas de renderizado (Condicional - Precio Oferta) - CORREGIDO
   */

  test('Renderizado Condicional: debe mostrar el precio de oferta y el precio tachado', () => {
    renderComponent(mockProductOferta);
    
    const precioOferta = screen.getByTestId('price-oferta');
    const precioNormalTachado = screen.getByTestId('price-normal-tachado');
    
    expect(within(precioOferta).getByText(/\$35\.000/i)).toBeInTheDocument();
    expect(within(precioNormalTachado).getByText(/Normal: \$50\.000/i)).toBeInTheDocument(); 

    expect(screen.queryByTestId('price-normal')).not.toBeInTheDocument();
  });

  /**
   * TAREA 4: Pruebas de Eventos (Simulación de Clic) - (Sin cambios, ya funcionaba)
   */
  
  test('Simulación de Eventos: debe llamar a addToCart al hacer clic en "Comprar"', () => {
    renderComponent(mockProductNormal);
    const buyButton = screen.getByRole('button', { name: /Comprar/i });

    act(() => {
      fireEvent.click(buyButton);
    });
    
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'prod-001' 
      })
    );
  });
});