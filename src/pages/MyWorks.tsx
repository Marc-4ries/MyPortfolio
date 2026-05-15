import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const API = "https://apptechfinalexam-myportfolio.onrender.com/api";

const initialWorks = [
  { title: "Unit 1 Lesson 1", link: "https://marc-4ries.github.io/UNIT1_LESSON1_A_BANTASAN/", description: "Foundational HTML/CSS" },
  { title: "FG Lab 2", link: "https://marc-4ries.github.io/FG_LAB2_Bantasan/", description: "CSS Layouts" },
  { title: "Event Dashboard", link: "https://marc-4ries.github.io/event-dashboard/", description: "Interactive UI" },
  { title: "Mg Lab 5", link: "https://marc-4ries.github.io/Mg_LAB_5/", description: "JavaScript Core" },
  { title: "Mg Lab 6", link: "https://marc-4ries.github.io/mg-lab-6-bantasan/", description: "Dynamic Content" },
  { title: "Finals Act 1", link: "https://marc-4ries.github.io/aptechfinals1act/", description: "Final Project" },
  { title: "Events Manager", link: "https://projectscreationteam.github.io/APPTECHPROJECT/", description: "Community event management platform" }
];

const MyWorks = () => {
  const [myWorks, setMyWorks] = useState<any[]>(initialWorks);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    axios.get(`${API}/works`).then(res => {
      if (res.data.length > 0) {
        setMyWorks([...initialWorks, ...res.data]);
      }
    }).catch(() => {});
  }, []);

  return (
    <Container className="py-5" style={{ backgroundColor: '#fdf8f0', minHeight: '100vh' }}>
      <h1 className="text-center mb-5" style={{ color: '#c17a3a', fontSize: '2.5rem' }}>All Projects</h1>
      <Row className="g-4">
        {myWorks.map((work, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title style={{ color: '#c17a3a', fontSize: '1.2rem' }}>{work.title}</Card.Title>
                <Card.Text style={{ color: '#7a6352' }}>{work.description || "Web project"}</Card.Text>
                <div className="d-flex gap-2 mt-3">
                  <Button variant="outline-success" href={work.link} target="_blank">
                    Open
                  </Button>
                  <Button variant="success" onClick={() => { setPreviewUrl(work.link); setShowPreview(true); }}>
                    Preview
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#fdf8f0' }}>
          <Modal.Title style={{ color: '#c17a3a' }}>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '500px', padding: 0 }}>
          <iframe src={previewUrl} style={{ width: '100%', height: '100%', border: 'none' }} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MyWorks;