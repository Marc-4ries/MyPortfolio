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
        <BootstrapNavbar.Brand style={{ color: '#c17a3a', fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '2px' }}>
          MARC ARIES
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              onClick={() => setExpanded(false)}
              style={({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#c17a3a' : '#5e4b3c', fontWeight: isActive ? '600' : '400' })}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/myworks"
              onClick={() => setExpanded(false)}
              style={({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#c17a3a' : '#5e4b3c', fontWeight: isActive ? '600' : '400' })}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              onClick={() => setExpanded(false)}
              style={({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#c17a3a' : '#5e4b3c', fontWeight: isActive ? '600' : '400' })}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              onClick={() => setExpanded(false)}
              style={({ isActive }: { isActive: boolean }) => ({ color: isActive ? '#c17a3a' : '#5e4b3c', fontWeight: isActive ? '600' : '400' })}
            >
              Contact
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
