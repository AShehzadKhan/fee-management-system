import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import studentModel from "../models/studentModel.js";
import studentSchema from "../validations/studentValidation.js";

// Create JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ---------- LOGIN ----------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    // Get the student profile (only if role is student)
    const student = await studentModel.findOne({ user: user._id });

    const token = createToken(user._id); // ✅ sign User id

    res.json({
      success: true,
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: student?.phone || "",
        dateOfBirth: student?.dateOfBirth || "",
        address: student?.address || "",
        rollNo: student?.rollNo || "",
        department: student?.department || "",
        program: student?.program || "",
        semester: student?.semester || "",
        session: student?.session || "",
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------- REGISTER ----------
const registerUser = async (req, res) => {
  try {
    // 1. Validate
    const { error, value } = studentSchema.validate(req.body, {
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // 2. Check duplicates
    const existingUser = await userModel.findOne({ email: value.email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const existingRollNo = await studentModel.findOne({ rollNo: value.rollNo });
    if (existingRollNo) {
      return res.json({ success: false, message: "Roll No already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    // 4. Create User (auth info only)
    const newUser = await userModel.create({
      name: value.name,
      email: value.email,
      password: hashedPassword,
      role: "student",
    });

    // 5. Create Student (academic info only)
    const newStudent = await studentModel.create({
      user: newUser._id,
      phone: value.phone,
      dateOfBirth: value.dateOfBirth,
      address: value.address,
      rollNo: value.rollNo.toUpperCase(),
      department: value.department,
      program: value.program,
      semester: value.semester,
      session: value.session,
    });

    // 6. Token for immediate login after registration
    const token = createToken(newUser._id); // ✅ sign User id

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newStudent.phone,
        dateOfBirth: newStudent.dateOfBirth,
        address: newStudent.address,
        rollNo: newStudent.rollNo,
        department: newStudent.department,
        program: newStudent.program,
        semester: newStudent.semester,
        session: newStudent.session,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser };
