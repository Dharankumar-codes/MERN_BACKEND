import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Search, FileText } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-gov-blue-900 to-slate-900 text-white overflow-hidden py-12 md:py-20 border-b border-slate-800">
      {/* Subtle Background Geometric Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-700/50 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-blue-200 mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official State e-Governance Platform</span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Government Services Made Simple
          </h1>

          {/* Subtitle Description */}
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            Access government departments, public services and citizen support from one place.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all border border-blue-500 group"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform text-yellow-300" />
            </Link>

            <Link
              to="/issues"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white font-medium text-base rounded-lg border border-white/20 transition-all"
            >
              <FileText className="w-5 h-5 mr-2 text-blue-300" />
              <span>Report Citizen Issue</span>
            </Link>
          </div>

          {/* Key Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-blue-200 font-medium">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant LocalStorage Data Persistence</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Relational Dept & Service Binding</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full CRUD & Validation Control</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
