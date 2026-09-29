import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'blue', subtext }) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      badge: 'bg-blue-100 text-blue-900',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-900',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      badge: 'bg-amber-100 text-amber-900',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-800 border-purple-200',
      badge: 'bg-purple-100 text-purple-900',
    }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
          {title}
        </p>
        <h4 className="text-3xl font-extrabold text-slate-900">
          {value}
        </h4>
        {subtext && (
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {subtext}
          </p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${theme.bg}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
