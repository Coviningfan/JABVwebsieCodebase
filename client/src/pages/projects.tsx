import React from 'react';
import { useLocation, useParams } from 'wouter';

export default function Projects() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const projectId = params.id;

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform Redesign',
      progress: 65,
      status: 'In Progress',
      startDate: 'January 14, 2024',
      endDate: 'March 29, 2024',
      team: [
        { name: 'Sarah Johnson', role: 'Project Manager', avatar: '👩‍💼' },
        { name: 'Michael Chen', role: 'Lead Developer', avatar: '👨‍💻' },
        { name: 'Emily Rodriguez', role: 'UI/UX Designer', avatar: '👩‍🎨' }
      ],
      description: 'This comprehensive e-commerce platform redesign project focuses on modernizing the user interface, improving user experience, and implementing advanced features to boost conversion rates and customer satisfaction. The project encompasses a complete overhaul of the existing platform, including responsive design implementation, performance optimization, and integration of new payment gateways.',
      milestones: [
        { title: 'Project Kickoff & Requirements Gathering', due: 'Jan 19, 2024', completed: 'Jan 17, 2024', status: 'completed' },
        { title: 'UI/UX Design & Wireframes', due: 'Feb 4, 2024', completed: 'Feb 2, 2024', status: 'completed' },
        { title: 'Frontend Development Phase 1', due: 'Feb 24, 2024', completed: null, status: 'in-progress' },
        { title: 'Backend Integration', due: 'Mar 14, 2024', completed: null, status: 'pending' },
        { title: 'Testing & Quality Assurance', due: 'Mar 24, 2024', completed: null, status: 'pending' },
        { title: 'Deployment & Go-Live', due: 'Mar 29, 2024', completed: null, status: 'pending' }
      ],
      deliverables: [
        { title: 'Project Requirements Document', status: 'completed', description: 'Comprehensive document outlining all project requirements and specifications' },
        { title: 'UI/UX Design Mockups', status: 'completed', description: 'Complete set of design mockups for all pages and components' },
        { title: 'Responsive Frontend Implementation', status: 'in-progress', description: 'Fully responsive frontend implementation with modern design' },
        { title: 'API Integration & Backend', status: 'pending', description: 'Complete backend integration with all necessary APIs' },
        { title: 'Testing Documentation', status: 'pending', description: 'Comprehensive testing documentation and quality assurance reports' },
        { title: 'Deployment & Launch', status: 'pending', description: 'Final deployment and successful platform launch' }
      ]
    }
  ];

  if (projectId) {
    const project = projects.find(p => p.id === parseInt(projectId));
    if (!project) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <button 
              onClick={() => setLocation('/projects')}
              className="text-red-400 hover:text-red-300"
            >
              Back to Projects
            </button>
          </div>
        </div>
      );
    }

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
                <button 
                  onClick={() => setLocation('/dashboard')}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  📊 Dashboard
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
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

        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <button onClick={() => setLocation('/dashboard')} className="hover:text-white">📊 Dashboard</button>
            <span>›</span>
            <button onClick={() => setLocation('/projects')} className="hover:text-white">📁 Projects</button>
            <span>›</span>
            <span className="text-white">📋 {project.title}</span>
          </div>
        </div>

        <div className="p-6">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>📅 {project.startDate}</span>
                  <span>📅 {project.endDate}</span>
                </div>
              </div>
              <span className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                {project.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Project Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Team Members</h3>
              <div className="flex items-center gap-4">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-900 rounded-lg p-3">
                    <div className="text-2xl">{member.avatar}</div>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-gray-400 text-xs">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <div className="flex gap-6">
              <button className="border-b-2 border-red-500 text-red-500 pb-3 text-sm font-medium">
                📋 Overview
              </button>
              <button className="text-gray-400 hover:text-white pb-3 text-sm font-medium">
                💬 Communications
              </button>
              <button className="text-gray-400 hover:text-white pb-3 text-sm font-medium">
                📁 Files
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Description</h3>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              {/* Project Milestones */}
              <h3 className="text-xl font-semibold mb-4">Project Milestones</h3>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-900 border border-gray-800 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      milestone.status === 'completed' ? 'bg-green-500 text-white' :
                      milestone.status === 'in-progress' ? 'bg-orange-500 text-white' :
                      'bg-gray-600 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                        <span>Due: {milestone.due}</span>
                        {milestone.completed && (
                          <span className="text-green-400">Completed: {milestone.completed}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Deliverables */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Deliverables</h3>
              <div className="space-y-4">
                {project.deliverables.map((deliverable, index) => (
                  <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{deliverable.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        deliverable.status === 'completed' ? 'bg-green-500 text-white' :
                        deliverable.status === 'in-progress' ? 'bg-orange-500 text-white' :
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {deliverable.status === 'completed' ? 'Completed' :
                         deliverable.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{deliverable.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <button 
                onClick={() => setLocation('/dashboard')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                📊 Dashboard
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
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
        <h1 className="text-3xl font-bold mb-8">Your Projects</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setLocation(`/projects/${project.id}`)}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 cursor-pointer hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold">{project.title}</h3>
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {project.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
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

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>📅 {project.startDate}</span>
                <span>📅 {project.endDate}</span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {project.team.slice(0, 3).map((member, index) => (
                  <div key={index} className="text-lg">{member.avatar}</div>
                ))}
                {project.team.length > 3 && (
                  <div className="text-sm text-gray-400">+{project.team.length - 3}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}