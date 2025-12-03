import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import styles from './ProductFilters.module.css';

interface ProductFiltersProps {
  availableBrands: string[]; 
  onFilterChange: (filters: {
    search: string;
    minPrice: number;
    maxPrice: number;
    brands: string[];
  }) => void; 
  onClose: () => void; 
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  availableBrands, 
  onFilterChange, 
  onClose 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const brand = e.target.value;
    const isChecked = e.target.checked;
    setSelectedBrands(prev =>
      isChecked ? [...prev, brand] : prev.filter(b => b !== brand)
    );
  };

  const applyFilters = () => {
    onFilterChange({
      search: searchTerm.toLowerCase(),
      minPrice: parseInt(minPrice) || 0,
      maxPrice: parseInt(maxPrice) || Infinity,
      brands: selectedBrands,
    });
    onClose(); 
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedBrands([]);
    onFilterChange({ search: '', minPrice: 0, maxPrice: Infinity, brands: [] });
  };

  const uniqueBrands = Array.from(new Set(availableBrands));

  return (
    <div className={styles.filtersContainer}>
      
      {/* --- Búsqueda --- */}
      <div className={styles.filterGroup}>
        <h5>Buscar por Nombre</h5>
        <Form.Control
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- Rango de Precios --- */}
      <div className={styles.filterGroup}>
        <h5>Rango de Precios</h5>
        <Row className={styles.priceInputs}>
          <Col>
            <Form.Control
              type="number"
              placeholder="Mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
            />
          </Col>
        </Row>
      </div>

      {/* --- Marcas --- */}
      <div className={styles.filterGroup}>
        <h5>Marcas</h5>
        <div className={styles.brandList}>
          {uniqueBrands.map((brand) => (
            <Form.Check
              key={brand}
              type="checkbox"
              id={`brand-${brand}`}
              label={brand}
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={handleBrandChange}
            />
          ))}
        </div>
      </div>

      {/* --- Botones --- */}
      <div className={styles.filterActions}>
        <Button variant="secondary" onClick={clearFilters}>Limpiar Filtros</Button>
        <Button variant="info" onClick={applyFilters}>Aplicar Filtros</Button>
      </div>
    </div>
  );
};

export default ProductFilters;