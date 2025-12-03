// src/tests/ProductFilters.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProductFilters from '../components/common/ProductFilters';


const mockOnFilterChange = jest.fn();
const mockOnClose = jest.fn();

const mockBrands = ['Sony', 'Microsoft', 'Nintendo'];

const renderComponent = (brands = mockBrands) => {
  render(
    <ProductFilters
      availableBrands={brands}
      onFilterChange={mockOnFilterChange}
      onClose={mockOnClose}
    />
  );
};

// --------------------------------------------------
// --- 3. LAS PRUEBAS (describe, test, expect) ---
// --------------------------------------------------
describe('Componente: <ProductFilters />', () => {
  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnClose.mockClear();
  });

  /**
   * TAREA 1: Pruebas de renderizado (Correcto)
   */
  test('Renderizado Correcto: debe renderizar la lista de marcas (props)', () => {
    renderComponent();
    expect(screen.getByText('Marcas')).toBeInTheDocument();
    expect(screen.getByLabelText('Sony')).toBeInTheDocument();
    expect(screen.getByLabelText('Microsoft')).toBeInTheDocument();
    expect(screen.getByLabelText('Nintendo')).toBeInTheDocument();
  });

  /**
   * TAREA 2: Pruebas de renderizado (Condicional)
   */
  test('Renderizado Condicional: NO debe renderizar marcas si el array está vacío', () => {
    renderComponent([]); 
    expect(screen.getByText('Marcas')).toBeInTheDocument();
    expect(screen.queryByLabelText('Sony')).not.toBeInTheDocument();
  });

  /**
   * TAREA 3: Pruebas de Estado (State)
   */

  test('Gestión del Estado: el input de búsqueda debe actualizar su valor (estado)', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Buscar...');
        expect(searchInput).toHaveValue('');
        act(() => {
      fireEvent.change(searchInput, { target: { value: 'xbox' } });
    });
    
    expect(searchInput).toHaveValue('xbox');
  });

  /**
   * TAREA 4: Pruebas de Eventos y Props (Función)
   */
  
  test('Simulación de Eventos: debe llamar a onFilterChange y onClose al hacer clic en "Aplicar"', () => {
    renderComponent();
    const applyButton = screen.getByText('Aplicar Filtros');

    act(() => {
      fireEvent.click(applyButton);
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: '',
      minPrice: 0,
      maxPrice: Infinity,
      brands: [],
    });
  });
  
  /**
   * TAREA 5: Combinación (Estado + Eventos + Props)
   */
  test('Combinación: debe llamar a onFilterChange con el estado actualizado', () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Buscar...');
    const minPriceInput = screen.getByPlaceholderText('Mínimo');
    const sonyCheckbox = screen.getByLabelText('Sony');
    const applyButton = screen.getByText('Aplicar Filtros');

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'PlayStation' } });
      fireEvent.change(minPriceInput, { target: { value: '10000' } });
      fireEvent.click(sonyCheckbox); 
    });
    
    act(() => {
      fireEvent.click(applyButton);
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      search: 'playstation', 
      minPrice: 10000,
      maxPrice: Infinity,
      brands: ['Sony'], 
    });
  });
});