import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      style={{ backgroundColor: '#fdf8f0', borderBottom: '1px solid #e3d5ca' }}
      className="shadow-sm"
    >
      <Container>
        <BootstrapNavbar.Brand style={{ color: '#c17a3a', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '2px', fontFamily: 'Georgia, serif' }}>
          MARC ARIES
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" end className="nav-link" style={{ color: '#5e4b3c' }} onClick={() => setExpanded(false)}>Home</NavLink>
            <NavLink to="/myworks" className="nav-link" style={{ color: '#5e4b3c' }} onClick={() => setExpanded(false)}>Projects</NavLink>
            <NavLink to="/about" className="nav-link" style={{ color: '#5e4b3c' }} onClick={() => setExpanded(false)}>About</NavLink>
            <NavLink to="/contact" className="nav-link" style={{ color: '#5e4b3c' }} onClick={() => setExpanded(false)}>Contact</NavLink>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
