const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const route = require('./routes/route');
const app = express();
require('dotenv').config()
app.use(express.json());
app.use (cors())
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB ,{
    useNewUrlParser: true
}).then(() => console.log('MongoDB is Connected'))
    .catch((err) => console.log(err))

app.use("/", route);

app.listen( process.env.PORT || 3001, () => {
    console.log('Server running on port', (process.env.PORT || 3002));
})