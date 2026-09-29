import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import ViewDetailModal from '../components/ViewDetailModal';
import Toast from '../components/Toast';
import { getItems, addItem, updateItem, deleteItem, generateId, KEYS } from '../utils/storage';
import { AlertCircle, Plus, LayoutGrid, List, CheckCircle2, Clock, HelpCircle } from 'lucide-react';

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);
  const [viewingIssue, setViewingIssue] = useState(null);
  const [deletingIssue, setDeletingIssue] = useState(null);
  const [toast, setToast] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    department: '',
    priority: 'Medium',
    status: 'Open'
  });

  const [formErrors, setFormErrors] = useState({});

  const loadData = () => {
    setIssues(getItems(KEYS.ISSUES));
    setCategories(getItems(KEYS.CATEGORIES));
    setDepartments(getItems(KEYS.DEPARTMENTS));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('gov_storage_change', loadData);
    return () => window.removeEventListener('gov_storage_change', loadData);
  }, []);

  const openAddModal = () => {
    setEditingIssue(null);
    const defaultCat = categories.length > 0 ? categories[0].name : '';
    const defaultDept = departments.length > 0 ? departments[0].name : '';
    setFormData({
      title: '',
      description: '',
      category: defaultCat,
      department: defaultDept,
      priority: 'Medium',
      status: 'Open'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditModal = (issue) => {
    setEditingIssue(issue);
    setFormData({
      title: issue.title || '',
      description: issue.description || '',
      category: issue.category || (categories[0]?.name || ''),
      department: issue.department || (departments[0]?.name || ''),
      priority: issue.priority || 'Medium',
      status: issue.status || 'Open'
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Issue Title is required.';
    if (!formData.description.trim()) errors.description = 'Detailed description is required.';
    if (!formData.category) errors.category = 'Category is required.';
    if (!formData.department) errors.department = 'Department is required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingIssue) {
      updateItem(KEYS.ISSUES, editingIssue.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        department: formData.department,
        priority: formData.priority,
        status: formData.status
      });
      setToast({ type: 'success', title: 'Issue Ticket Updated', message: `Issue "${formData.title}" updated successfully.` });
    } else {
      const newIssue = {
        id: generateId('ISS'),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        department: formData.department,
        priority: formData.priority,
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0]
      };
      addItem(KEYS.ISSUES, newIssue);
      setToast({ type: 'success', title: 'Issue Reported', message: `Issue Ticket "${formData.title}" registered.` });
    }

    setIsFormOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deletingIssue) return;
    deleteItem(KEYS.ISSUES, deletingIssue.id);
    setToast({ type: 'error', title: 'Ticket Closed & Removed', message: `Issue "${deletingIssue.title}" deleted.` });
    setDeletingIssue(null);
  };

  // Quick Status Change directly from UI
  const handleQuickStatusChange = (id, newStatus) => {
    updateItem(KEYS.ISSUES, id, { status: newStatus });
    setToast({ type: 'info', title: 'Status Updated', message: `Ticket status set to "${newStatus}".` });
  };

  // Search & Filter combined
  const filteredIssues = useMemo(() => {
    return issues.filter((iss) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        iss.title.toLowerCase().includes(searchLower) ||
        iss.description.toLowerCase().includes(searchLower) ||
        iss.id.toLowerCase().includes(searchLower);

      const matchesStatus = statusFilter === 'All' || iss.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || iss.priority === priorityFilter;
      const matchesDept = deptFilter === 'All' || iss.department === deptFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesDept;
    });
  }, [issues, searchTerm, statusFilter, priorityFilter, deptFilter]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Issue Title', accessor: 'title', render: (row) => <strong className="text-slate-900">{row.title}</strong> },
    { header: 'Category', accessor: 'category' },
    { header: 'Department', accessor: 'department' },
    { header: 'Priority', accessor: 'priority', isBadge: true },
    { header: 'Status', accessor: 'status', isBadge: true },
    { header: 'Reported Date', accessor: 'createdAt' }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Citizen Issues & Grievances
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Report and monitor public service issues, delays, or administrative feedback.
          </p>
        </div>

        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>Report an Issue</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search issue title, ID, or description..."
          />

          <div className="flex flex-wrap items-center gap-3">
            <FilterDropdown
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: 'Open', value: 'Open' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Resolved', value: 'Resolved' }
              ]}
            />
            <FilterDropdown
              label="Priority"
              value={priorityFilter}
              onChange={setPriorityFilter}
              options={[
                { label: 'High', value: 'High' },
                { label: 'Medium', value: 'Medium' },
                { label: 'Low', value: 'Low' }
              ]}
            />

            {/* Layout Mode Toggle */}
            <div className="flex items-center border border-slate-300 rounded-lg p-0.5 bg-slate-100">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs font-semibold ${viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                title="Table View"
                type="button"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md text-xs font-semibold ${viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                title="Card View"
                type="button"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Display */}
      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredIssues}
          onView={(row) => setViewingIssue(row)}
          onEdit={(row) => openEditModal(row)}
          onDelete={(row) => setDeletingIssue(row)}
          emptyTitle="No Citizen Issues Registered"
          emptySub="No grievances match your search. Click 'Report an Issue' to file a new public ticket."
        />
      ) : (
        /* Card Layout Option */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((iss) => (
            <div key={iss.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs font-bold text-slate-500">{iss.id}</span>
                  <div className="flex space-x-1.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      iss.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {iss.priority}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      iss.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {iss.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">{iss.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 mb-4">{iss.description}</p>

                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <p><strong>Dept:</strong> {iss.department}</p>
                  <p><strong>Category:</strong> {iss.category}</p>
                  <p><strong>Date:</strong> {iss.createdAt}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <select
                  value={iss.status}
                  onChange={(e) => handleQuickStatusChange(iss.id, e.target.value)}
                  className="text-xs border border-slate-300 rounded px-2 py-1 bg-slate-50 font-semibold"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewingIssue(iss)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openEditModal(iss)}
                    className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Issue Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingIssue ? 'Edit Issue Ticket' : 'Report an Issue'}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Issue Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Portal Error during Driving Licence Payment"
              className={`w-full px-3.5 py-2 border rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                formErrors.title ? 'border-red-500 bg-red-50' : 'border-slate-300'
              }`}
            />
            {formErrors.title && (
              <p className="text-xs text-red-600 mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {formErrors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Ticket Status <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the issue, application reference numbers, or observed errors..."
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
              disabled={!formData.title.trim() || !formData.description.trim()}
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow transition-colors"
            >
              {editingIssue ? 'Save Changes' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!deletingIssue}
        onClose={() => setDeletingIssue(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingIssue?.title}
      />

      {/* View Detail Modal */}
      <ViewDetailModal
        isOpen={!!viewingIssue}
        onClose={() => setViewingIssue(null)}
        data={viewingIssue}
        type="Citizen Issue"
      />

      {/* Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
