import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

export function FilesPage() {
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadProgress, setUploadProgress] = useState(null);

  useEffect(() => {
    // Load files data
    setFiles([
      {
        id: 1,
        name: 'Project Proposal.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploadDate: '2024-01-15',
        uploadedBy: 'JABV Labs Team',
        project: 'E-commerce Platform',
        folder: 'documents',
        status: 'approved',
        downloadUrl: '#'
      },
      {
        id: 2,
        name: 'Design Mockups.figma',
        type: 'design',
        size: '8.7 MB',
        uploadDate: '2024-01-20',
        uploadedBy: 'UI/UX Designer',
        project: 'Mobile App Development',
        folder: 'designs',
        status: 'review',
        downloadUrl: '#'
      },
      {
        id: 3,
        name: 'Database Schema.sql',
        type: 'code',
        size: '156 KB',
        uploadDate: '2024-01-22',
        uploadedBy: 'Backend Developer',
        project: 'Database Migration',
        folder: 'development',
        status: 'final',
        downloadUrl: '#'
      },
      {
        id: 4,
        name: 'Marketing Assets.zip',
        type: 'archive',
        size: '24.1 MB',
        uploadDate: '2024-01-25',
        uploadedBy: 'Marketing Team',
        project: 'E-commerce Platform',
        folder: 'assets',
        status: 'approved',
        downloadUrl: '#'
      },
      {
        id: 5,
        name: 'User Testing Results.xlsx',
        type: 'spreadsheet',
        size: '892 KB',
        uploadDate: '2024-01-28',
        uploadedBy: 'QA Team',
        project: 'Mobile App Development',
        folder: 'testing',
        status: 'review',
        downloadUrl: '#'
      },
      {
        id: 6,
        name: 'API Documentation.md',
        type: 'document',
        size: '45 KB',
        uploadDate: '2024-01-30',
        uploadedBy: 'Technical Writer',
        project: 'Database Migration',
        folder: 'documentation',
        status: 'final',
        downloadUrl: '#'
      }
    ]);
  }, []);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        );
      case 'design':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
            <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        );
      case 'code':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
            <polyline points="16,18 22,12 16,6"/>
            <polyline points="8,6 2,12 8,18"/>
          </svg>
        );
      case 'archive':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <polyline points="21,8 21,21 3,21 3,8"/>
            <rect x="1" y="3" width="22" height="5"/>
            <line x1="10" y1="12" x2="14" y2="12"/>
          </svg>
        );
      case 'spreadsheet':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
            <polyline points="13,2 13,9 20,9"/>
          </svg>
        );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#22c55e';
      case 'review': return '#f59e0b';
      case 'final': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'review': return 'Under Review';
      case 'final': return 'Final Version';
      default: return 'Draft';
    }
  };

  const folders = [
    { id: 'all', name: 'All Files', count: files.length },
    { id: 'documents', name: 'Documents', count: files.filter(f => f.folder === 'documents').length },
    { id: 'designs', name: 'Designs', count: files.filter(f => f.folder === 'designs').length },
    { id: 'development', name: 'Development', count: files.filter(f => f.folder === 'development').length },
    { id: 'assets', name: 'Assets', count: files.filter(f => f.folder === 'assets').length },
    { id: 'testing', name: 'Testing', count: files.filter(f => f.folder === 'testing').length },
    { id: 'documentation', name: 'Documentation', count: files.filter(f => f.folder === 'documentation').length }
  ];

  const filteredFiles = files.filter(file => {
    const matchesFolder = selectedFolder === 'all' || file.folder === selectedFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadProgress(0);
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setUploadProgress(null), 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'white',
          margin: 0
        }}>
          Files & Documents
        </h1>
        <label style={{
          background: '#dc2626',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <path d="M12 18v-6"/>
            <path d="M9 15h6"/>
          </svg>
          Upload File
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Upload Progress */}
      {uploadProgress !== null && (
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: 'white', fontSize: '14px', margin: '0 0 8px 0' }}>
                Uploading file... {uploadProgress}%
              </p>
              <div style={{
                background: 'rgba(63, 63, 70, 0.4)',
                borderRadius: '4px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#dc2626',
                  height: '100%',
                  width: `${uploadProgress}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '24px'
      }}>
        {/* Sidebar */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px',
          height: 'fit-content'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 16px 0'
          }}>Folders</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px',
                  background: selectedFolder === folder.id 
                    ? 'rgba(220, 38, 38, 0.1)' 
                    : 'transparent',
                  border: selectedFolder === folder.id 
                    ? '1px solid #dc2626' 
                    : '1px solid transparent',
                  borderRadius: '8px',
                  color: selectedFolder === folder.id ? '#dc2626' : '#d1d5db',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedFolder !== folder.id) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedFolder !== folder.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <span>{folder.name}</span>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#a1a1aa',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}>
                  {folder.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div>
          {/* Search Bar */}
          <div style={{
            background: 'rgba(24, 24, 27, 0.8)',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <div style={{ position: 'relative' }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#a1a1aa" 
                strokeWidth="2"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search files and projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  background: 'rgba(63, 63, 70, 0.2)',
                  border: '1px solid rgba(63, 63, 70, 0.4)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Files List */}
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
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
                margin: 0
              }}>
                {selectedFolder === 'all' ? 'All Files' : folders.find(f => f.id === selectedFolder)?.name}
              </h2>
              <p style={{
                color: '#a1a1aa',
                fontSize: '14px',
                margin: 0
              }}>
                {filteredFiles.length} files
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    background: 'rgba(63, 63, 70, 0.2)',
                    border: '1px solid rgba(63, 63, 70, 0.4)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.3)';
                    e.currentTarget.style.borderColor = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.4)';
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '4px'
                    }}>
                      <h3 style={{
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0
                      }}>{file.name}</h3>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: getStatusColor(file.status),
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                        padding: '4px 8px',
                        borderRadius: '12px'
                      }}>
                        {getStatusLabel(file.status)}
                      </div>
                    </div>
                    <p style={{
                      color: '#a1a1aa',
                      fontSize: '14px',
                      margin: '0 0 4px 0'
                    }}>{file.project}</p>
                    <p style={{
                      color: '#71717a',
                      fontSize: '12px',
                      margin: 0
                    }}>
                      {file.size} • Uploaded {file.uploadDate} by {file.uploadedBy}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      background: 'rgba(63, 63, 70, 0.4)',
                      border: '1px solid rgba(63, 63, 70, 0.6)',
                      borderRadius: '6px',
                      padding: '8px',
                      color: '#a1a1aa',
                      cursor: 'pointer'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </button>
                    <button style={{
                      background: 'rgba(63, 63, 70, 0.4)',
                      border: '1px solid rgba(63, 63, 70, 0.6)',
                      borderRadius: '6px',
                      padding: '8px',
                      color: '#a1a1aa',
                      cursor: 'pointer'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="19" cy="12" r="1"/>
                        <circle cx="5" cy="12" r="1"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}