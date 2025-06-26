import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'message':
        return 'MessageSquare';
      case 'file':
        return 'FileText';
      case 'status':
        return 'Activity';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'message':
        return 'bg-primary text-white';
      case 'file':
        return 'bg-accent text-white';
      case 'status':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Link
          to="/project-details"
          className="text-primary hover:text-blue-700 text-sm font-medium transition-colors"
        >
          View All
        </Link>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary mb-1">
                  {activity.title}
                </p>
                <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                  {activity.description}
                </p>
                <p className="text-xs text-text-secondary">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Bell" size={32} className="text-text-secondary mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No recent activity</p>
        </div>
      )}

      {/* Quick Action Button */}
      <div className="mt-6 pt-6 border-t border-border">
        <Link
          to="/project-details"
          className="w-full inline-flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Icon name="MessageSquare" size={16} />
          <span>View Messages</span>
        </Link>
      </div>
    </div>
  );
};

export default RecentActivity;