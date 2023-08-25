const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const dbUrl = 'mongodb://localhost:27017/table';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


const tablesRouter = require('./routes/tables')
app.use('/tables' , tablesRouter);
x
app.listen(port , () => {
    console.log(`Server is tunning on port ${port}`);
})