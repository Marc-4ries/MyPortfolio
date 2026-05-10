import dns from 'node:dns'; 
dns.setServers(['8.8.8.8', '1.1.1.1']); 
import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

// Connecting to my database 
mongoose.connect('mongodb+srv://20255221_db_user:DdO3Y6cPFpSVhwRQ@aptechprojects.ns4ubnz.mongodb.net/?appName=AptechProjects') 
.then(() => console.log("Database connected successfully!")) 
.catch(err => console.log("DB error: ", err)); 

const Feedback = mongoose.model('Feedback', new mongoose.Schema({ 
    username: String, 
    email: String, 
    needs: String, 
    date: { type: Date, default: Date.now } 
})); 

//the route to save new entries 
app.post('/api/feedback', async (req, res) => { 
    try { 
        const entry = new Feedback(req.body); 
        await entry.save(); 
        res.status(201).send({ message: "Saved" }); 
    } catch (err) { 
        res.status(500).send({ error: "Failed" }); 
    } 
}); 

//the route to fetch all entries 
app.get('/api/admin/view-comments', async (req, res) => { 
    try { 
        const all = await Feedback.find().sort({ date: -1 }); 
        res.json(all); 
    } catch (err) { 
        res.status(500).send("Error"); 
    } 
}); 

//route that allows me to delete a comment using its unique MongoDB ID 
app.delete('/api/admin/delete/:id', async (req, res) => { 
    try { 
        await Feedback.findByIdAndDelete(req.params.id); 
        res.status(200).send({ message: "Deleted" }); 
    } catch (err) { 
        res.status(500).send({ error: "Delete failed" }); 
    } 
}); 

// Updated for Cloud Deployment: 
// This checks if there is a port provided by the host (Render), otherwise it uses 5000 for your local PC
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server is live on port ${PORT}`));
