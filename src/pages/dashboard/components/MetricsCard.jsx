import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, icon, color = 'primary' }) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'primary':
        return {
          bg: 'bg-primary',
          text: 'text-primary',
          lightBg: 'bg-blue-50'
        };
      case 'accent':
        return {
          bg: 'bg-accent',
          text: 'text-accent',
          lightBg: 'bg-sky-50'
        };
      case 'success':
        return {
          bg: 'bg-success',
          text: 'text-success',
          lightBg: 'bg-emerald-50'
        };
      case 'warning':
        return {
          bg: 'bg-warning',
          text: 'text-warning',
          lightBg: 'bg-amber-50'
        };
      default:
        return {
          bg: 'bg-primary',
          text: 'text-primary',
          lightBg: 'bg-blue-50'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-surface rounded-lg border border-border p-6 hover:shadow-card transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary">{value}</p>
        </div>
        <div className={`w-12 h-12 ${colorClasses.lightBg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses.text} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;