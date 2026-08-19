import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGODB_URI = 'mongodb+srv://razasheikh092007_db_user:aWk4ZaC33xRHJMnH@cluster0.vgajj8s.mongodb.net/nikah_db?retryWrites=true&w=majority';

console.log('Testing inserting a comment directly into MongoDB...');

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
  .then(async () => {
    console.log('✅ Connected!');
    const commentSchema = new mongoose.Schema({
      name: { type: String, required: true },
      text: { type: String, required: true },
      date: String,
      createdAt: { type: Date, default: Date.now }
    });
    const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
    
    const doc = new Comment({
      name: "Test User",
      text: "Testing MongoDB comment persistence",
      date: "Aug 19, 2026"
    });

    const saved = await doc.save();
    console.log('✅ Saved document:', saved);

    const all = await Comment.find().sort({ createdAt: -1 });
    console.log('✅ Total comments in MongoDB:', all.length);
    console.log('Comments list:', all);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error details:', err);
    process.exit(1);
  });
