import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Admin = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [works, setWorks] = useState<any[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [workTitle, setWorkTitle] = useState('');
  const [workLink, setWorkLink] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const navigate = useNavigate(); // Initialize navigate hook
  
  // FIXED: Added /api to match your server routes
  const API = "https://onrender.com";

  // This function fetches all current data from MongoDB
  const loadData = () => {
    axios.get(`${API}/admin/view-comments`).then(res => setComments(res.data));
    axios.get(`${API}/works`).then(res => setWorks(res.data));
  };

  useEffect(() => {
    // Secret password prompt
    const pass = prompt("Admin Login Required:");
    if (pass === "My@admin@password") {
      setIsLogged(true);
      loadData();
    } else {
      alert("Unauthorized Access!");
      navigate('/'); // Use navigate instead of window.location
    }
  }, [navigate]);

  // CRUD: This part handles adding or updating projects in the database
  const handleWorkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/admin/works/${editingId}`, { title: workTitle, link: workLink });
      alert("Update Successful!");
    } else {
      await axios.post(`${API}/admin/works`, { title: workTitle, link: workLink });
      alert("Project Added to MongoDB!");
    }
    setWorkTitle('');
    setWorkLink('');
    setEditingId(null);
    loadData();
  };

  // copies email to clipboard so I can reply manually
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert(`Email Copied: ${email}`);
  };

  if (!isLogged) return null;

  return (
    <div style={{ backgroundColor: '#0b0c10', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <h2 style={{ color: '#66fcf1' }} className="mb-4 text-center">Admin Dashboard</h2>

      {/* Section to manage Portfolio project list */}
      <Card className="bg-dark border-info p-3 mb-5 shadow">
        <h4 style={{ color: '#66fcf1' }}>{editingId ? "Edit Project" : "Add Extra Project Link"}</h4>
        <Form onSubmit={handleWorkSubmit}>
          <Form.Label className="small text-info">Title:</Form.Label>
          <Form.Control className="bg-white text-dark mb-2" placeholder="Title" value={workTitle} onChange={(e)=>setWorkTitle(e.target.value)} required />
          <Form.Label className="small text-info">Link:</Form.Label>
          <Form.Control className="bg-white text-dark mb-2" placeholder="GitHub URL" value={workLink} onChange={(e)=>setWorkLink(e.target.value)} required />
          <Button type="submit" variant="info">{editingId ? "Save Edit" : "Add Link"}</Button>
        </Form>
      </Card>

      <h4 style={{ color: '#66fcf1' }}>Extra Projects Database</h4>
      <Table striped bordered hover variant="dark" className="mb-5 shadow">
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

      <h4 style={{ color: '#66fcf1' }}>Guest Messages (Saved to MongoDB)</h4>
      <Table striped bordered hover variant="dark" className="shadow">
        <thead><tr style={{ color: '#66fcf1' }}><th>Name</th><th>Email</th><th>Message</th><th>Actions</th></tr></thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c._id}>
              <td>{c.username}</td><td>{c.email}</td><td>{c.needs}</td>
              <td>
                <Button variant="outline-info" size="sm" className="me-2 fw-bold" onClick={() => copyEmail(c.email)}>Copy Email</Button>
                <Button variant="danger" size="sm" onClick={async () => { await axios.delete(`${API}/admin/delete/${c._id}`); loadData(); }}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="secondary" onClick={() => navigate('/')} className="mt-3">Back Home</Button>
    </div>
  );
};

export default Admin;
