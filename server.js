
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const multer = require('multer');

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/Nyx';
const AWS_BUCKET_NAME = 'classroom-training-bucket';
const AWS_ACCESS_KEY_ID = 'AKIAY3L35MCRZNIRGT6N';
const AWS_SECRET_ACCESS_KEY = '9f+YFBVcSjZWM6DG9R4TUN8k8TGe4X+lXmO4jPiU';
const AWS_REGION = 'ap-south-1'; // Update this to the appropriate region for your S3 bucket
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  }
}).array('images', 10);

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  description:{ type: String, required: true},
  images: { type: [String], required: false },
});

const Record = mongoose.model('Record', recordSchema);

app.get('/api/records', async (req, res) => {
  const records = await Record.find();
  res.json(records);
});


app.post('/api/records', upload, async (req, res) => {
  const { name, email,mobile,description } = req.body;
  const images = req.files.map(file => file.location);
  const record = new Record({ name, email, mobile, description,images});
  await record.save();
  io.emit('recordAdded', record);
  res.json(record);
});

app.put('/api/update/:name', upload, async (req, res) => {
  const { email, mobile, description } = req.body;
  const images = req.files.map(file => file.location);
  const name = req.params.name; // Extract the name from the URL parameter
  
  const record = await Record.findOne({ name: name });
  
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }
  
  // Only update the name field if it's different from the current value
  if (record.name !== name) {
    record.name = name;
  }
  
  record.email = email;
  record.mobile = mobile;
  record.description = description;
  record.images = images;
  
  await record.save();
  io.emit('recordUpdated', record);
  res.json(record);
});



app.delete('/api/records/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const record = await Record.findOneAndDelete({ name });

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    io.emit('recordDeleted', record);
    return res.json({ message: 'Record successfully deleted' });
  } catch (error) {
    console.error('Error deleting record:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));