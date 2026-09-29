import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function QuickAccessCard({ icon: Icon, title, description, linkTo, badgeText }) {
  return (
    <Link
      to={linkTo}
      className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl group-hover:bg-blue-100/60 transition-colors pointer-events-none"></div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-800 border border-blue-100 flex items-center justify-center group-hover:bg-blue-800 group-hover:text-white transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          {badgeText && (
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
              {badgeText}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-800 transition-colors mb-2 flex items-center">
          <span>{title}</span>
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-900 pt-4 border-t border-slate-100">
        <span>Manage {title}</span>
        <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </Link>
  );
}
