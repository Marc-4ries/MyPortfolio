import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Navbar, Container, Nav, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import emailjs from "@emailjs/browser";
import Admin from './Admin'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const PortfolioHome = () => {
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [status, setStatus] = useState("");
  
  // These are my 6 exact Apptech projects from my GitHub
  const initialWorks = [
    { title: "Unit 1 Lesson 1", link: "https://marc-4ries.github.io/UNIT1_LESSON1_A_BANTASAN/" },
    { title: "FG Lab 2", link: "https://marc-4ries.github.io/FG_LAB2_Bantasan/" },
    { title: "Event Dashboard", link: "https://marc-4ries.github.io/event-dashboard/" },
    { title: "Mg Lab 5", link: "https://marc-4ries.github.io/Mg_LAB_5/" },
    { title: "Mg Lab 6", link: "https://marc-4ries.github.io/mg-lab-6-bantasan/" },
    { title: "Finals Act 1", link: "https://marc-4ries.github.io/aptechfinals1act/" }
  ];
  
  const [myWorks, setMyWorks] = useState<any[]>(initialWorks);
  const API = "https://onrender.com";

  // This loads any extra projects I might add through my Admin CRUD
  useEffect(() => {
    axios.get(`${API}/works`).then(res => {
      if(res.data.length > 0) {
        setMyWorks([...initialWorks, ...res.data]);
      }
    }).catch(() => console.log("Using hardcoded links backup"));
  }, []);

  // This handles the combined submit for MongoDB and EmailJS
  const handleCombinedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      // 1. Send data to my MongoDB on Render
      await axios.post(`${API}/feedback`, { 
        username: formData.name, email: formData.email, needs: formData.comment 
      });
      // 2. Send the same data to my email via EmailJS
      await emailjs.send("service_e761yci", "template_xaeuqza", 
        { from_name: formData.name, from_email: formData.email, message: formData.comment }, 
        "feahIeQ5KRf17OGTk"
      );
      setStatus("Successfully sent!");
      setFormData({ name: "", email: "", comment: "" }); 
    } catch (err) {
      setStatus("Error: Backend might be offline.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="border-bottom border-info">
        <Container>
          <Navbar.Brand style={{ color: '#66fcf1' }} className="fw-bold">My Portfolio: MARC ARIES</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#works">Works</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-5" id="works">
        <h2 className="text-center mb-5" style={{ color: '#66fcf1' }}>APPTECH WORKS</h2>
        <Row className="g-4">
          {myWorks.map((work, index) => (
            <Col md={4} key={index}>
              <Card style={{ backgroundColor: '#1f2833', border: '1px solid #45a29e', color: '#fff' }} className="text-center h-100 p-2 shadow-sm">
                <Card.Body>
                  <Card.Title className="small">{work.title}</Card.Title>
                  <Button variant="outline-info" size="sm" href={work.link} target="_blank">Open Project</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container id="contact" className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card style={{ backgroundColor: '#1f2833', border: '1px solid #45a29e', color: '#fff' }} className="p-4 shadow-lg">
              <h3 className="text-center" style={{ color: '#66fcf1' }}>GUEST FEEDBACK</h3>
              <Form onSubmit={handleCombinedSubmit}>
                <Form.Control className="bg-dark text-white mb-2" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required />
                <Form.Control className="bg-dark text-white mb-2" type="email" placeholder="Email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required />
                <Form.Control as="textarea" className="bg-dark text-white mb-2" placeholder="Message" value={formData.comment} onChange={(e)=>setFormData({...formData, comment:e.target.value})} required />
                <Button type="submit" variant="info" className="w-100 fw-bold">SUBMIT</Button>
              </Form>
              <p className="mt-2 small text-center" style={{ color: '#66fcf1' }}>{status}</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/home-admin-access" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;