import React, { useState, useEffect } from 'react';
import { adminDataService } from './adminDataService.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    verifiedCustomers: 0,
    totalProjects: 0,
    activeProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    
    try {
      const [customers, projects] = await Promise.all([
        adminDataService.getCustomers(),
        adminDataService.getProjects()
      ]);

      const verifiedCustomers = customers.filter(c => 
        c.customer_verifications?.[0]?.status === 'verified'
      ).length;

      const activeProjects = projects.filter(p => 
        p.status === 'in_progress' || p.status === 'active'
      ).length;

      setStats({
        totalCustomers: customers.length,
        verifiedCustomers,
        totalProjects: projects.length,
        activeProjects
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    
    setLoading(false);
  };

  const StatCard = ({ title, value, subtitle, color = '#dc2626' }) => (
    <div style={{
      background: '#1a1a1a',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #333'
    }}>
      <h3 style={{
        color: '#9ca3af',
        fontSize: '14px',
        fontWeight: '500',
        margin: '0 0 8px 0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </h3>
      <p style={{
        color: color,
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '0 0 4px 0'
      }}>
        {value}
      </p>
      {subtitle && (
        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          margin: 0
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#000000', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          color: '#ffffff',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '32px'
        }}>
          Admin Dashboard
        </h1>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '48px' }}>
            Loading dashboard data...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            <StatCard
              title="Total Customers"
              value={stats.totalCustomers}
              subtitle="All registered customers"
              color="#ffffff"
            />
            <StatCard
              title="Verified Customers"
              value={stats.verifiedCustomers}
              subtitle="Customers with verified accounts"
              color="#16a34a"
            />
            <StatCard
              title="Total Projects"
              value={stats.totalProjects}
              subtitle="All projects in system"
              color="#ffffff"
            />
            <StatCard
              title="Active Projects"
              value={stats.activeProjects}
              subtitle="Currently in progress"
              color="#dc2626"
            />
          </div>
        )}

        <div style={{
          background: '#1a1a1a',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #333'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '20px',
            marginBottom: '16px'
          }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="/admin/customers"
              style={{
                background: '#dc2626',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Create Customer
            </a>
            <a
              href="/admin/projects"
              style={{
                background: '#16a34a',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Create Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
