import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://razasheikh092007_db_user:aWk4ZaC33xRHJMnH@cluster0.vgajj8s.mongodb.net/nikah_db?retryWrites=true&w=majority';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Schema & Model
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  date: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

// Connect to MongoDB Atlas
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas (Cluster0 - nikah_db)');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

connectDB();

// API Routes
// GET /api/comments - Fetch all guest comments
app.get('/api/comments', async (req, res) => {
  try {
    await connectDB();
    const comments = await Comment.find().sort({ createdAt: -1 }).limit(100);
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/comments - Post a new comment
app.post('/api/comments', async (req, res) => {
  try {
    await connectDB();
    const { name, text } = req.body;

    if (!name || !text) {
      return res.status(400).json({ error: 'Name and text are required fields' });
    }

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newComment = new Comment({
      name: name.trim(),
      text: text.trim(),
      date: formattedDate
    });

    const savedComment = await newComment.save();
    console.log(`💬 New comment saved from ${savedComment.name}`);
    res.status(201).json(savedComment);
  } catch (err) {
    console.error('Error saving comment:', err);
    res.status(500).json({ error: 'Failed to save comment' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongodb: isConnected ? 'connected' : 'connecting' });
});

// Start Express Server if run directly
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Nikah MongoDB Backend running at http://localhost:${PORT}`);
  });
}

export default app;
