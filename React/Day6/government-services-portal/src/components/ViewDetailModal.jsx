import React from 'react';
import Modal from './Modal';
import { Calendar, Tag, Building2, Shield, Info, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function ViewDetailModal({ isOpen, onClose, data, type = 'Service' }) {
  if (!data) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${type} Information Detail`} maxWidth="max-w-lg">
      <div className="space-y-6">
        
        {/* Header summary badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-between items-start">
          <div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              {data.id || data.code || 'GOV-REC'}
            </span>
            <h4 className="text-xl font-extrabold text-slate-900 mt-2">
              {data.name || data.title}
            </h4>
            {data.code && (
              <p className="text-xs text-slate-500 font-mono mt-0.5">Code: {data.code}</p>
            )}
          </div>
          {data.status && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              data.status === 'Active' || data.status === 'Resolved'
                ? 'bg-emerald-100 text-emerald-800'
                : data.status === 'In Progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {data.status}
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {data.category && (
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <span className="text-xs text-slate-400 font-semibold uppercase flex items-center mb-1">
                <Tag className="w-3.5 h-3.5 mr-1 text-blue-600" /> Category
              </span>
              <p className="font-semibold text-slate-800">{data.category}</p>
            </div>
          )}

          {data.department && (
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <span className="text-xs text-slate-400 font-semibold uppercase flex items-center mb-1">
                <Building2 className="w-3.5 h-3.5 mr-1 text-blue-600" /> Department
              </span>
              <p className="font-semibold text-slate-800">{data.department}</p>
            </div>
          )}

          {data.serviceType && (
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <span className="text-xs text-slate-400 font-semibold uppercase flex items-center mb-1">
                <FileText className="w-3.5 h-3.5 mr-1 text-blue-600" /> Delivery Mode
              </span>
              <p className="font-semibold text-slate-800">{data.serviceType}</p>
            </div>
          )}

          {data.priority && (
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
              <span className="text-xs text-slate-400 font-semibold uppercase flex items-center mb-1">
                <AlertCircle className="w-3.5 h-3.5 mr-1 text-blue-600" /> Priority Level
              </span>
              <p className="font-semibold text-slate-800">{data.priority}</p>
            </div>
          )}

          {data.createdAt && (
            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm sm:col-span-2">
              <span className="text-xs text-slate-400 font-semibold uppercase flex items-center mb-1">
                <Calendar className="w-3.5 h-3.5 mr-1 text-blue-600" /> Registration Date
              </span>
              <p className="font-semibold text-slate-800">{data.createdAt}</p>
            </div>
          )}
        </div>

        {/* Description Section */}
        {data.description && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Full Overview & Description
            </span>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {data.description}
            </p>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm rounded-lg transition-colors"
          >
            Close Detail Window
          </button>
        </div>
      </div>
    </Modal>
  );
}
