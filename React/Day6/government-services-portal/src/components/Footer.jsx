import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Phone, Mail, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-gov-blue-900 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Government Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-slate-900 font-bold">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Government Services Portal</h3>
                <p className="text-xs text-slate-400">Official e-Governance System</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering citizens through transparent, accessible, and efficient digital public administration.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors flex items-center">
                  <span>Home Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-yellow-400 transition-colors flex items-center">
                  <span>Service Categories</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-yellow-400 transition-colors flex items-center">
                  <span>Government Departments</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-yellow-400 transition-colors flex items-center">
                  <span>Public Services Directory</span>
                </Link>
              </li>
              <li>
                <Link to="/issues" className="hover:text-yellow-400 transition-colors flex items-center">
                  <span>Citizen Issue Reporting</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Citizen Support Contacts */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Citizen Support & Helpline
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Toll-Free Helpline: 1800-11-2026</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@govportal.state.gov</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Cyber Security & Grievance Desk</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Compliance & Accessibility */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Compliance & Security
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              This portal adheres to international Web Content Accessibility Guidelines (WCAG 2.1 Level AA) and Data Privacy Regulations.
            </p>
            <div className="inline-block px-3 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700 font-mono">
              Status: All Systems Operational
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Government Services Portal. All Rights Reserved. Public Domain Portfolio Project.</p>
          <p className="mt-2 sm:mt-0">Built with React, Vite & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
