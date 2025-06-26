import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import projectService from '../../services/projectService';
import invoiceService from '../../services/invoiceService';
import ticketService from '../../services/ticketService';
import Icon from 'components/AppIcon';
import Breadcrumb from 'components/ui/Breadcrumb';
import RecentActivity from './components/RecentActivity';
import ProjectCard from './components/ProjectCard';
import MetricsCard from './components/MetricsCard';

const Dashboard = () => {
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
        // Load all dashboard data concurrently
        const [projectsResult, projectStatsResult, invoiceStatsResult, ticketStatsResult] = await Promise.all([
          projectService.getProjects(),
          projectService.getProjectStats(),
          invoiceService.getInvoiceStats(),
          ticketService.getTicketStats()
        ]);

        if (projectsResult.success) {
          setProjects(projectsResult.data || []);
        } else {
          setError(projectsResult.error);
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
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <Icon name="AlertTriangle" size={48} />
          </div>
          <h2 className="text-white text-xl mb-2">Dashboard Error</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  const userProjects = projects.filter(project => project.clientId === currentUser.clientId);

  // Calculate metrics
  const totalProjects = userProjects.length;
  const activeProjects = userProjects.filter(project => 
    project.status === "In Progress" || project.status === "Client Review"
  ).length;
  const completedProjects = userProjects.filter(project => project.status === "Completed").length;

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "message",
      title: "New message from Project Manager",
      description: "Update on E-commerce Platform Redesign progress",
      timestamp: "2 hours ago",
      projectId: 1
    },
    {
      id: 2,
      type: "file",
      title: "Design mockups uploaded",
      description: "Mobile App Development wireframes available",
      timestamp: "1 day ago",
      projectId: 2
    },
    {
      id: 3,
      type: "status",
      title: "Project status updated",
      description: "Database Migration marked as completed",
      timestamp: "3 days ago",
      projectId: 3
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">
            Welcome back, {currentUser.fullName}!
          </h1>
          <p className="text-gray-400 font-body">
            Here's an overview of your projects and recent activity.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricsCard
            title="Total Projects"
            value={totalProjects}
            icon="FolderOpen"
            color="primary"
          />
          <MetricsCard
            title="Active Projects"
            value={activeProjects}
            icon="Clock"
            color="accent"
          />
          <MetricsCard
            title="Completed Projects"
            value={completedProjects}
            icon="CheckCircle"
            color="success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white font-heading">Your Projects</h2>
              <Link
                to="/project-details"
                className="inline-flex items-center space-x-2 text-gray-300 hover:text-white font-medium transition-smooth font-body hover:scale-105"
              >
                <span>View All</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>

            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {userProjects.slice(0, 4).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="card-dark p-8 text-center">
                <Icon name="FolderOpen" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2 font-heading">No Projects Yet</h3>
                <p className="text-gray-400 font-body">
                  Your projects will appear here once they are assigned to you.
                </p>
              </div>
            )}
          </div>

          {/* Recent Activity Sidebar */}
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivities} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 card-dark p-6">
          <h3 className="text-lg font-semibold text-white mb-4 font-heading">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/project-details"
              className="flex items-center space-x-3 p-4 rounded-xl border border-white/20 hover:border-red-600/50 hover:bg-red-950/20 transition-smooth group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:shadow-red transition-smooth">
                <Icon name="MessageSquare" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-white font-heading">View Messages</h4>
                <p className="text-sm text-gray-400 font-body">Check project communications</p>
              </div>
            </Link>

            <Link
              to="/project-details"
              className="flex items-center space-x-3 p-4 rounded-xl border border-white/20 hover:border-red-600/50 hover:bg-red-950/20 transition-smooth group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:shadow-red transition-smooth">
                <Icon name="FileText" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-white font-heading">Access Files</h4>
                <p className="text-sm text-gray-400 font-body">Download project documents</p>
              </div>
            </Link>

            <Link
              to="/project-details"
              className="flex items-center space-x-3 p-4 rounded-xl border border-white/20 hover:border-red-600/50 hover:bg-red-950/20 transition-smooth group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center group-hover:shadow-red transition-smooth">
                <Icon name="BarChart3" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-white font-heading">View Progress</h4>
                <p className="text-sm text-gray-400 font-body">Track project milestones</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;