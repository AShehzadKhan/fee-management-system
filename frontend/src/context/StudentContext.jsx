import { createContext, useState } from "react";
import { fees, payments, allPayments } from "../assets/assets.js";

export const StudentContext = createContext();

const StudentContextProvider = ({children}) => {
    const [studentFees, setStudentFees] = useState(fees);
    const [recentPayments, setRecentPayments] = useState(payments);
    const [studentPayments, setStudentPayments] = useState(allPayments)
    
    const value = {
        studentFees,
        recentPayments,
        studentPayments,
    }
    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    )
}

export default StudentContextProvider;