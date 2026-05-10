import dns from 'node:dns'; 
dns.setServers(['8.8.8.8', '1.1.1.1']); 
import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

// STRICTLY MONGODB: This is your exact connection link from the PDF
mongoose.connect('mongodb+srv://20255221_db_user:DdO3Y6cPFpSVhwRQ@aptechprojects.ns4ubnz.mongodb.net/?appName=AptechProjects') 
.then(() => console.log("MongoDB connected successfully!")) 
.catch(err => console.log("DB error: ", err)); 

const Feedback = mongoose.model('Feedback', new mongoose.Schema({ 
    username: String, 
    email: String, 
    needs: String, 
    date: { type: Date, default: Date.now } 
})); 

app.post('/api/feedback', async (req, res) => { 
    try { 
        const entry = new Feedback(req.body); 
        await entry.save(); 
        res.status(201).send({ message: "Saved" }); 
    } catch (err) { res.status(500).send({ error: "Failed" }); } 
}); 

app.get('/api/admin/view-comments', async (req, res) => { 
    try { 
        const all = await Feedback.find().sort({ date: -1 }); 
        res.json(all); 
    } catch (err) { res.status(500).send("Error"); } 
}); 

app.delete('/api/admin/delete/:id', async (req, res) => { 
    try { 
        await Feedback.findByIdAndDelete(req.params.id); 
        res.status(200).send({ message: "Deleted" }); 
    } catch (err) { res.status(500).send({ error: "Delete failed" }); } 
}); 

// This line allows Render to assign a port so the server stays alive online
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));