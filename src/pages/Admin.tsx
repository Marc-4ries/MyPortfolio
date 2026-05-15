import { useState } from 'react';
import { Container, Table, Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = "https://apptechfinalexam-myportfolio.onrender.com/api";

const Admin = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [work, setWork] = useState({ id: null, title: "", link: "", previewImage: "", description: "" });
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");

  const loadData = async () => {
    const worksRes = await axios.get(`${API}/works`);
    setWorks(worksRes.data);
    const commentsRes = await axios.get(`${API}/admin/view-comments`);
    setComments(commentsRes.data);
  };

  const handleLogin = () => {
    if (password === "admin123") {
      setIsLogged(true);
      loadData();
    } else {
      alert("Wrong password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = work.id ? `${API}/admin/works/${work.id}` : `${API}/admin/works`;
    const method = work.id ? 'put' : 'post';
    await axios[method](url, { title: work.title, link: work.link, previewImage: work.previewImage, description: work.description });
    alert(work.id ? "Updated" : "Added");
    setWork({ id: null, title: "", link: "", previewImage: "", description: "" });
    loadData();
  };

  const deleteItem = async (path: string) => {
    if (window.confirm("Delete?")) {
      await axios.delete(`${API}${path}`);
      loadData();
    }
  };

  if (!isLogged) {
    return (
      <Container className="py-5" style={{ backgroundColor: '#fdf8f0', minHeight: '100vh' }}>
        <Card className="p-4 mx-auto" style={{ maxWidth: '400px' }}>
          <h3 className="text-center" style={{ color: '#c17a3a' }}>Admin Access</h3>
          <Form.Control
            type="password"
            placeholder="Password"
            className="mb-3"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
          />
          <Button variant="success" onClick={handleLogin}>Login</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ backgroundColor: '#fdf8f0', minHeight: '100vh' }}>
      <h2 className="text-center mb-4" style={{ color: '#c17a3a' }}>Admin Dashboard</h2>
      
      <Card className="p-4 mb-5">
        <h4 style={{ color: '#c17a3a' }}>{work.id ? "Edit Project" : "Add Project"}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Control className="mb-2" placeholder="Title" value={work.title} onChange={e => setWork({...work, title: e.target.value})} required />
          <Form.Control className="mb-2" placeholder="Project URL" value={work.link} onChange={e => setWork({...work, link: e.target.value})} required />
          <Form.Control className="mb-2" placeholder="Preview Image URL (optional)" value={work.previewImage} onChange={e => setWork({...work, previewImage: e.target.value})} />
          <Form.Control className="mb-2" placeholder="Description" value={work.description} onChange={e => setWork({...work, description: e.target.value})} />
          <Button type="submit" variant="success">{work.id ? "Save" : "Add"}</Button>
          {work.id && <Button variant="secondary" className="ms-2" onClick={() => setWork({ id: null, title: "", link: "", previewImage: "", description: "" })}>Cancel</Button>}
        </Form>
      </Card>

      <h4 className="mb-3" style={{ color: '#c17a3a' }}>Projects</h4>
      <Table striped bordered hover className="mb-4">
        <thead><tr><th>Title</th><th>Actions</th></tr></thead>
        <tbody>
          {works.map(w => (
            <tr key={w._id}>
              <td>{w.title}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => setWork({ id: w._id, title: w.title, link: w.link, previewImage: w.previewImage, description: w.description })}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => deleteItem(`/admin/works/${w._id}`)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 className="mb-3" style={{ color: '#c17a3a' }}>Guest Messages</h4>
      <Table striped bordered hover>
        <thead><tr><th>Guest</th><th>Message</th><th>Action</th></tr></thead>
        <tbody>
          {comments.map(c => (
            <tr key={c._id}>
              <td>{c.username}<br/><small className="text-muted">{c.email}</small></td>
              <td>{c.needs}</td>
              <td><Button variant="danger" size="sm" onClick={() => deleteItem(`/admin/delete/${c._id}`)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Button variant="outline-success" onClick={() => navigate("/")}>Back to Site</Button>
    </Container>
  );
};

export default Admin;