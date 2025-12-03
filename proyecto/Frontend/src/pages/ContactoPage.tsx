import React, { useState } from 'react';
// Importamos los estilos
import '../style/contactoPage.css';

const ContactoPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    
    
    console.log('Mensaje enviado:', { name, email, message });
    setStatus('¡Mensaje enviado con éxito!');
    
    // Limpiamos el formulario
    setName('');
    setEmail('');
    setMessage('');

    // Oculta el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setStatus('');
    }, 3000);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-form-wrapper">
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna duda o sugerencia? Escríbenos.</p>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Grupo: Nombre */}
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Grupo: Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Grupo: Mensaje */}
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
            ></textarea>
          </div>

          {/* Botón de envío y mensaje de estado */}
          <div className="form-actions-contact">
            <button type="submit" className="contact-submit-btn">
              Enviar Mensaje
            </button>
            
            {status && (
              <p className="contact-status-message">{status}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactoPage;