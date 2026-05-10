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
.then(() => console.log("MongoDB connected successfully!")) 
.catch(err => console.log("DB error: ", err)); 

// This is the model for guest feedback
const Feedback = mongoose.model('Feedback', new mongoose.Schema({ 
    username: String, email: String, needs: String, date: { type: Date, default: Date.now } 
})); 

// This is the new model for my portfolio links so I can edit them from Admin
const Work = mongoose.model('Work', new mongoose.Schema({
    title: String,
    link: String
}));
//ROUTES
//to save new guest feedback
app.post('/api/feedback', async (req, res) => { 
    try { 
        const entry = new Feedback(req.body); 
        await entry.save(); 
        res.status(201).send({ message: "Saved" }); 
    } catch (err) { res.status(500).send({ error: "Failed" }); } 
}); 

//to get all guest messages for my admin table
app.get('/api/admin/view-comments', async (req, res) => { 
    try { 
        const all = await Feedback.find().sort({ date: -1 }); 
        res.json(all); 
    } catch (err) { res.status(500).send("Error"); } 
}); 

//to delete feedback messages
app.delete('/api/admin/delete/:id', async (req, res) => { 
    try { 
        await Feedback.findByIdAndDelete(req.params.id); 
        res.status(200).send({ message: "Deleted" }); 
    } catch (err) { res.status(500).send({ error: "Delete failed" }); } 
}); 

//CRUD
//to get all my project links for the home page
app.get('/api/works', async (req, res) => {
    const works = await Work.find();
    res.json(works);
});

//to add a new project link through Admin
app.post('/api/admin/works', async (req, res) => {
    const newWork = new Work(req.body);
    await newWork.save();
    res.json(newWork);
});

//to update an existing project
app.put('/api/admin/works/:id', async (req, res) => {
    const updated = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

//to delete a project from the portfolio
app.delete('/api/admin/works/:id', async (req, res) => {
    await Work.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

app.get('/', (req, res) => {
    res.send("Marc's Apptech Backend is running perfectly!");
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));