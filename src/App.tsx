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
  const [myWorks, setMyWorks] = useState<any[]>([]);

  const API = "https://onrender.com";

  // This loads my works from MongoDB
  useEffect(() => {
    axios.get(`${API}/works`).then(res => setMyWorks(res.data));
  }, []);

  const handleCombinedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post(`${API}/feedback`, { username: formData.name, email: formData.email, needs: formData.comment });
      await emailjs.send("service_e761yci", "template_xaeuqza", { from_name: formData.name, from_email: formData.email, message: formData.comment }, "feahIeQ5KRf17OGTk");
      setStatus("Successfully sent!");
      setFormData({ name: "", email: "", comment: "" }); 
    } catch (err) { setStatus("Error connecting to server."); }
  };

  return (
    <div style={{ backgroundColor: '#0b0c10', color: '#fff', minHeight: '100vh' }}>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container><Navbar.Brand style={{ color: '#66fcf1' }} className="fw-bold">My Portfolio: MARC ARIES</Navbar.Brand>
          <Nav className="ms-auto"><Nav.Link href="#works">Works</Nav.Link><Nav.Link href="#contact">Contact</Nav.Link></Nav>
        </Container>
      </Navbar>

      <Container className="py-5" id="works">
        <h2 className="text-center mb-5" style={{ color: '#66fcf1' }}>APPTECH WORKS</h2>
        <Row className="g-4">
          {myWorks.map((work, index) => (
            <Col md={4} key={index}>
              <Card style={{ backgroundColor: '#1f2833', border: '1px solid #45a29e', color: '#fff' }} className="text-center h-100 p-2 shadow-sm">
                <Card.Body><Card.Title className="small">{work.title}</Card.Title>
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
            <Card style={{ backgroundColor: '#1f2833', border: '1px solid #45a29e', color: '#fff' }} className="p-4">
              <h3 className="text-center" style={{ color: '#66fcf1' }}>GUEST FEEDBACK</h3>
              <Form onSubmit={handleCombinedSubmit}>
                <Form.Control className="bg-dark text-white mb-3" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required />
                <Form.Control className="bg-dark text-white mb-3" type="email" placeholder="Email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required />
                <Form.Control as="textarea" rows={3} className="bg-dark text-white mb-3" placeholder="Comment" value={formData.comment} onChange={(e)=>setFormData({...formData, comment:e.target.value})} required />
                <Button type="submit" variant="info" className="w-100 fw-bold">SUBMIT</Button>
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
  return (<Router><Routes><Route path="/" element={<PortfolioHome />} /><Route path="/home-admin-access" element={<Admin />} /></Routes></Router>);
}
export default App;