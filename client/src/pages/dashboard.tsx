import React from 'react';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const projectStats = [
    { label: 'Total Projects', value: '4', icon: '📊' },
    { label: 'Active Projects', value: '2', icon: '⏱️' },
    { label: 'Completed Projects', value: '1', icon: '✅' }
  ];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform Redesign',
      client: 'TechCorp Solutions',
      progress: 75,
      status: 'In Progress',
      startDate: 'Jan 14, 2024',
      endDate: 'Mar 29, 2024',
      statusColor: 'bg-orange-500'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      client: 'TechCorp Solutions',
      progress: 90,
      status: 'Client Review',
      startDate: 'Jan 31, 2024',
      endDate: 'Apr 14, 2024',
      statusColor: 'bg-yellow-500'
    },
    {
      id: 3,
      title: 'Database Migration',
      client: 'TechCorp Solutions',
      progress: 100,
      status: 'Completed',
      startDate: 'Oct 31, 2023',
      endDate: 'Jan 7, 2024',
      statusColor: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Security Audit',
      client: 'TechCorp Solutions',
      progress: 0,
      status: 'Pending',
      startDate: 'Mar 31, 2024',
      endDate: 'May 14, 2024',
      statusColor: 'bg-gray-500'
    }
  ];

  const recentActivity = [
    {
      type: 'message',
      title: 'New message from Project Manager',
      description: 'Updated on E-commerce Platform Redesign progress',
      time: '2 hours ago',
      icon: '💬'
    },
    {
      type: 'upload',
      title: 'Design mockups uploaded',
      description: 'Mobile App Development wireframes available',
      time: '1 day ago',
      icon: '📎'
    },
    {
      type: 'status',
      title: 'Project status updated',
      description: 'Database Migration marked as completed',
      time: '3 days ago',
      icon: '📈'
    }
  ];

  const quickActions = [
    { title: 'View Messages', description: 'Check project communications', icon: '💬' },
    { title: 'Access Files', description: 'Download project documents', icon: '📁' },
    { title: 'View Progress', description: 'Track project milestones', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">
              <span className="text-red-500">JABV</span>Labs
            </h1>
            <div className="flex items-center gap-6">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                📊 Dashboard
              </button>
              <button 
                onClick={() => setLocation('/projects')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                📁 Projects
              </button>
              <button 
                onClick={() => setLocation('/settings')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                ⚙️ Settings
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg text-sm">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              User
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John Doe!</h1>
          <p className="text-gray-400">Here's an overview of your projects and recent activity.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {projectStats.map((stat, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Projects</h2>
              <button 
                onClick={() => setLocation('/projects')}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{project.client}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          📅 {project.startDate}
                        </span>
                        <span className="flex items-center gap-1">
                          📅 {project.endDate}
                        </span>
                      </div>
                    </div>
                    <span className={`${project.statusColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Recent Activity */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <button className="text-red-400 hover:text-red-300 text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-900 border border-gray-800 rounded-lg">
                    <div className="text-lg">{activity.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{activity.title}</h4>
                      <p className="text-gray-400 text-xs mb-2">{activity.description}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="w-full text-left p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-lg">{action.icon}</div>
                      <div>
                        <h4 className="font-medium text-sm">{action.title}</h4>
                        <p className="text-gray-400 text-xs">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* View Messages Button */}
            <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              💬 View Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}