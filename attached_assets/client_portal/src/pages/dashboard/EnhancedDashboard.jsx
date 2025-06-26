import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import projectService from '../../services/projectService';
import invoiceService from '../../services/invoiceService';
import ticketService from '../../services/ticketService';

const EnhancedDashboard = () => {
  const { user, userProfile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [projectStats, setProjectStats] = useState(null);
  const [invoiceStats, setInvoiceStats] = useState(null);
  const [ticketStats, setTicketStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const [projectsResult, projectStatsResult, invoiceStatsResult, ticketStatsResult] = await Promise.all([
          projectService.getProjects(),
          projectService.getProjectStats(),
          invoiceService.getInvoiceStats(),
          ticketService.getTicketStats()
        ]);

        if (projectsResult.success) {
          setProjects(projectsResult.data || []);
        }
        if (projectStatsResult.success) {
          setProjectStats(projectStatsResult.data);
        }
        if (invoiceStatsResult.success) {
          setInvoiceStats(invoiceStatsResult.data);
        }
        if (ticketStatsResult.success) {
          setTicketStats(ticketStatsResult.data);
        }
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'text-yellow-400 bg-yellow-400/10',
      'in_progress': 'text-blue-400 bg-blue-400/10',
      'client_review': 'text-purple-400 bg-purple-400/10',
      'completed': 'text-green-400 bg-green-400/10'
    };
    return colors[status] || 'text-gray-400 bg-gray-400/10';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-red-600">JABV</span>
                <span className="text-white ml-1">Labs</span>
                <span className="text-gray-400 ml-2">Client Portal</span>
              </h1>
              <p className="text-gray-400 mt-1">
                Welcome back, {userProfile?.full_name || user?.email}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Portal Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Projects Stats */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-white">
                  {projectStats?.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex space-x-2 text-xs">
              <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded">
                {projectStats?.completed || 0} Completed
              </span>
              <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded">
                {projectStats?.in_progress || 0} Active
              </span>
            </div>
          </div>

          {/* Invoice Stats */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Invoiced</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(invoiceStats?.totalAmount || 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex space-x-2 text-xs">
              <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded">
                {formatCurrency(invoiceStats?.paidAmount || 0)} Paid
              </span>
              <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded">
                {invoiceStats?.pending || 0} Pending
              </span>
            </div>
          </div>

          {/* Support Stats */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Support Tickets</p>
                <p className="text-2xl font-bold text-white">
                  {ticketStats?.total || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12l5.5-5.5M6.5 6.5l11 11" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex space-x-2 text-xs">
              <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded">
                {ticketStats?.resolved || 0} Resolved
              </span>
              <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded">
                {ticketStats?.open || 0} Open
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Need Help?</p>
                <p className="text-lg font-semibold text-white">Contact Us</p>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-xs">
              <p className="text-gray-400">Phone: (775) 800-5850</p>
              <p className="text-gray-400">Email: support@jabvlabs.com</p>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Your Projects</h2>
              <Link 
                to="/projects" 
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No projects found</p>
                <p className="text-gray-500 text-sm mt-1">Contact us to start your first project</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{project.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="ml-4 px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;