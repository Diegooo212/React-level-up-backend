// src/components/common/CategoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types/Category'; 

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={category.link} className="category-card-link">
      <div>
        <img
          src={category.img}
          alt={category.name}
          className="category-card-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/100x100/1f2833/66fcf1?text=Img';
          }}
        />
        <h3 className="category-card-title">{category.name}</h3>
      </div>
      <p className="category-card-description">{category.description}</p>
    </Link>
  );
};

export default CategoryCard;