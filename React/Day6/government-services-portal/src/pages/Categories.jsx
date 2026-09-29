import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import ViewDetailModal from '../components/ViewDetailModal';
import Toast from '../components/Toast';
import { getItems, addItem, updateItem, deleteItem, generateId, KEYS } from '../utils/storage';
import { Plus, Layers, AlertCircle } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [toast, setToast] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  });

  const [formErrors, setFormErrors] = useState({});

  const loadCategories = () => {
    setCategories(getItems(KEYS.CATEGORIES));
  };

  useEffect(() => {
    loadCategories();
    window.addEventListener('gov_storage_change', loadCategories);
    return () => window.removeEventListener('gov_storage_change', loadCategories);
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', status: 'Active' });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name || '',
      description: cat.description || '',
      status: cat.status || 'Active'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Category Name is required.';
    if (!formData.description.trim()) errors.description = 'Description is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingCategory) {
      // Update
      updateItem(KEYS.CATEGORIES, editingCategory.id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status
      });
      setToast({ type: 'success', title: 'Category Updated', message: `Category "${formData.name}" was successfully updated.` });
    } else {
      // Create
      const newCat = {
        id: generateId('CAT'),
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addItem(KEYS.CATEGORIES, newCat);
      setToast({ type: 'success', title: 'Category Created', message: `Category "${formData.name}" was added to LocalStorage.` });
    }

    setIsFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategory) return;
    deleteItem(KEYS.CATEGORIES, deletingCategory.id);
    setToast({ type: 'error', title: 'Category Deleted', message: `Category "${deletingCategory.name}" has been removed.` });
    setDeletingCategory(null);
  };

  // Filter & Search Combined Logic
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus =
        statusFilter === 'All' || cat.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Category Name', accessor: 'name', render: (row) => <strong className="text-slate-900">{row.name}</strong> },
    { header: 'Description', accessor: 'description' },
    { header: 'Status', accessor: 'status', isBadge: true },
    { header: 'Created Date', accessor: 'createdAt' }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Categories
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage government service categories.
          </p>
        </div>

        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search category name or description..."
        />
        <FilterDropdown
          label="Filter by Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' }
          ]}
        />
      </div>

      {/* Categories Data Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        onView={(row) => setViewingCategory(row)}
        onEdit={(row) => openEditModal(row)}
        onDelete={(row) => setDeletingCategory(row)}
        emptyTitle="No Categories Found"
        emptySub="No government categories match your criteria. Click '+ Add Category' to create one."
      />

      {/* Add / Edit Category Modal Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Healthcare, Education, Transport"
              className={`w-full px-3.5 py-2 border rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                formErrors.name ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {formErrors.name && (
              <p className="text-xs text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {formErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of government services governed under this category..."
              className={`w-full px-3.5 py-2 border rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                formErrors.description ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {formErrors.description && (
              <p className="text-xs text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {formErrors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim() || !formData.description.trim()}
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow transition-colors"
            >
              {editingCategory ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingCategory?.name}
      />

      {/* View Detail Modal */}
      <ViewDetailModal
        isOpen={!!viewingCategory}
        onClose={() => setViewingCategory(null)}
        data={viewingCategory}
        type="Category"
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
