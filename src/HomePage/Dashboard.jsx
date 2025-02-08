import React from "react";
import Navbar from "../components/Navbar";
import Scanner from "../components/Scanner";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="mt-23">
        <Scanner />
      </main>
     
      <Footer />
    </div>
  );
};

export default Dashboard;