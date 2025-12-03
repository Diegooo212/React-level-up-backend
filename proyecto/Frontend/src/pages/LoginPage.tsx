import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const success = await login(email, password);

      if (success) {
        navigate('/');
      } else {
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      fluid 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: '80vh' }}
    >
      <Card style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1f2833', border: '1px solid #45a29e', color: '#c5c6c7' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ color: '#66fcf1', fontFamily: 'Orbitron, sans-serif' }}>
            Iniciar Sesión
          </h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#0b0c10', color: '#fff', borderColor: '#45a29e' }}
              />
            </Form.Group>

            <Form.Group id="password" className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#0b0c10', color: '#fff', borderColor: '#45a29e' }}
              />
            </Form.Group>

            <Button 
              disabled={loading} 
              className="w-100 mb-3" // Añadido mb-3 para separar del botón de registro
              type="submit"
              style={{ 
                backgroundColor: '#00ffea', 
                color: '#0b0c10', 
                fontWeight: 'bold', 
                border: 'none',
                padding: '10px'
              }}
            >
              {loading ? 'Cargando...' : 'Ingresar'}
            </Button>
          </Form>

          {/* --- NUEVA SECCIÓN: BOTÓN DE REGISTRO --- */}
          <div className="text-center mt-2 pt-3 border-top border-secondary">
            <span style={{ fontSize: '0.9rem' }}>¿No tienes una cuenta?</span>
            <br />
            <Link to="/registro" className="text-decoration-none">
              <Button 
                variant="outline-info" 
                className="w-100 mt-2"
                style={{ borderColor: '#45a29e', color: '#45a29e', fontWeight: 'bold' }}
              >
                Registrarse
              </Button>
            </Link>
          </div>
          {/* ---------------------------------------- */}

          <div className="w-100 text-center mt-3">
            <Link to="/" style={{ color: '#66fcf1', textDecoration: 'none', fontSize: '0.9rem' }}>
              &larr; Volver al Inicio
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;