import 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function About() {
  return (
    <div 
      className="d-flex align-items-center" 
      style={{ 
        minHeight: "100vh", 
        backgroundColor: '#0b0c10', 
        fontFamily: "Victor mono" 
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            
            <h1 
              className="fw-bold mb-4" 
              style={{ fontSize: "52px", color: '#66fcf1' }}
            >
              Hello. I am Marc Aries.
            </h1>

            <p 
              className="mb-4" 
              style={{ 
                fontSize: "1.2rem", 
                lineHeight: 1.8, 
                fontWeight: 300, 
                color: '#c5c6c7' 
              }}
            >
              I am an <strong style={{ color: '#66fcf1' }}>I.T. student</strong> living in <strong style={{ color: '#66fcf1' }}>La Trinidad</strong>, 
              I enjoy messing around with codes at times. Though I kind of prefer dealing with arts, 
              like taking pictures, drawing things, or even recording stuff. Though I am not really 
              that good at it. But I do hope to learn more about it in the future.
            </p>

            <p 
              className="mb-4" 
              style={{ 
                fontSize: "1.2rem", 
                lineHeight: 1.8, 
                fontWeight: 300, 
                color: '#c5c6c7' 
              }}
            >
              It had become an habit of mine to take photos of things I see, especially from nature. 
              I love capturing those moments and keeping them. It feels like I won't easily forget. 
              It is like capturing a moment and immortalizing it. Though of course it really won't be 
              like that. Just the idea of it seems a little romantic, nostalgic, and of course practical. 
              You won't easily forget what you have accessible within your devices.
            </p>

            <h2 
              className="fw-bold text-uppercase mb-4 mt-5" 
              style={{ 
                fontSize: "0.85rem", 
                letterSpacing: "3px", 
                color: '#45a29e' 
              }}
            >
              What I like to capture moments or themes of, as well as what I enjoy doing at times:
            </h2>

            <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3 mb-0">
              <li 
                className="text-uppercase fw-medium" 
                style={{ fontSize: "0.9rem", letterSpacing: "1px", color: '#66fcf1' }}
              >
                Photography & Videos: Nature, People, Expressions, Emotions, and Activities.
              </li>
              <li 
                className="text-uppercase fw-medium" 
                style={{ fontSize: "0.9rem", letterSpacing: "1px", color: '#45a29e' }}
              >
                •
              </li>
              <li 
                className="text-uppercase fw-medium" 
                style={{ fontSize: "0.9rem", letterSpacing: "1px", color: '#66fcf1' }}
              >
                Beginner in Video Editing
              </li>
              <li 
                className="text-uppercase fw-medium" 
                style={{ fontSize: "0.9rem", letterSpacing: "1px", color: '#45a29e' }}
              >
                •
              </li>
              <li 
                className="text-uppercase fw-medium" 
                style={{ fontSize: "0.9rem", letterSpacing: "1px", color: '#66fcf1' }}
              >
                Beginner in Web Development
              </li>
              <li 
                className="text-uppercase fw-medium" 
                style={{ fontSize: "0.9rem", letterSpacing: "1px", color: '#45a29e' }}
              >
                •
              </li>
              <li 
                className="text-uppercase fw-medium" 
                style={{ fontSize: "0.9rem", letterSpacing: "1px", color: '#66fcf1' }}
              >
                Expert in prompt making.
              </li>
            </ul>

          </Col>
        </Row>
      </Container>
    </div>
  );
}