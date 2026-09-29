import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import QuickAccessCard from '../components/QuickAccessCard';
import StatCard from '../components/StatCard';
import ViewDetailModal from '../components/ViewDetailModal';
import { getItems, KEYS } from '../utils/storage';
import { Layers, Building2, FileText, AlertCircle, Eye, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [issues, setIssues] = useState([]);
  
  const [selectedService, setSelectedService] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const loadData = () => {
    setCategories(getItems(KEYS.CATEGORIES));
    setDepartments(getItems(KEYS.DEPARTMENTS));
    setServices(getItems(KEYS.SERVICES));
    setIssues(getItems(KEYS.ISSUES));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('gov_storage_change', loadData);
    return () => window.removeEventListener('gov_storage_change', loadData);
  }, []);

  const openServiceDetail = (service) => {
    setSelectedService(service);
    setIsDetailOpen(true);
  };

  const openIssuesCount = issues.filter(i => i.status === 'Open' || i.status === 'In Progress').length;
  const activeServices = services.filter(s => s.status === 'Active');

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Hero / Banner Section */}
      <Hero />

      <div className="container mx-auto px-4 sm:px-6 space-y-12">

        {/* 2. Statistics Section (4 Cards updating dynamically from LocalStorage) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portal Operational Summary</h2>
              <p className="text-xs text-slate-500">Live dynamic metrics synchronized with LocalStorage</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Categories"
              value={categories.length}
              icon={Layers}
              color="blue"
              subtext={`${categories.filter(c => c.status === 'Active').length} Active Categories`}
            />
            <StatCard
              title="Total Departments"
              value={departments.length}
              icon={Building2}
              color="purple"
              subtext={`${departments.filter(d => d.status === 'Active').length} Active Departments`}
            />
            <StatCard
              title="Total Services"
              value={services.length}
              icon={FileText}
              color="emerald"
              subtext={`${activeServices.length} Active Public Services`}
            />
            <StatCard
              title="Open Citizen Issues"
              value={openIssuesCount}
              icon={AlertCircle}
              color="amber"
              subtext={`${issues.filter(i => i.status === 'Resolved').length} Resolved Issues`}
            />
          </div>
        </section>

        {/* 3. Quick Access Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Access Portal Management</h2>
            <p className="text-sm text-slate-600">Direct shortcuts to inspect and update citizen services data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickAccessCard
              icon={Layers}
              title="Categories"
              description="Manage public service sectors including Healthcare, Education, Transport, Revenue, and Safety."
              linkTo="/categories"
              badgeText={`${categories.length} Items`}
            />
            <QuickAccessCard
              icon={Building2}
              title="Departments"
              description="Configure government administrative bodies, code identifiers, and primary category assignments."
              linkTo="/departments"
              badgeText={`${departments.length} Items`}
            />
            <QuickAccessCard
              icon={FileText}
              title="Services"
              description="Oversee citizen applications, digital delivery modes (Online/Offline), and department mappings."
              linkTo="/services"
              badgeText={`${services.length} Items`}
            />
          </div>
        </section>

        {/* 4. Popular Government Services Cards */}
        <section className="bg-slate-100/70 p-6 sm:p-8 rounded-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Popular Government Services</h2>
              <p className="text-sm text-slate-600">Most requested digital and offline citizen public utilities.</p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center text-sm font-bold text-blue-800 hover:text-blue-950 transition-colors"
            >
              <span>View All Services Directory</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                      {service.code}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      service.serviceType === 'Online'
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : service.serviceType === 'Offline'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}>
                      {service.serviceType}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.name}
                  </h3>

                  <div className="space-y-1.5 mb-4 text-xs text-slate-600">
                    <p className="flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      <strong className="mr-1">Dept:</strong> {service.department}
                    </p>
                    <p className="flex items-center">
                      <Layers className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      <strong className="mr-1">Category:</strong> {service.category}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => openServiceDetail(service)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
                    type="button"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                    <span>View Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* View Detail Modal for Homepage Service Cards */}
      <ViewDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        data={selectedService}
        type="Service"
      />
    </div>
  );
}
