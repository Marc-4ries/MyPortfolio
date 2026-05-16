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
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );
      setStatus("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send");
    }
    setLoading(false);
  };

  return (
    <Container className="py-5" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4">
            <h2 className="text-center mb-4">Get in Touch</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Your name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </Form.Group>
              <Button type="submit" variant="success" className="w-100" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </Button>
              {status && <p className="mt-3 text-center">{status}</p>}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactMe;
