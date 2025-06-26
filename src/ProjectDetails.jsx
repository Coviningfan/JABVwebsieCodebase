import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';
import { MessageCenter } from './MessageCenter.jsx';

export function ProjectDetails({ projectId, onBack }) {
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [files, setFiles] = useState([]);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (projectId) {
      const projectData = dataService.getUserProjects().find(p => p.id === projectId);
      setProject(projectData);
      
      // Load project files
      setFiles([
        { id: 1, name: 'Design_Mockups_v2.figma', type: 'design', size: '4.2 MB', uploaded: '2 days ago' },
        { id: 2, name: 'Technical_Specifications.pdf', type: 'document', size: '1.8 MB', uploaded: '5 days ago' },
        { id: 3, name: 'API_Documentation.md', type: 'documentation', size: '856 KB', uploaded: '1 week ago' },
        { id: 4, name: 'Database_Schema.sql', type: 'code', size: '324 KB', uploaded: '1 week ago' }
      ]);

      // Load project milestones
      setMilestones([
        { id: 1, title: 'Project Kickoff', status: 'completed', date: '2024-01-15', description: 'Initial project setup and team alignment' },
        { id: 2, title: 'Design Phase', status: 'completed', date: '2024-02-01', description: 'UI/UX design and user flow creation' },
        { id: 3, title: 'Development Sprint 1', status: 'in_progress', date: '2024-02-15', description: 'Core functionality implementation' },
        { id: 4, title: 'Testing & QA', status: 'pending', date: '2024-03-01', description: 'Comprehensive testing and bug fixes' },
        { id: 5, title: 'Deployment', status: 'pending', date: '2024-03-15', description: 'Production deployment and go-live' }
      ]);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        color: '#a1a1aa'
      }}>
        Loading project details...
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in_progress': return '#dc2626';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'design':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
        );
      case 'document':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        );
      case 'code':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <polyline points="16,18 22,12 16,6"/>
            <polyline points="8,6 2,12 8,18"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
        );
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#dc2626',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginRight: '24px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Back to Projects
        </button>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 8px 0'
          }}>
            {project.name}
          </h1>
          <p style={{
            color: '#a1a1aa',
            fontSize: '16px',
            margin: 0
          }}>
            {project.client_company} • {project.progress}% Complete
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '32px',
        marginBottom: '32px',
        borderBottom: '1px solid rgba(63, 63, 70, 0.4)'
      }}>
        {[
          { 
            id: 'overview', 
            label: 'Overview', 
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v5h5M9 9l3 3L20 4m-2 16H4a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2z"/>
              </svg>
            )
          },
          { 
            id: 'files', 
            label: 'Files', 
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
              </svg>
            )
          },
          { 
            id: 'milestones', 
            label: 'Milestones', 
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            )
          },
          { 
            id: 'messages', 
            label: 'Messages', 
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            )
          }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: activeTab === tab.id ? '#dc2626' : '#a1a1aa',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '16px 0',
              borderBottom: `2px solid ${activeTab === tab.id ? '#dc2626' : 'transparent'}`,
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '18px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '32px'
        }}>
          <div>
            {/* Project Progress */}
            <div style={{
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 16px 0'
              }}>Project Progress</h3>
              <div style={{
                width: '100%',
                background: 'rgba(63, 63, 70, 0.3)',
                borderRadius: '8px',
                height: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: `${project.progress}%`,
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  height: '12px',
                  borderRadius: '8px',
                  transition: 'all 0.5s ease'
                }}></div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#a1a1aa', fontSize: '14px' }}>
                  {project.progress}% Complete
                </span>
                <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: '500' }}>
                  On Track
                </span>
              </div>
            </div>

            {/* Project Description */}
            <div style={{
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 16px 0'
              }}>Project Description</h3>
              <p style={{
                color: '#e5e7eb',
                fontSize: '16px',
                lineHeight: '1.6',
                margin: 0
              }}>
                This comprehensive project involves developing a modern, scalable solution with cutting-edge technology. 
                Our team is focused on delivering exceptional user experience while maintaining high performance standards. 
                The project includes full-stack development, database optimization, and seamless integrations.
              </p>
            </div>
          </div>

          {/* Project Stats */}
          <div>
            <div style={{
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 20px 0'
              }}>Project Stats</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Status</span>
                  <span style={{
                    color: getStatusColor(project.status),
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Team Size</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                    {project.team_size || 4} members
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Start Date</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                    {project.start_date || 'Jan 15, 2024'}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#a1a1aa', fontSize: '14px' }}>Due Date</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                    {project.due_date || 'Mar 15, 2024'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'files' && (
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'white',
              margin: 0
            }}>Project Files</h3>
            <button style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Upload File
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {files.map((file) => (
              <div key={file.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                background: 'rgba(63, 63, 70, 0.2)',
                border: '1px solid rgba(63, 63, 70, 0.4)',
                borderRadius: '8px'
              }}>
                {getFileIcon(file.type)}
                <div style={{ flex: 1 }}>
                  <div style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>
                    {file.name}
                  </div>
                  <div style={{
                    color: '#a1a1aa',
                    fontSize: '14px'
                  }}>
                    {file.size} • Uploaded {file.uploaded}
                  </div>
                </div>
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc2626',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'milestones' && (
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 24px 0'
          }}>Project Milestones</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {milestones.map((milestone) => (
              <div key={milestone.id} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '20px',
                background: 'rgba(63, 63, 70, 0.2)',
                border: '1px solid rgba(63, 63, 70, 0.4)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: getStatusColor(milestone.status),
                  borderRadius: '50%',
                  marginTop: '4px'
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <h4 style={{
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {milestone.title}
                    </h4>
                    <span style={{
                      color: getStatusColor(milestone.status),
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      background: `${getStatusColor(milestone.status)}20`,
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    margin: '0 0 8px 0'
                  }}>
                    {milestone.description}
                  </p>
                  <div style={{
                    color: '#71717a',
                    fontSize: '12px'
                  }}>
                    Due: {milestone.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <MessageCenter projectId={projectId} />
      )}
    </div>
  );
}