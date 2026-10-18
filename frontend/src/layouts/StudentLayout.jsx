import React from 'react'
import StudentContextProvider from '../context/AdminContext'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { CreditCard,  LayoutDashboard, ReceiptText, User } from 'lucide-react'
import { Outlet } from 'react-router-dom'


const StudentLayout = () => {
    
        const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "Payments", icon:CreditCard, path: "/student/payments" },
  { label: "Fees", icon:  ReceiptText,path: "/student/fees" },
  { label: "Profile", icon: User, path: "/student/profile" },
]
  return (
    <>
        <StudentContextProvider>
            <Navbar navText={"Come To Learn, Go To Serve"} navItems={navItems}/>
            <Sidebar navItems={navItems}/>
            <main className="mt-20 md:ml-64 sm:mt-26 md:mt-32 p-4 md:p-6'">
          <Outlet/>
        </main>
        </StudentContextProvider>
    </>
  )
}

export default StudentLayout