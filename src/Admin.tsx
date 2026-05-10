import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const Admin = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [isLogged, setIsLogged] = useState(false);

  //This gets all the guest data from my MongoDB
  const fetchComments = () => {
    axios.get('http://localhost:5000/api/admin/view-comments')
      .then(res => setComments(res.data))
      .catch(err => console.log("Database error:", err));
  };

  useEffect(() => {
    //the secret password check
    const pass = prompt("Admin Login Required:");
    if (pass === "My@admin@password") { 
      setIsLogged(true);
      fetchComments(); 
    } else {
      alert("Unauthorized!");
      window.location.href = "/"; 
    }
  }, []);

  //Delete a specific feedback by ID
  const deleteFeedback = (id: string) => {
    if (window.confirm("Delete this record permanently?")) {
      axios.delete(`http://localhost:5000/api/admin/delete/${id}`)
        .then(() => {
          alert("Record deleted!");
          fetchComments(); 
        })
        .catch(() => alert("Error deleting from database."));
    }
  };

  // copies the email to my clipboard
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    alert(`Copied: ${email}`);
  };

  if (!isLogged) return null;

  return (
    <div style={{ backgroundColor: '#0b0c10', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <h2 style={{ color: '#66fcf1' }} className="mb-4">Admin - Guest Feedback Dashboard</h2>
      
      <Table striped bordered hover variant="dark" style={{ borderColor: '#45a29e' }}>
        <thead>
          <tr style={{ color: '#66fcf1' }}>
            <th>Guest Name</th>
            <th>Email Address</th>
            <th>Message</th>
            <th>Date Received</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c._id}>
              <td>{c.username}</td>
              <td>{c.email}</td>
              <td>{c.needs}</td>
              {/*shows the time*/}
              <td>{new Date(c.date).toLocaleString()}</td>
              <td>
                <Button 
                  variant="outline-info" 
                  size="sm" 
                  className="me-2 fw-bold"
                  onClick={() => copyEmail(c.email)}
                >
                  Copy Email
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  className="fw-bold"
                  onClick={() => deleteFeedback(c._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Button variant="secondary" onClick={() => window.location.href = "/"} className="mt-3">
        Back to Home
      </Button>
    </div>
  );
};

export default Admin;
