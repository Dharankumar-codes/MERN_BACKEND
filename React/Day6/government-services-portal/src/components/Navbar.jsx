import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Landmark, Layers, Building2, FileText, AlertCircle, Home } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'Departments', path: '/departments', icon: Building2 },
    { name: 'Services', path: '/services', icon: FileText },
    { name: 'Issues', path: '/issues', icon: AlertCircle },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-gov-blue-900 text-white shadow-md border-b-4 border-yellow-500">
      {/* Top Banner Bar for Government Authenticity */}
      <div className="bg-slate-950 px-4 py-1 text-xs font-medium text-slate-300 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2 container mx-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Official State Digital Public Portal</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">Government of Public Welfare</span>
        </div>
        <div className="text-slate-400 text-xs hidden sm:block">
          Accessibility Compliant | English
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Side: Brand Logo & Title */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none">
            <div className="w-11 h-11 bg-white/10 rounded-lg p-2 flex items-center justify-center border border-white/20 shadow-inner group-hover:bg-white/20 transition-all">
              <Landmark className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight leading-none text-white">
                  Government Services Portal
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-1 font-normal tracking-wide">
                Unified Citizen Services & Support
              </p>
            </div>
          </Link>

          {/* Right Side Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-150 ${
                    active
                      ? 'bg-blue-800 text-white font-semibold shadow-sm border-b-2 border-yellow-400'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-yellow-400' : 'text-blue-300'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gov-blue-950 border-t border-blue-800 shadow-xl" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                    active
                      ? 'bg-blue-800 text-white border-l-4 border-yellow-400 pl-4'
                      : 'text-blue-100 hover:bg-blue-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-yellow-400' : 'text-blue-300'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
