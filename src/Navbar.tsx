import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar expanded={expanded} bg="light" expand="lg" sticky="top" className="border-bottom shadow-sm">
      <Container>
        <BootstrapNavbar.Brand style={{ color: '#c17a3a', fontWeight: 'bold', fontSize: '1.5rem' }}>
          MARC ARIES
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end onClick={() => setExpanded(false)} style={{ color: '#5e4b3c', fontWeight: '500' }}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/myworks" onClick={() => setExpanded(false)} style={{ color: '#5e4b3c', fontWeight: '500' }}>My Works</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={() => setExpanded(false)} style={{ color: '#5e4b3c', fontWeight: '500' }}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={() => setExpanded(false)} style={{ color: '#5e4b3c', fontWeight: '500' }}>Contact Me</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;