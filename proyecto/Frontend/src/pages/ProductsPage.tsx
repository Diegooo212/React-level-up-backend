// src/pages/ProductsPage.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import CategorySection from '../components/sections/CategorySection'; 

const ProductsPage: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Level-Up Gamer - Categorías';
    }, []);

    return (
        <Container fluid className="my-4"> 
            <h2 className="text-center" style={{ color: '#66fcf1', marginBottom: '10px' }}> 
                Explora Nuestras Categorías
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '30px',color: '#66fcf1' }}>
                Selecciona una categoría y descubre los mejores productos gamer.
            </p>
            
            <CategorySection /> 
        </Container>
    );
};

export default ProductsPage;