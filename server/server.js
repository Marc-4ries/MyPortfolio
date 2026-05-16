import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Aries:myAriespass@aptechprojects.ns4ubnz.mongodb.net/?appName=AptechProjects')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB error: ", err));

const Feedback = mongoose.model('Feedback', new mongoose.Schema({
  username: String, email: String, needs: String, date: { type: Date, default: Date.now }
}));

const Work = mongoose.model('Work', new mongoose.Schema({
  title: String, link: String, previewImage: String, description: String
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

app.get('/api/works', async (req, res) => {
  const works = await Work.find();
  res.json(works);
});

app.post('/api/admin/works', async (req, res) => {
  const newWork = new Work(req.body);
  await newWork.save();
  res.json(newWork);
});

app.put('/api/admin/works/:id', async (req, res) => {
  const updated = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete('/api/admin/works/:id', async (req, res) => {
  await Work.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.get('/', (req, res) => {
  res.send("MyPortfolio Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
