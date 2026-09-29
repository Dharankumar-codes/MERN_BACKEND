import React from 'react';
import { Filter } from 'lucide-react';

export default function FilterDropdown({ label, value, onChange, options, allOptionLabel = "All" }) {
  return (
    <div className="flex items-center space-x-2">
      {label && (
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
          {label}:
        </span>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-slate-300 text-slate-800 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer shadow-sm font-medium"
        >
          <option value="All">{allOptionLabel}</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <Filter className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
