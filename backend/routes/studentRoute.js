import express from "express";

import {
  getAllStudents,
  getStudentById,
  getMyProfile,
  updateStudent,
} from "../controllers/studentController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const studentRouter = express.Router();

// Student accesses only their own profile
studentRouter.get("/me", protect, authorize("student"), getMyProfile);

// Admin-only routes
studentRouter.get("/", protect, authorize("admin"), getAllStudents);

studentRouter.get("/:id", protect, authorize("admin"), getStudentById);

studentRouter.put("/:id", protect, authorize("admin"), updateStudent);

export default studentRouter;
