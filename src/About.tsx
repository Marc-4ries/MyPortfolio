import 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function About() {
  return (
    <Container className="py-5" id="about">
      <h2 className="text-center mb-5 text-info">ABOUT ME</h2>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card 
            bg="dark" 
            border="info" 
            text="white" 
            className="p-4 shadow-lg"
          >
            <h3 className="text-center mb-4 text-info fs-2">
              Hello. I am Marc Aries.
            </h3>

            <p className="mb-4 fs-5 lh-lg text-secondary">
              I am an <strong className="text-info">I.T. student</strong> living in{" "}
              <strong className="text-info">La Trinidad</strong>, I enjoy messing around 
              with codes at times. Though I kind of prefer dealing with arts, like taking pictures, 
              drawing things, or even recording stuff. Though I am not really that good at it. 
              But I do hope to learn more about it in the future.
            </p>

            <p className="mb-4 fs-5 lh-lg text-secondary">
              It had become an habit of mine to take photos of things I see, especially from 
              nature. I love capturing those moments and keeping them. It feels like I won't 
              easily forget. It is like capturing a moment and immortalizing it. Though of 
              course it really won't be like that. Just the idea of it seems a little romantic, 
              nostalgic, and of course practical. You won't easily forget what you have 
              accessible within your devices.
            </p>

            <h4 className="text-center text-uppercase mb-4 mt-4 fs-6 small text-info">
              What I like to capture moments or themes of, as well as what I enjoy doing at times:
            </h4>

            <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3 mb-0">
              <li className="text-uppercase fw-medium small text-info">
                Photography & Videos: Nature, People, Expressions, Emotions, and Activities.
              </li>
              <li className="text-info">•</li>
              <li className="text-uppercase fw-medium small text-info">
                Beginner in Video Editing
              </li>
              <li className="text-info">•</li>
              <li className="text-uppercase fw-medium small text-info">
                Beginner in Web Development
              </li>
              <li className="text-info">•</li>
              <li className="text-uppercase fw-medium small text-info">
                Expert in prompt making.
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}