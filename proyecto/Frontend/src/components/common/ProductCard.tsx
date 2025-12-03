// src/components/common/ProductCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap'; 
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext'; 
import styles from './ProductCard.module.css'; 

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart(); 

  let priceHTML;
  const finalPrice = (product.onSale && product.discountPrice && product.discountPrice > 0) ? product.discountPrice : product.price;

  if (product.onSale && product.discountPrice && product.discountPrice > 0) {
    priceHTML = (
      <>
        {/* 1. Añade data-testid para el precio de oferta */}
        <span data-testid="price-oferta" className={`${styles.precioOferta} d-block`}><b>Oferta:</b> ${finalPrice.toLocaleString('es-CL')}</span>
        <span data-testid="price-normal-tachado" className={`${styles.precioOriginalTachado} d-block`}>Normal: ${product.price.toLocaleString('es-CL')}</span>
      </>
    );
  } else {
    {/* 2. Añade data-testid para el precio normal */}
    priceHTML = <span data-testid="price-normal" className="d-block"><b>Precio:</b> ${finalPrice.toLocaleString('es-CL')}</span>;
  }
  const productForCart = { ...product, price: finalPrice };

  return (
    <Card className={`${styles.productCard} h-100`}>
      <Card.Img
        variant="top"
        src={product.img}
        className={styles.cardImage} 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://placehold.co/300x200/1f2833/66fcf1?text=Img';
        }}
      />
      <Card.Body className={styles.cardBody}> 
        <Card.Title className={styles.cardTitle}>{product.name}</Card.Title> 
        <Card.Text as="div" className={styles.cardText}> 
          
          {/* 3. Añade data-testid para marca y stock */}
          <span data-testid="brand"><b>Marca:</b> {product.brand}</span>
          {priceHTML}
          <span data-testid="stock"><b>Stock:</b> {product.stock} unidades</span>
          
          {product.description && (
            <span className="mt-2 text-muted d-block" style={{ fontSize: '0.85em' }}>
              {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
            </span>
          )}
        </Card.Text>
        <Button
          variant="primary" 
          className={styles.buyButton} 
          onClick={() => addToCart(productForCart)} 
        >
          🛒 Comprar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;