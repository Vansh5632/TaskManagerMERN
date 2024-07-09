const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000; // Backend runs on port 5000

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the task schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  name:String
});

// Create a Task model based on the task schema
const Task = mongoose.model('Task', taskSchema);

// Get all tasks
// app.get('/api/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching tasks' });
//   }
// });
app.get('/api/tasks',async(req,res)=>{
  try{
    const {name} = req.query;
    const tasks = name? await Task.find({name}): await Task.find();
    res.json(tasks);
  }catch(error){
    res.status(500).send('server error');
  }
})

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const { text, completed ,name} = req.body;
  try {
    const newTask = new Task({ text, completed,name });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error saving task' });
  }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { text, completed }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
