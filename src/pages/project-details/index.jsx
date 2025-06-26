import React, { useState } from 'react';

import Icon from '../components/AppIcon';

import Breadcrumb from '../components/ui/Breadcrumb';
import ProjectHeader from './components/ProjectHeader';
import OverviewTab from './components/OverviewTab';
import CommunicationsTab from './components/CommunicationsTab';
import FilesTab from './components/FilesTab';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data
  const projectData = {
    id: 1,
    name: "E-commerce Platform Redesign",
    status: "In Progress",
    progress: 65,
    startDate: "2024-01-15",
    estimatedCompletion: "2024-03-30",
    description: `This comprehensive e-commerce platform redesign project focuses on modernizing the user interface, improving user experience, and implementing advanced features to boost conversion rates and customer satisfaction.

The project encompasses a complete overhaul of the existing platform, including responsive design implementation, performance optimization, and integration of new payment gateways. Our team is working closely with stakeholders to ensure all requirements are met while maintaining the highest standards of quality and security.`,
    teamMembers: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Project Manager",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Lead Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      }
    ],
    milestones: [
      {
        id: 1,
        title: "Project Kickoff & Requirements Gathering",
        status: "completed",
        dueDate: "2024-01-20",
        completedDate: "2024-01-18"
      },
      {
        id: 2,
        title: "UI/UX Design & Wireframes",
        status: "completed",
        dueDate: "2024-02-05",
        completedDate: "2024-02-03"
      },
      {
        id: 3,
        title: "Frontend Development Phase 1",
        status: "in-progress",
        dueDate: "2024-02-25",
        completedDate: null
      },
      {
        id: 4,
        title: "Backend Integration",
        status: "pending",
        dueDate: "2024-03-15",
        completedDate: null
      },
      {
        id: 5,
        title: "Testing & Quality Assurance",
        status: "pending",
        dueDate: "2024-03-25",
        completedDate: null
      },
      {
        id: 6,
        title: "Deployment & Go-Live",
        status: "pending",
        dueDate: "2024-03-30",
        completedDate: null
      }
    ],
    deliverables: [
      {
        id: 1,
        title: "Project Requirements Document",
        status: "completed",
        description: "Comprehensive document outlining all project requirements and specifications"
      },
      {
        id: 2,
        title: "UI/UX Design Mockups",
        status: "completed",
        description: "Complete set of design mockups for all pages and components"
      },
      {
        id: 3,
        title: "Responsive Frontend Implementation",
        status: "in-progress",
        description: "Fully responsive frontend implementation with modern design"
      },
      {
        id: 4,
        title: "API Integration & Backend",
        status: "pending",
        description: "Complete backend integration with all necessary APIs"
      },
      {
        id: 5,
        title: "Testing Documentation",
        status: "pending",
        description: "Comprehensive testing documentation and quality assurance reports"
      },
      {
        id: 6,
        title: "Deployment & Launch",
        status: "pending",
        description: "Final deployment and successful platform launch"
      }
    ]
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { label: 'Projects', path: '/dashboard', icon: 'FolderOpen' },
    { label: projectData.name, path: '/project-details', icon: 'FileText' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare' },
    { id: 'files', label: 'Files', icon: 'Folder' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab projectData={projectData} />;
      case 'communications':
        return <CommunicationsTab projectId={projectData.id} />;
      case 'files':
        return <FilesTab projectId={projectData.id} />;
      default:
        return <OverviewTab projectData={projectData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          <ProjectHeader projectData={projectData} />

          {/* Tab Navigation */}
          <div className="bg-surface rounded-lg shadow-card border border-border overflow-hidden">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;