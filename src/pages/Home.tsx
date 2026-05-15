import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import About from './About';

const API = "https://apptechfinalexam-myportfolio.onrender.com/api";

const initialWorks = [
  { title: "Unit 1 Lesson 1", link: "https://marc-4ries.github.io/UNIT1_LESSON1_A_BANTASAN/", previewImage: "", description: "Basic HTML/CSS project" },
  { title: "FG Lab 2", link: "https://marc-4ries.github.io/FG_LAB2_Bantasan/", previewImage: "", description: "Flexbox and Grid practice" },
  { title: "Event Dashboard", link: "https://marc-4ries.github.io/event-dashboard/", previewImage: "", description: "Interactive event manager" },
  { title: "Mg Lab 5", link: "https://marc-4ries.github.io/Mg_LAB_5/", previewImage: "", description: "JavaScript fundamentals" },
  { title: "Mg Lab 6", link: "https://marc-4ries.github.io/mg-lab-6-bantasan/", previewImage: "", description: "DOM manipulation" },
  { title: "Finals Act 1", link: "https://marc-4ries.github.io/aptechfinals1act/", previewImage: "", description: "Final exam project" }
];

const Home = () => {
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [status, setStatus] = useState("");
  const [myWorks, setMyWorks] = useState<any[]>(initialWorks);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    axios.get(`${API}/works`).then(res => {
      if (res.data.length > 0) {
        setMyWorks([...initialWorks, ...res.data]);
      }
    }).catch(() => console.log("Using default projects"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post(`${API}/feedback`, {
        username: formData.name,
        email: formData.email,
        needs: formData.comment
      });
      await emailjs.send(
        "service_qb71g12",
        "template_le744o5",
        { from_name: formData.name, from_email: formData.email, message: formData.comment },
        "V-sRyho1dKt1DzliT"
      );
      setStatus("Sent! Thank you.");
      setFormData({ name: "", email: "", comment: "" });
    } catch (err) {
      setStatus("Error sending message.");
    }
  };

  const openPreview = (link: string) => {
    setPreviewUrl(link);
    setShowPreview(true);
  };

  return (
    <div style={{ backgroundColor: '#fdf8f0', minHeight: '100vh' }}>
      <Container className="py-5 text-center">
        <h1 style={{ color: '#c17a3a', fontSize: '3rem', marginBottom: '1rem' }}>Creative Portfolio</h1>
        <p style={{ color: '#5e4b3c', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Exploring design, development, and creative expression</p>
      </Container>

      <Container id="projects" className="py-5">
        <h2 style={{ color: '#c17a3a', textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Featured Projects</h2>
        <Row className="g-4">
          {myWorks.map((work, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title style={{ color: '#c17a3a', fontSize: '1.3rem' }}>{work.title}</Card.Title>
                  <Card.Text style={{ color: '#7a6352', fontSize: '0.9rem' }}>
                    {work.description || "Web development project"}
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button variant="outline-success" size="sm" href={work.link} target="_blank">
                      Live Demo
                    </Button>
                    <Button variant="success" size="sm" onClick={() => openPreview(work.link)}>
                      Preview
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <div id="about">
        <About />
      </div>

      <Container id="contact" className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4">
              <h3 style={{ color: '#c17a3a', textAlign: 'center' }}>Leave a Message</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#5e4b3c' }}>Name</Form.Label>
                  <Form.Control
                    style={{ backgroundColor: '#fff8ed', border: '1px solid #e3d5ca' }}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#5e4b3c' }}>Email</Form.Label>
                  <Form.Control
                    style={{ backgroundColor: '#fff8ed', border: '1px solid #e3d5ca' }}
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#5e4b3c' }}>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    style={{ backgroundColor: '#fff8ed', border: '1px solid #e3d5ca' }}
                    placeholder="Your feedback..."
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="success" className="w-100">
                  Send Message
                </Button>
                {status && <p className="mt-3 text-center" style={{ color: '#b5835a' }}>{status}</p>}
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#fdf8f0', borderBottom: '1px solid #e3d5ca' }}>
          <Modal.Title style={{ color: '#c17a3a' }}>Project Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0, height: '500px' }}>
          <iframe src={previewUrl} title="Project Preview" style={{ width: '100%', height: '100%', border: 'none' }} />
        </Modal.Body>
      </Modal>

      <footer className="text-center py-4">
        <p style={{ color: '#7a6352', margin: 0 }}>© 2025 Marc Aries Bantasan | Crafted with warmth</p>
      </footer>
    </div>
  );
};

export default Home;