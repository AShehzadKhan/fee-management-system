import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    program: { type: String, required: true },
    semester: { type: String, required: true },
    session: { type: String, required: true },
  },
  { timestamps: true }
);

const studentModel = mongoose.model("Student", studentSchema);
export default studentModel;