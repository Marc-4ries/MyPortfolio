import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar expand="lg" sticky="top" className="border-bottom shadow-sm">
      <Container>
        <BootstrapNavbar.Brand style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '1.5rem' }}>
          MARC ARIES
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle onClick={() => setExpanded(!expanded)} />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/myworks" onClick={() => setExpanded(false)}>Projects</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={() => setExpanded(false)}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;