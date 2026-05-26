import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import supabase from './db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {

  const {
    name,
    email,
    password,
    gender,
    qualification
  } = req.body;

  const { error } = await supabase
    .from('students')
    .insert([
      {
        name,
        email,
        password,
        gender,
        qualification
      }
    ]);

  if (error) {
    return res.json({
      success: false,
      message: error.message
    });
  }

  res.json({
    success: true,
    message: 'Successfully Registered'
  });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
