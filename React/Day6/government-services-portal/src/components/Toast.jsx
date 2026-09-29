import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const styles = {
    success: 'bg-emerald-800 text-white border-emerald-600',
    error: 'bg-red-800 text-white border-red-600',
    info: 'bg-blue-900 text-white border-blue-700'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-300 flex-shrink-0" />
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-bounce-short">
      <div className={`p-4 rounded-xl shadow-2xl border flex items-start justify-between ${styles[toast.type] || styles.info}`}>
        <div className="flex items-start space-x-3">
          {icons[toast.type] || icons.info}
          <div>
            <h4 className="text-sm font-bold tracking-tight">{toast.title || 'Notification'}</h4>
            <p className="text-xs text-slate-100 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-slate-300 hover:text-white p-1 rounded-md"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
