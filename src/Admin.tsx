import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form, Card } from 'react-bootstrap';

const Admin = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [works, setWorks] = useState<any[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [workTitle, setWorkTitle] = useState('');
  const [workLink, setWorkLink] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const API = "https://onrender.com";

  const loadData = () => {
    axios.get(`${API}/admin/view-comments`).then(res => setComments(res.data));
    axios.get(`${API}/works`).then(res => setWorks(res.data));
  };

  useEffect(() => {
    // Secret password check using my password
    const pass = prompt("Admin Login Required:");
    if (pass === "My@admin@password") { 
      setIsLogged(true);
      loadData(); 
    } else {
      window.location.href = "/"; 
    }
  }, []);

  // CRUD function to add/update projects in MongoDB
  const handleWorkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/admin/works/${editingId}`, { title: workTitle, link: workLink });
      alert("Updated!");
    } else {
      await axios.post(`${API}/admin/works`, { title: workTitle, link: workLink });
      alert("Added!");
    }
    setWorkTitle(''); setWorkLink(''); setEditingId(null);
    loadData();
  };

  // copies email to clipboard using backticks
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert(`Copied: ${email}`);
  };

  if (!isLogged) return null;

  return (
    <div style={{ backgroundColor: '#0b0c10', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <h2 style={{ color: '#66fcf1' }} className="mb-4 text-center">Admin Dashboard</h2>

      {/* CRUD Section for Works */}
      <Card className="bg-dark border-info p-3 mb-5">
        <h4 style={{ color: '#66fcf1' }}>{editingId ? "Edit Project" : "Add Extra Project Link"}</h4>
        <Form onSubmit={handleWorkSubmit}>
          <Form.Control className="bg-dark text-white mb-2" placeholder="Title" value={workTitle} onChange={(e)=>setWorkTitle(e.target.value)} required />
          <Form.Control className="bg-dark text-white mb-2" placeholder="Link" value={workLink} onChange={(e)=>setWorkLink(e.target.value)} required />
          <Button type="submit" variant="info">{editingId ? "Update" : "Add"}</Button>
        </Form>
      </Card>

      <h4 style={{ color: '#66fcf1' }}>Portfolio Extras Table</h4>
      <Table striped bordered hover variant="dark" className="mb-5">
        <thead><tr><th>Title</th><th>Actions</th></tr></thead>
        <tbody>
          {works.map(w => (
            <tr key={w._id}>
              <td>{w.title}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => {setEditingId(w._id); setWorkTitle(w.title); setWorkLink(w.link);}}>Edit</Button>
                <Button variant="danger" size="sm" onClick={async () => { await axios.delete(`${API}/admin/works/${w._id}`); loadData(); }}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4 style={{ color: '#66fcf1' }}>Guest Messages</h4>
      <Table striped bordered hover variant="dark">
        <thead><tr style={{ color: '#66fcf1' }}><th>Name</th><th>Email</th><th>Message</th><th>Actions</th></tr></thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c._id}>
              <td>{c.username}</td><td>{c.email}</td><td>{c.needs}</td>
              <td>
                <Button variant="outline-info" size="sm" className="me-2" onClick={() => copyEmail(c.email)}>Copy Email</Button>
                <Button variant="danger" size="sm" onClick={async () => { await axios.delete(`${API}/admin/delete/${c._id}`); loadData(); }}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="secondary" onClick={() => window.location.href = "/"} className="mt-3">Back Home</Button>
    </div>
  );
};
export default Admin;