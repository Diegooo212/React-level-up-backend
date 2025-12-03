import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { homePageContent } from '../../data/uiContent';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{homePageContent.heroTitle}</h1>
        <p className="hero-subtitle">{homePageContent.heroSubtitle}</p>
        <LinkContainer to="/productos">
          <Button variant="primary" className="hero-button">
            {homePageContent.heroButton}
          </Button>
        </LinkContainer>
      </div>
    </section>
  );
};

export default HeroSection;