import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

const ContactMe = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("All fields required");
      return;
    }
    setLoading(true);
    try {
      await emailjs.send(
        "service_qb71g12",
        "template_le744o5",
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        "V-sRyho1dKt1DzliT"
      );
      setStatus("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send");
    }
    setLoading(false);
  };

  return (
    <Container className="py-5" style={{ backgroundColor: '#fdf8f0', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4">
            <h2 className="text-center mb-4" style={{ color: '#c17a3a' }}>Get in Touch</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#5e4b3c' }}>Name</Form.Label>
                <Form.Control
                  style={{ backgroundColor: '#fff8ed', border: '1px solid #e3d5ca' }}
                  placeholder="Your name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#5e4b3c' }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  style={{ backgroundColor: '#fff8ed', border: '1px solid #e3d5ca' }}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#5e4b3c' }}>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  style={{ backgroundColor: '#fff8ed', border: '1px solid #e3d5ca' }}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </Form.Group>
              <Button type="submit" variant="success" className="w-100" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
              {status && <p className="mt-3 text-center" style={{ color: '#b5835a' }}>{status}</p>}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactMe;