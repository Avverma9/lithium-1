
const express = require('express')
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

const PORT = process.env.PORT || 3001;
const MONGO_URI = 'mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/CarData';
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
// ===============================================user Schema========================================================//
const UserSchema = new mongoose.Schema({
  budget: { type: String, required: false },
  year: { type: String, required: false },
  bodytype: { type: String, required: false },
  fueltype: { type: String, required: false },
  fromrange:{ type: String, required: false},
  mileage:{ type: String, required: false},
  brand:{ type: String, required: false},
  location:{ type: String, required: false},
  owner:{ type: String, required: false},
  price:{ type: String, required: false},
  model:{ type: String, required: false},
  images: { type: [String], required: false },
});

const signUp = mongoose.model('cars', UserSchema);

app.post('/signup', upload, async (req, res) => {
  const {budget, year, bodytype, fueltype, under, fromrange, mileage, brand, location, owner, price, model} = req.body;
  const images = req.files.map(file => file.location);
  const user = new signUp({ budget, year, bodytype, fueltype, under, fromrange, mileage, brand, location, owner, price, model,images});
  await user.save();
  io.emit('recordAdded', user);
  res.json(user);
});

// Existing code...

// GET endpoint to retrieve data by brand name
app.get('/get/:model', async (req, res) => {
  const {model} = req.params

  try {
    const filteredRecords = await signUp.find({ model});

    if (filteredRecords.length === 0) {
      return res.status(404).json({ message: 'No records found for the specified brand.' });
    }

    res.json(filteredRecords);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Existing code...


app.get('/getall', async (req, res) => {
  
  const records = await signUp.find();
  res.json(records);
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));