import React from 'react';
import Icon from 'components/AppIcon';

const OverviewTab = ({ projectData }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-green-50 border-green-200';
      case 'in-progress':
        return 'text-primary bg-blue-50 border-blue-200';
      case 'pending':
        return 'text-text-secondary bg-gray-50 border-gray-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Project Description */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-4">Project Description</h3>
        <div className="prose max-w-none text-text-secondary">
          <p className="leading-relaxed">{projectData.description}</p>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-6">Project Milestones</h3>
        <div className="space-y-4">
          {projectData.milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${getStatusColor(milestone.status)}`}>
                  <Icon name={getStatusIcon(milestone.status)} size={16} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-medium text-text-primary">{milestone.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>Due: {formatDate(milestone.dueDate)}</span>
                    {milestone.completedDate && (
                      <span className="text-success">Completed: {formatDate(milestone.completedDate)}</span>
                    )}
                  </div>
                </div>
                {index < projectData.milestones.length - 1 && (
                  <div className="w-px h-6 bg-border ml-4 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables Checklist */}
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-6">Project Deliverables</h3>
        <div className="space-y-4">
          {projectData.deliverables.map((deliverable) => (
            <div key={deliverable.id} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getStatusColor(deliverable.status)}`}>
                    <Icon name={getStatusIcon(deliverable.status)} size={14} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h4 className="font-medium text-text-primary">{deliverable.title}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(deliverable.status)}`}>
                      {deliverable.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{deliverable.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;