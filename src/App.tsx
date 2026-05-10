import React, { useState } from 'react';
// I am using HashRouter here to fix the GitHub white screen issue
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 
import { Navbar, Container, Nav, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import emailjs from "@emailjs/browser";
import Admin from './Admin'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const PortfolioHome = () => {
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [status, setStatus] = useState("");

  // These are my actual previous Apptech projects from GitHub
  const myWorks = [
    { title: "Unit 1 Lesson 1", link: "https://github.io" },
    { title: "FG Lab 2", link: "https://github.io" },
    { title: "Event Dashboard", link: "https://github.io" },
    { title: "Mg Lab 5", link: "https://github.io" },
    { title: "Mg Lab 6", link: "https://github.io" },
    { title: "Finals Act 1", link: "https://github.io" }
  ];

  // This handles the submit button
  const handleCombinedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      //First, I use axios to send the name, email, and message to my MongoDB
      await axios.post('http://localhost:5000/api/feedback', { 
        username: formData.name, 
        email: formData.email, 
        needs: formData.comment 
      });

      //Second, I use EmailJS to send the same data to my email address
      await emailjs.send(
        "service_e761yci", 
        "template_xaeuqza", 
        { from_name: formData.name, from_email: formData.email, message: formData.comment }, 
        "feahIeQ5KRf17OGTk"
      );

      setStatus("Successfully sent!");
      setFormData({ name: "", email: "", comment: "" }); 
    } catch (err) {
      setStatus("Error: Check if the backend server is running.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
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
                <Form.Group className="mb-3">
                  <Form.Label className="small text-info">Full Name:</Form.Label>
                  <Form.Control className="bg-dark text-white" placeholder="Enter your name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-info">Email Address:</Form.Label>
                  <Form.Control className="bg-dark text-white" type="email" placeholder="Enter your email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-info">Message/Feedback:</Form.Label>
                  <Form.Control as="textarea" rows={3} className="bg-dark text-white" placeholder="Write your feedback here..." value={formData.comment} onChange={(e)=>setFormData({...formData, comment:e.target.value})} required />
                </Form.Group>
                <Button type="submit" variant="info" className="w-100 fw-bold">SUBMIT FEEDBACK</Button>
              </Form>
              <p className="mt-3 text-center small" style={{ color: '#66fcf1' }}>{status}</p>
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
        {/*my hidden route to my admin page*/}
        <Route path="/home-admin-access" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;