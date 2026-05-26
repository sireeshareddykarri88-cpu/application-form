import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Server Running Successfully");
});

// Register Route
app.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      gender,
      qualification
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !qualification
    ) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });

    }

    // Insert Data into Supabase
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

    // Error Handling
    if (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

    // Success Response
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

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
