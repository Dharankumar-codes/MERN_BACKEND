import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import ViewDetailModal from '../components/ViewDetailModal';
import Toast from '../components/Toast';
import { getItems, addItem, updateItem, deleteItem, generateId, KEYS } from '../utils/storage';
import { Plus, Building2, AlertCircle } from 'lucide-react';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [viewingDept, setViewingDept] = useState(null);
  const [deletingDept, setDeletingDept] = useState(null);
  const [toast, setToast] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    category: '',
    status: 'Active'
  });

  const [formErrors, setFormErrors] = useState({});

  const loadData = () => {
    const loadedDepts = getItems(KEYS.DEPARTMENTS);
    const loadedCats = getItems(KEYS.CATEGORIES);
    setDepartments(loadedDepts);
    setCategories(loadedCats);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('gov_storage_change', loadData);
    return () => window.removeEventListener('gov_storage_change', loadData);
  }, []);

  const openAddModal = () => {
    setEditingDept(null);
    const defaultCategory = categories.length > 0 ? categories[0].name : '';
    setFormData({
      name: '',
      code: '',
      description: '',
      category: defaultCategory,
      status: 'Active'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setFormData({
      name: dept.name || '',
      code: dept.code || '',
      description: dept.description || '',
      category: dept.category || (categories[0]?.name || ''),
      status: dept.status || 'Active'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Department Name is required.';
    if (!formData.code.trim()) {
      errors.code = 'Department Code is required.';
    } else {
      // Check code uniqueness among other departments
      const duplicate = departments.find(
        (d) => d.code.toLowerCase() === formData.code.trim().toLowerCase() && d.id !== editingDept?.id
      );
      if (duplicate) {
        errors.code = `Department Code "${formData.code.trim()}" already exists. Code must be unique.`;
      }
    }

    if (!formData.description.trim()) errors.description = 'Description is required.';
    if (!formData.category) errors.category = 'Please select a Category.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingDept) {
      // Update Department
      updateItem(KEYS.DEPARTMENTS, editingDept.id, {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status
      });
      setToast({ type: 'success', title: 'Department Updated', message: `Department "${formData.name}" was successfully updated.` });
    } else {
      // Create Department
      const newDept = {
        id: generateId('DEP'),
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addItem(KEYS.DEPARTMENTS, newDept);
      setToast({ type: 'success', title: 'Department Created', message: `Department "${formData.name}" added to system.` });
    }

    setIsFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deletingDept) return;
    deleteItem(KEYS.DEPARTMENTS, deletingDept.id);
    setToast({ type: 'error', title: 'Department Removed', message: `Department "${deletingDept.name}" was deleted.` });
    setDeletingDept(null);
  };

  // Search & Filter combined
  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        dept.name.toLowerCase().includes(searchLower) ||
        dept.code.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === 'All' || dept.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [departments, searchTerm, statusFilter]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Department Name', accessor: 'name', render: (row) => <strong className="text-slate-900">{row.name}</strong> },
    { header: 'Department Code', accessor: 'code' },
    { header: 'Category', accessor: 'category' },
    { header: 'Status', accessor: 'status', isBadge: true },
    { header: 'Created Date', accessor: 'createdAt' }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-800 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Departments
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage public administration departments and code identifiers.
          </p>
        </div>

        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>+ Add Department</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by department name or code..."
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

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredDepartments}
        onView={(row) => setViewingDept(row)}
        onEdit={(row) => openEditModal(row)}
        onDelete={(row) => setDeletingDept(row)}
        emptyTitle="No Departments Found"
        emptySub="No government departments match your query. Click '+ Add Department' to register a new one."
      />

      {/* Add / Edit Modal Form */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingDept ? 'Edit Department' : 'Add New Department'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Department of Health & Family Welfare"
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
              Department Code (Unique) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. DOH-GOV, DOE-GOV, PPD-GOV"
              className={`w-full px-3.5 py-2 border rounded-lg text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 uppercase ${
                formErrors.code ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {formErrors.code && (
              <p className="text-xs text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {formErrors.code}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-3.5 py-2 border rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                formErrors.category ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              {categories.length === 0 ? (
                <option value="">No categories available (Create a Category first)</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name} ({cat.status})
                  </option>
                ))
              )}
            </select>
            {formErrors.category && (
              <p className="text-xs text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {formErrors.category}
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
              placeholder="Responsibilities and primary jurisdiction of this department..."
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
              disabled={!formData.name.trim() || !formData.code.trim() || !formData.description.trim()}
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow transition-colors"
            >
              {editingDept ? 'Save Changes' : 'Add Department'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingDept}
        onClose={() => setDeletingDept(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingDept?.name}
      />

      {/* View Detail Modal */}
      <ViewDetailModal
        isOpen={!!viewingDept}
        onClose={() => setViewingDept(null)}
        data={viewingDept}
        type="Department"
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
