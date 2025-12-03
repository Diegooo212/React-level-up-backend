import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryCard from '../common/CategoryCard'; 
import { categories } from '../../data/categories'; 
import { homePageContent } from '../../data/uiContent'; 

const CategorySection: React.FC = () => {
  return (
    <Container as="section" className="home-section">
      <h2 className="home-section-title">{homePageContent.categoriesTitle}</h2>
      <Row xs={1} sm={2} md={4} className="g-4 justify-content-center">
        {categories.map((category) => (
          <Col key={category.id} className="d-flex align-items-stretch">
            
            <CategoryCard category={category} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategorySection;