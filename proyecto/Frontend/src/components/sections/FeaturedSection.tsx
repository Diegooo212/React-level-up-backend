// src/components/sections/FeaturedSection.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../common/ProductCard'; 


import { useProducts } from '../../context/ProductContext'; 

import { homePageContent } from '../../data/uiContent'; 
import styles from './FeaturedSection.module.css'; 

const featuredProductIds = ['prod-001', 'prod-005', 'prod-004'];

const FeaturedSection: React.FC = () => {

  
  const { products } = useProducts();
  
  const featuredProducts = products.filter(p => featuredProductIds.includes(p.id as string));

  return (
    <Container fluid as="section" className={styles.featuredSection}>
      <h2 className={styles.sectionTitle}>{homePageContent.featuredTitle}</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center px-md-5">
        
        
        {featuredProducts.map((product) => (
          <Col key={product.id} className="d-flex align-items-stretch">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedSection;