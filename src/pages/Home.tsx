import { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdf8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
      <p style={{ color: '#b5835a', fontFamily: 'Georgia, serif', fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem' }}>Welcome to my portfolio</p>
      <h1 style={{ color: '#c17a3a', fontFamily: 'Georgia, serif', fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: 1.1 }}>
        Marc Aries<br />Bantasan
      </h1>
      <p style={{ color: '#7a6352', fontSize: '1.2rem', maxWidth: '500px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
        IT Student · Web Developer · Creative
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          onClick={() => navigate('/myworks')}
          style={{ backgroundColor: '#c17a3a', border: 'none', padding: '0.75rem 2rem', fontSize: '1rem', borderRadius: '2px', letterSpacing: '1px' }}
        >
          View My Projects
        </Button>
        <Button
          onClick={() => navigate('/contact')}
          variant="outline-secondary"
          style={{ border: '1px solid #c17a3a', color: '#c17a3a', padding: '0.75rem 2rem', fontSize: '1rem', borderRadius: '2px', letterSpacing: '1px', backgroundColor: 'transparent' }}
        >
          Get in Touch
        </Button>
      </div>

      <footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', padding: '1rem', borderTop: '1px solid #e3d5ca', backgroundColor: '#fdf8f0', color: '#7a6352', fontSize: '0.85rem' }}>
        © 2025 Marc Aries Bantasan · Crafted with warmth
      </footer>
    </div>
  );
};

export default Home;
