import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import ViewDetailModal from '../components/ViewDetailModal';
import Toast from '../components/Toast';
import { getItems, addItem, updateItem, deleteItem, generateId, KEYS } from '../utils/storage';
import { Plus, FileText, AlertCircle } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Search and Multi-Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewingService, setViewingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [toast, setToast] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    category: '',
    department: '',
    serviceType: 'Online',
    status: 'Active'
  });

  const [formErrors, setFormErrors] = useState({});

  const loadData = () => {
    setServices(getItems(KEYS.SERVICES));
    setCategories(getItems(KEYS.CATEGORIES));
    setDepartments(getItems(KEYS.DEPARTMENTS));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('gov_storage_change', loadData);
    return () => window.removeEventListener('gov_storage_change', loadData);
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    const defaultCat = categories.length > 0 ? categories[0].name : '';
    const defaultDept = departments.length > 0 ? departments[0].name : '';
    setFormData({
      name: '',
      code: '',
      description: '',
      category: defaultCat,
      department: defaultDept,
      serviceType: 'Online',
      status: 'Active'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditModal = (srv) => {
    setEditingService(srv);
    setFormData({
      name: srv.name || '',
      code: srv.code || '',
      description: srv.description || '',
      category: srv.category || (categories[0]?.name || ''),
      department: srv.department || (departments[0]?.name || ''),
      serviceType: srv.serviceType || 'Online',
      status: srv.status || 'Active'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Service Name is required.';
    
    if (!formData.code.trim()) {
      errors.code = 'Service Code is required.';
    } else {
      // Check service code uniqueness
      const duplicate = services.find(
        (s) => s.code.toLowerCase() === formData.code.trim().toLowerCase() && s.id !== editingService?.id
      );
      if (duplicate) {
        errors.code = `Service Code "${formData.code.trim()}" already exists. Code must be unique.`;
      }
    }

    if (!formData.description.trim()) errors.description = 'Description is required.';
    if (!formData.category) errors.category = 'Please select a Category.';
    if (!formData.department) errors.department = 'Please select a Department.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingService) {
      updateItem(KEYS.SERVICES, editingService.id, {
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        category: formData.category,
        department: formData.department,
        serviceType: formData.serviceType,
        status: formData.status
      });
      setToast({ type: 'success', title: 'Service Updated', message: `Service "${formData.name}" updated successfully.` });
    } else {
      const newSrv = {
        id: generateId('SRV'),
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        category: formData.category,
        department: formData.department,
        serviceType: formData.serviceType,
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addItem(KEYS.SERVICES, newSrv);
      setToast({ type: 'success', title: 'Service Created', message: `Service "${formData.name}" added to portal.` });
    }

    setIsFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deletingService) return;
    deleteItem(KEYS.SERVICES, deletingService.id);
    setToast({ type: 'error', title: 'Service Deleted', message: `Service "${deletingService.name}" was removed.` });
    setDeletingService(null);
  };

  // Search and ALL filters combined
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        srv.name.toLowerCase().includes(searchLower) ||
        srv.code.toLowerCase().includes(searchLower);

      const matchesStatus = statusFilter === 'All' || srv.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || srv.category === categoryFilter;
      const matchesDept = deptFilter === 'All' || srv.department === deptFilter;
      const matchesType = typeFilter === 'All' || srv.serviceType === typeFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesDept && matchesType;
    });
  }, [services, searchTerm, statusFilter, categoryFilter, deptFilter, typeFilter]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Service Name', accessor: 'name', render: (row) => <strong className="text-slate-900">{row.name}</strong> },
    { header: 'Service Code', accessor: 'code' },
    { header: 'Category', accessor: 'category' },
    { header: 'Department', accessor: 'department' },
    { header: 'Service Type', accessor: 'serviceType', isBadge: true },
    { header: 'Status', accessor: 'status', isBadge: true },
    { header: 'Created Date', accessor: 'createdAt' }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Government Services
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage public digital services, delivery modes, and relational mappings.
          </p>
        </div>

        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>+ Add Service</span>
        </button>
      </div>

      {/* Search & Multi-Filter Control Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search service name or service code..."
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' }
              ]}
            />
            <FilterDropdown
              label="Type"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { label: 'Online', value: 'Online' },
                { label: 'Offline', value: 'Offline' },
                { label: 'Online & Offline', value: 'Online & Offline' }
              ]}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categories.map(c => ({ label: c.name, value: c.name }))}
            allOptionLabel="All Categories"
          />
          <FilterDropdown
            label="Department"
            value={deptFilter}
            onChange={setDeptFilter}
            options={departments.map(d => ({ label: d.name, value: d.name }))}
            allOptionLabel="All Departments"
          />
          {(statusFilter !== 'All' || categoryFilter !== 'All' || deptFilter !== 'All' || typeFilter !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setCategoryFilter('All');
                setDeptFilter('All');
                setTypeFilter('All');
              }}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline ml-auto"
              type="button"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Services Table */}
      <DataTable
        columns={columns}
        data={filteredServices}
        onView={(row) => setViewingService(row)}
        onEdit={(row) => openEditModal(row)}
        onDelete={(row) => setDeletingService(row)}
        emptyTitle="No Services Match Criteria"
        emptySub="Try relaxing search keywords or dropdown filters, or click '+ Add Service' to introduce a new service."
      />

      {/* Add / Edit Service Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingService ? 'Edit Government Service' : 'Add New Government Service'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Driving Licence Renewal"
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
                Service Code (Unique) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. SRV-DRV-03"
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option value="">No categories available</option>
                ) : (
                  categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
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
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className={`w-full px-3.5 py-2 border rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formErrors.department ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                {departments.length === 0 ? (
                  <option value="">No departments available</option>
                ) : (
                  departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.code})
                    </option>
                  ))
                )}
              </select>
              {formErrors.department && (
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" /> {formErrors.department}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Online & Offline">Online & Offline</option>
              </select>
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
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a clear description of the service requirements, eligibility, and output..."
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
              {editingService ? 'Save Changes' : 'Add Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deletingService}
        onClose={() => setDeletingService(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingService?.name}
      />

      {/* View Detail Modal */}
      <ViewDetailModal
        isOpen={!!viewingService}
        onClose={() => setViewingService(null)}
        data={viewingService}
        type="Service"
      />

      {/* Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
