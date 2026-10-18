import mongoose from "mongoose";
import Student from "../models/studentModel.js";

// GET /api/students
// Admin: Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};

// GET /api/students/:id
// Admin: Get one student
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    const student = await Student.findById(id).populate("user", "name email");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student",
    });
  }
};

// GET /api/students/me
// Student: Get their own profile
const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      user: req.user._id,
    }).populate("user", "name email");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your profile",
    });
  }
};

// PUT /api/students/:id
// Admin: Update a student's details
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    // Only allow these fields to be updated
    const allowedFields = [
      "phone",
      "dateOfBirth",
      "address",
      "rollNo",
      "department",
      "program",
      "semester",
      "session",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true },
    ).populate("user", "name email");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Roll number already exists",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid student data",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update student",
    });
  }
};

export { getAllStudents, getStudentById, getMyProfile, updateStudent };
