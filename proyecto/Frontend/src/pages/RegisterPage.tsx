import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
// Importamos el servicio directamente, ya que el registro no requiere "contexto" global
import { authService } from '../services/authService';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // Estados
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejo del envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }
    if (formData.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }

    try {
      setLoading(true);
      // Llamada al Backend
      await authService.register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      setSuccess('¡Cuenta creada con éxito! Redirigiendo al login...');
      
      // Esperamos 2 segundos y redirigimos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      // Intentamos obtener el mensaje de error del backend
      const errorMsg = err.response?.data || 'Error al registrar usuario. Intenta con otro correo.';
      setError(typeof errorMsg === 'string' ? errorMsg : 'Error al registrar usuario.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { backgroundColor: '#0b0c10', color: '#fff', borderColor: '#45a29e' };

  return (
    <Container 
      fluid 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: '90vh', padding: '20px' }}
    >
      <Card style={{ width: '100%', maxWidth: '500px', backgroundColor: '#1f2833', border: '1px solid #45a29e', color: '#c5c6c7' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4" style={{ color: '#66fcf1', fontFamily: 'Orbitron, sans-serif' }}>
            Crear Cuenta
          </h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group id="firstName" className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="firstName"
                    required 
                    value={formData.firstName}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group id="lastName" className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="lastName"
                    required 
                    value={formData.lastName}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group id="email" className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                required 
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group id="password" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group id="confirmPassword" className="mb-4">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                name="confirmPassword"
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Button 
              disabled={loading} 
              className="w-100" 
              type="submit"
              style={{ 
                backgroundColor: '#00ffea', 
                color: '#0b0c10', 
                fontWeight: 'bold', 
                border: 'none',
                padding: '10px'
              }}
            >
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#45a29e', textDecoration: 'none', fontWeight: 'bold' }}>Inicia Sesión</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;