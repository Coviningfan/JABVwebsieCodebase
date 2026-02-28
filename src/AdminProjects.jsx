import React, { useState, useEffect } from 'react';
import { adminDataService } from './adminDataService.js';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    client_id: '',
    status: 'pending',
    progress: 0,
    start_date: '',
    end_date: '',
    budget: '',
    access_level: 'full',
    demo_access: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [projectData, customerData] = await Promise.all([
      adminDataService.getProjects(),
      adminDataService.getCustomers()
    ]);
    setProjects(projectData);
    setCustomers(customerData.filter(c => c.customer_verifications?.[0]?.status === 'verified'));
    setLoading(false);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    const projectData = {
      project_name: newProject.name,
      description: newProject.description,
      client_id: newProject.client_id,
      status: newProject.status,
      progress: parseInt(newProject.progress),
      start_date: newProject.start_date || null,
      end_date: newProject.end_date || null,
      budget: newProject.budget ? parseFloat(newProject.budget) : null,
      access_level: newProject.access_level,
      demo_access: newProject.demo_access
    };

    const result = await adminDataService.createProject(projectData);
    
    if (result.success) {
      setNewProject({
        name: '',
        description: '',
        client_id: '',
        status: 'pending',
        progress: 0,
        start_date: '',
        end_date: '',
        budget: '',
        access_level: 'full',
        demo_access: false
      });
      setShowCreateForm(false);
      await loadData();
    }
    
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#16a34a';
      case 'in_progress': return '#dc2626';
      case 'client_review': return '#f59e0b';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ padding: '24px', background: '#000000', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold' }}>
            Project Management
          </h1>
          <button
            onClick={() => setShowCreateForm(true)}
            style={{
              background: '#dc2626',
              color: '#ffffff',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Create Project
          </button>
        </div>

        {showCreateForm && (
          <div style={{
            background: '#1a1a1a',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #333',
            marginBottom: '32px'
          }}>
            <h2 style={{ color: '#ffffff', fontSize: '24px', marginBottom: '24px' }}>
              Create New Project
            </h2>
            <form onSubmit={handleCreateProject}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Assign to Customer *
                  </label>
                  <select
                    value={newProject.client_id}
                    onChange={(e) => setNewProject({...newProject, client_id: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.full_name} ({customer.company_name || customer.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Description
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Status
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="client_review">Client Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProject.progress}
                    onChange={(e) => setNewProject({...newProject, progress: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newProject.start_date}
                    onChange={(e) => setNewProject({...newProject, start_date: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newProject.end_date}
                    onChange={(e) => setNewProject({...newProject, end_date: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Access Level
                  </label>
                  <select
                    value={newProject.access_level}
                    onChange={(e) => setNewProject({...newProject, access_level: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#000000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  >
                    <option value="full">Full Access</option>
                    <option value="limited">Limited Access</option>
                    <option value="view_only">View Only</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="demo_access"
                    checked={newProject.demo_access}
                    onChange={(e) => setNewProject({...newProject, demo_access: e.target.checked})}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <label htmlFor="demo_access" style={{ color: '#ffffff' }}>
                    Enable Demo Preview Access
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  style={{
                    background: '#333',
                    color: '#ffffff',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{
          background: '#1a1a1a',
          borderRadius: '12px',
          border: '1px solid #333',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #333' }}>
            <h2 style={{ color: '#ffffff', fontSize: '20px', margin: 0 }}>
              All Projects
            </h2>
          </div>
          
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>
              No projects found. Create your first project to get started.
            </div>
          ) : (
            <div style={{ padding: '24px' }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px',
                    background: '#000000',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#ffffff', fontSize: '18px', margin: '0 0 8px 0' }}>
                      {project.project_name || project.name}
                    </h3>
                    <p style={{ color: '#9ca3af', margin: '0 0 8px 0' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                        Customer: {project.clients?.full_name || 'Unassigned'}
                      </span>
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                        Progress: {project.progress}%
                      </span>
                      {project.budget && (
                        <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                          Budget: ${project.budget.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      background: getStatusColor(project.status),
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      display: 'inline-block'
                    }}>
                      {project.status.replace('_', ' ')}
                    </span>
                    {project.project_assignments?.[0]?.demo_access && (
                      <div>
                        <span style={{
                          background: '#f59e0b',
                          color: '#ffffff',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: '600'
                        }}>
                          Demo Access
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
