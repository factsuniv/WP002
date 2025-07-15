import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

// Import components
import HomePage from "./components/HomePage";
import WhitePaperViewer from "./components/WhitePaperViewer";
import QOFADemo from "./components/QOFADemo";
import PresentationDeck from "./components/PresentationDeck";
import AboutQOFA from "./components/AboutQOFA";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <BrowserRouter>
        <Navigation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/whitepaper" element={<WhitePaperViewer />} />
            <Route path="/demo" element={<QOFADemo />} />
            <Route path="/presentation" element={<PresentationDeck />} />
            <Route path="/about" element={<AboutQOFA />} />
          </Routes>
        </motion.div>
      </BrowserRouter>
    </div>
  );
}

export default App;