import React from 'react';
import { Eye, Edit, Trash2, AlertCircle, FileX } from 'lucide-react';

export default function DataTable({
  columns,
  data,
  onView,
  onEdit,
  onDelete,
  emptyTitle = "No records found",
  emptySub = "Try adjusting your search query or status filters."
}) {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Active':
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Inactive':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Open':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300 font-bold';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Online':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Offline':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Online & Offline':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm my-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <FileX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">{emptyTitle}</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">{emptySub}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden my-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-bold uppercase tracking-wider border-b border-slate-700">
              {columns.map((col, idx) => (
                <th key={idx} className="py-3.5 px-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="py-3.5 px-4 font-semibold text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                className="hover:bg-blue-50/50 transition-colors group"
              >
                {columns.map((col, colIdx) => {
                  const val = row[col.accessor];
                  
                  // Render Badges for status, priority, or service type
                  if (col.isBadge) {
                    return (
                      <td key={colIdx} className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(val)}`}>
                          {val}
                        </span>
                      </td>
                    );
                  }

                  // Render Code ID column styling
                  if (col.accessor === 'id' || col.accessor === 'code') {
                    return (
                      <td key={colIdx} className="py-3.5 px-4 whitespace-nowrap font-mono text-xs font-bold text-slate-900">
                        {val}
                      </td>
                    );
                  }

                  return (
                    <td key={colIdx} className="py-3.5 px-4 max-w-xs truncate font-normal">
                      {col.render ? col.render(row) : val || '-'}
                    </td>
                  );
                })}

                {(onView || onEdit || onDelete) && (
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
                          title="View Details"
                          type="button"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-md transition-colors"
                          title="Edit Record"
                          type="button"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1.5 text-slate-600 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                          title="Delete Record"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
        <span>Showing <strong className="text-slate-800">{data.length}</strong> records</span>
        <span className="hidden sm:inline">Government Digital Database System</span>
      </div>
    </div>
  );
}
