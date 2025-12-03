import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap'; 

import { useProducts } from '../context/ProductContext';
import ProductFilters from '../components/common/ProductFilters';
import ProductCard from '../components/common/ProductCard';

interface FiltersState {
  search: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
}

const CategoryProductsPage = () => {
  const { products } = useProducts();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [showFilters, setShowFilters] = useState(false);
  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  const [activeFilters, setActiveFilters] = useState<FiltersState>({
    search: '',
    minPrice: 0,
    maxPrice: Infinity,
    brands: [],
  });

  const categoryProducts = useMemo(() => {
    
    const urlId = categoryId?.toLowerCase() || '';

    return products.filter(
      (product) => {
        
        const productCategory = product.category.toLowerCase();
        
        
        return productCategory === urlId;
      }
    );

  }, [products, categoryId]); 
  
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(categoryProducts.map(p => p.brand));
    return Array.from(brandsSet).sort();
  }, [categoryProducts]);

 
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      const finalPrice = (product.onSale && product.discountPrice && product.discountPrice > 0) 
                         ? product.discountPrice 
                         : product.price;

      if (activeFilters.search && !product.name.toLowerCase().includes(activeFilters.search)) {
        return false;
      }
      if (finalPrice < activeFilters.minPrice) {
        return false;
      }
      if (finalPrice > activeFilters.maxPrice) {
        return false;
      }
      if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(product.brand)) {
        return false;
      }
      return true;
    });
  }, [categoryProducts, activeFilters]);

  const handleFilterChange = (filters: FiltersState) => {
    setActiveFilters(filters);
  };

  return (
    <Container fluid style={{ padding: '20px' }}>
      <h2 className="text-center" style={{ textTransform: 'capitalize', color: '#66fcf1' }}>
        Categoría: {categoryId}
      </h2>
      <hr style={{ borderColor: '#45a29e' }} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button 
          variant="outline-info" 
          onClick={handleShowFilters}
          style={{ color: '#66fcf1', borderColor: '#66fcf1' }}
        >
          Filtrar Productos
        </Button>
        <span className="text-muted">{filteredProducts.length} productos encontrados</span>
      </div>
      
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          <Row className="g-4 justify-content-center">
            {filteredProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center">No se encontraron productos en esta categoría.</p>
        )}
      </div>

      <Offcanvas 
        show={showFilters} 
        onHide={handleCloseFilters} 
        placement="start"
        style={{ backgroundColor: '#1f2833', color: '#c5c6c7' }} 
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title style={{ color: '#66fcf1' }}>Filtros</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProductFilters 
            availableBrands={availableBrands}
            onFilterChange={handleFilterChange}
            onClose={handleCloseFilters} 
          />
        </Offcanvas.Body>
      </Offcanvas>

    </Container>
  );
};

export default CategoryProductsPage;