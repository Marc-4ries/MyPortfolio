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

  // These are my 6 exact Apptech projects from my GitHub account
  const initialWorks = [
    { title: "Unit 1 Lesson 1", link: "https://marc-4ries.github.io/UNIT1_LESSON1_A_BANTASAN/" },
    { title: "FG Lab 2", link: "https://marc-4ries.github.io/FG_LAB2_Bantasan/" },
    { title: "Event Dashboard", link: "https://marc-4ries.github.io/event-dashboard/" },
    { title: "Mg Lab 5", link: "https://marc-4ries.github.io/Mg_LAB_5/" },
    { title: "Mg Lab 6", link: "https://marc-4ries.github.io/mg-lab-6-bantasan/" },
    { title: "Finals Act 1", link: "https://marc-4ries.github.io/aptechfinals1act/" }
  ];

  const [myWorks, setMyWorks] = useState<any[]>(initialWorks);
  const API = "https://apptechfinalexam-myportfolio.onrender.com";

  // This part fetches any additional projects I add through my Admin dashboard
  useEffect(() => {
    axios.get(`${API}/works`).then(res => {
      if(res.data.length > 0) {
        setMyWorks([...initialWorks, ...res.data]);
      }
    }).catch(() => console.log("Showing default projects only"));
  }, []);

  // This handles the submit button for both MongoDB and EmailJS
  const handleCombinedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // 1. Sending the guest info to my MongoDB on Render
      await axios.post(`${API}/feedback`, {
        username: formData.name,
        email: formData.email,
        needs: formData.comment
      });

      // 2. Sending the same data to my personal email via EmailJS
      await emailjs.send(
        "service_e761yci",
        "template_xaeuqza",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.comment
        },
        "feahIeQ5KRf17OGTk"
      );

      setStatus("Sent! Thank you for the feedback.");
      setFormData({ name: "", email: "", comment: "" });
    } catch (err) {
      setStatus("Error: Backend is likely offline.");
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="border-bottom border-info">
        <Container>
          <Navbar.Brand style={{ color: '#66fcf1' }} className="fw-bold">
            My Portfolio: MARC ARIES
          </Navbar.Brand>
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
                  <Button variant="outline-info" size="sm" href={work.link} target="_blank">
                    Open Project
                  </Button>
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
              <p className="text-center small text-secondary mb-4">Please fill in your details to contact me.</p>
              
              <Form onSubmit={handleCombinedSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="small text-info">Full Name:</Form.Label>
                  <Form.Control 
                    className="bg-dark text-white border-secondary" 
                    placeholder="e.g. Juan Dela Cruz" 
                    value={formData.name} 
                    onChange={(e)=>setFormData({...formData, name:e.target.value})} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-info">Email Address:</Form.Label>
                  <Form.Control 
                    className="bg-dark text-white border-secondary" 
                    type="email" 
                    placeholder="e.g. juan@email.com" 
                    value={formData.email} 
                    onChange={(e)=>setFormData({...formData, email:e.target.value})} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-info">Your Feedback:</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    className="bg-dark text-white border-secondary" 
                    placeholder="Write your message here..." 
                    value={formData.comment} 
                    onChange={(e)=>setFormData({...formData, comment:e.target.value})} 
                    required 
                  />
                </Form.Group>

                <Button type="submit" variant="info" className="w-100 fw-bold">SUBMIT EVERYTHING</Button>
              </Form>
              <p className="mt-3 text-center small fw-bold" style={{ color: '#66fcf1' }}>{status}</p>
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
