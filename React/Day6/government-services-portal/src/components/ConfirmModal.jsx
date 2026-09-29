import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, itemName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || "Confirm Deletion"} maxWidth="max-w-md">
      <div className="text-center py-2">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-base font-semibold text-slate-800 mb-2">
          Are you sure you want to delete <span className="text-red-700 font-bold">"{itemName}"</span>?
        </p>
        <p className="text-sm text-slate-500 mb-6">
          {message || "This action cannot be undone. All associated records will be permanently removed from LocalStorage."}
        </p>
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg shadow transition-colors"
          >
            Yes, Delete Record
          </button>
        </div>
      </div>
    </Modal>
  );
}
