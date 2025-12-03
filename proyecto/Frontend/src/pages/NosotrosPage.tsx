// src/pages/NosotrosPage.tsx
import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { nosotrosContent } from '../data/uiContent';

const NosotrosPage: React.FC = () => {

  useEffect(() => {
    document.title = nosotrosContent.pageTitle;
  }, []);

  return (
    <section className="nosotros-section">
      <Container>
        <Card className="nosotros-card">
          <Card.Body>
            <h1 className="nosotros-title">{nosotrosContent.title}</h1>
            <p>{nosotrosContent.paragraph1}</p>
            <p>{nosotrosContent.paragraph2}</p>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default NosotrosPage;