import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Supabase Connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Register Route
app.post("/register", async (req, res) => {

  try {

    console.log(req.body);

    const {
      name,
      email,
      password,
      gender,
      qualification
    } = req.body;

    // Insert into Supabase
    const { data, error } = await supabase
      .from("students")
      .insert([
        {
          name,
          email,
          password,
          gender,
          qualification
        }
      ])
      .select();

    if (error) {

      console.log(error);

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }

    res.status(200).json({
      success: true,
      message: "Successfully Registered",
      data
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
