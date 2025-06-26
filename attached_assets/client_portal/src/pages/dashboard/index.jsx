import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Breadcrumb from 'components/ui/Breadcrumb';
import RecentActivity from './components/RecentActivity';
import ProjectCard from './components/ProjectCard';
import MetricsCard from './components/MetricsCard';

const Dashboard = () => {
  // Mock user data
  const currentUser = {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@company.com",
    clientId: 1
  };

  // Mock projects data
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      clientCompany: "TechCorp Solutions",
      status: "In Progress",
      progress: 75,
      description: "Complete redesign of the e-commerce platform with modern UI/UX and enhanced functionality",
      startDate: "2024-01-15",
      endDate: "2024-03-30",
      clientId: 1
    },
    {
      id: 2,
      name: "Mobile App Development",
      clientCompany: "TechCorp Solutions",
      status: "Client Review",
      progress: 90,
      description: "Native mobile application for iOS and Android platforms with real-time synchronization",
      startDate: "2024-02-01",
      endDate: "2024-04-15",
      clientId: 1
    },
    {
      id: 3,
      name: "Database Migration",
      clientCompany: "TechCorp Solutions",
      status: "Completed",
      progress: 100,
      description: "Migration of legacy database to modern cloud infrastructure with improved performance",
      startDate: "2023-11-01",
      endDate: "2024-01-10",
      clientId: 1
    },
    {
      id: 4,
      name: "Security Audit",
      clientCompany: "TechCorp Solutions",
      status: "Pending",
      progress: 0,
      description: "Comprehensive security assessment and implementation of security best practices",
      startDate: "2024-04-01",
      endDate: "2024-05-15",
      clientId: 1
    }
  ];

  // Filter projects for current user
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