import mongoose from 'mongoose';
import dns from 'dns';

// DNS Fix for MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://razasheikh092007_db_user:aWk4ZaC33xRHJMnH@cluster0.vgajj8s.mongodb.net/nikah_db?retryWrites=true&w=majority';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  date: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  const db = await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  cachedDb = db;
  return db;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const comments = await Comment.find().sort({ createdAt: -1 }).limit(100);
      return res.status(200).json(comments);
    }

    if (req.method === 'POST') {
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
      return res.status(201).json(savedComment);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
