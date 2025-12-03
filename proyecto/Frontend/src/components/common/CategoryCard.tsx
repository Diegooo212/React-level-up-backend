import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';
import { Category } from '../../types/Category';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={category.link} className={styles.categoryCard}>
      <img
        src={category.img}
        alt={category.name}
        className={styles.cardImage}
        onError={(e) => e.currentTarget.src = 'https://placehold.co/80x80/1f2833/66fcf1?text=Img'}
      />
      <h3 className={styles.cardTitle}>{category.name}</h3>
      {category.description && <p className={styles.cardDescription}>{category.description}</p>}
    </Link>
  );
};

export default CategoryCard;