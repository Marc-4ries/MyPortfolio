import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5" style={{ backgroundColor: '#fdf8f0' }}>
      <h2 className="text-center mb-5" style={{ color: '#c17a3a' }}>About Me</h2>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="p-4">
            <h3 className="text-center mb-4" style={{ color: '#c17a3a' }}>Marc Aries Bantasan</h3>
            <p style={{ color: '#5e4b3c', fontSize: '1.05rem', lineHeight: '1.7' }}>
              I'm an IT student based in La Trinidad who finds joy in both code and creativity. 
              Photography, drawing, and video capture my attention just as much as building web applications.
            </p>
            <p style={{ color: '#5e4b3c', fontSize: '1.05rem', lineHeight: '1.7' }}>
              Nature inspires most of my work. I love capturing moments that feel timeless — 
              a sunset, a quiet street, genuine expressions. These creative pursuits influence 
              how I approach design and user experience.
            </p>
            <div className="mt-4">
              <h5 style={{ color: '#b5835a' }}>Current Interests:</h5>
              <ul style={{ color: '#7a6352' }}>
                <li>Photography & Visual Storytelling</li>
                <li>Video Editing (beginner)</li>
                <li>Web Development & Design</li>
                <li>Nature & Architecture Documentation</li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;