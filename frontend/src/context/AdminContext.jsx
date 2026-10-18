import { createContext, useState } from "react";
import { students as studentsData } from "../assets/assets";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [students, setStudents] = useState(studentsData);
  const [payments, setPayments] = useState(studentsData);

  const feeData = students.flatMap((student) => student.payments.map((payment) => ({
    id: payment.id,
    studentName: student.name,
    rollNo: student.rollNo,
    feeType: payment.feeType,
    amount: `PKR ${payment.amount.toLocaleString()}`,
    date: payment.paidDate,
    status: payment.status,
  })))
  const value = {
    studentsData,
    students,
    setStudents,
    payments,
    setPayments,
    feeData,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
