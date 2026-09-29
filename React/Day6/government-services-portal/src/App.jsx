import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Departments from './pages/Departments';
import Services from './pages/Services';
import Issues from './pages/Issues';
import { initializeStorage } from './utils/storage';

export default function App() {
  useEffect(() => {
    // Seed LocalStorage with initial data if empty
    initializeStorage();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 selection:bg-blue-200 selection:text-blue-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/services" element={<Services />} />
            <Route path="/issues" element={<Issues />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
