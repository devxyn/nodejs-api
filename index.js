import express from "express";
import process from "node:process";
import bodyParser from "body-parser";
import StudentFactory from "./factories/StudentFactory.js";
import StudentRepository from "./repositories/studentRepository.js";
import mongoose from "mongoose";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 3000;
const { connect } = mongoose;

await connect(process.env.DB_URL, {
  dbName: process.env.DB_NAME,
});

app.set("port", PORT);

// Add your middleware
app.use(bodyParser.json());

// All the students
const studentRepository = new StudentRepository();

// Initialize student factory
const studentFactory = new StudentFactory();

// Create a student - POST: /api/student
app.post("/api/student", async (req, res) => {
  // Get the student data from the req body (req.body)
  const { name, email } = req.body;
  // Create a new student object with the data
  const student = studentFactory.create(name, email);
  // Add the student to the students array
  await studentRepository.save(student);
  // Response with a success message
  res.status(201).json({ message: "Student created successfully!", student });
});

// Get all students - GET: /api/students
app.get("/api/students", async (req, res) => {
  // Response the list of students
  res.status(200).json({ data: await studentRepository.getAllStudents() });
});

//Get a student specific student - GET: /api/student/:id
app.get("/api/student/:id", async (req, res) => {
  try {
    const student = await studentRepository.findById(req.params.id);
    res.status(200).json({ data: student });
  } catch (e) {
    res.status(404).json({ message: e.message || "Student not found!" });
  }
});

app.patch("/api/student/:id", async (req, res) => {
  try {
    const student = await studentRepository.updateById(req.params.id, req.body);
    res.status(200).json({ message: "Student updated successfully!", data: student });
  } catch (error) {
    res.status(404).json({ message: error.message || "Student not found!" });
  }
});

app.delete("/api/student/:id", async (req, res) => {
  try {
    await studentRepository.deleteById(req.params.id);
    res.status(204).json({});
  } catch (error) {
    res.status(404).json({ message: error.message || "Student not found!" });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
