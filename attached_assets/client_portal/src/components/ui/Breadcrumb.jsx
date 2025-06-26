import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard', icon: 'Home' }];

    if (pathSegments.includes('project-details')) {
      breadcrumbs.push({
        label: 'Project Details',
        path: '/project-details',
        icon: 'FolderOpen'
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="flex items-center space-x-1 text-text-primary font-medium">
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </span>
          ) : (
            <Link
              to={item.path}
              className="flex items-center space-x-1 hover:text-text-primary transition-hover"
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;