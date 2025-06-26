import React, { useState } from 'react';
import Icon from '../components/AppIcon';

const FilesTab = ({ projectId }) => {
  const [isDownloading, setIsDownloading] = useState(null);

  // Mock files data
  const projectFiles = [
    {
      id: 1,
      name: "Project Requirements Document.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-01-18",
      uploadedBy: "Sarah Johnson",
      category: "Documentation",
      downloadUrl: "#"
    },
    {
      id: 2,
      name: "UI_UX_Design_Mockups.zip",
      type: "zip",
      size: "15.7 MB",
      uploadDate: "2024-02-03",
      uploadedBy: "Emily Rodriguez",
      category: "Design",
      downloadUrl: "#"
    },
    {
      id: 3,
      name: "Brand_Guidelines.pdf",
      type: "pdf",
      size: "5.2 MB",
      uploadDate: "2024-01-20",
      uploadedBy: "Emily Rodriguez",
      category: "Design",
      downloadUrl: "#"
    },
    {
      id: 4,
      name: "Technical_Specifications.docx",
      type: "docx",
      size: "1.8 MB",
      uploadDate: "2024-01-25",
      uploadedBy: "Michael Chen",
      category: "Documentation",
      downloadUrl: "#"
    },
    {
      id: 5,
      name: "Database_Schema.sql",
      type: "sql",
      size: "0.3 MB",
      uploadDate: "2024-02-10",
      uploadedBy: "Michael Chen",
      category: "Development",
      downloadUrl: "#"
    },
    {
      id: 6,
      name: "Color_Palette_Assets.zip",
      type: "zip",
      size: "8.9 MB",
      uploadDate: "2024-02-15",
      uploadedBy: "Emily Rodriguez",
      category: "Design",
      downloadUrl: "#"
    },
    {
      id: 7,
      name: "API_Documentation.pdf",
      type: "pdf",
      size: "3.1 MB",
      uploadDate: "2024-02-12",
      uploadedBy: "Michael Chen",
      category: "Documentation",
      downloadUrl: "#"
    },
    {
      id: 8,
      name: "Testing_Checklist.xlsx",
      type: "xlsx",
      size: "0.7 MB",
      uploadDate: "2024-02-08",
      uploadedBy: "Sarah Johnson",
      category: "Testing",
      downloadUrl: "#"
    }
  ];

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'zip':
        return 'Archive';
      case 'docx': case'doc':
        return 'FileText';
      case 'xlsx': case'xls':
        return 'Sheet';
      case 'sql':
        return 'Database';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'Image';
      default:
        return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'bg-red-100 text-red-600';
      case 'zip':
        return 'bg-yellow-100 text-yellow-600';
      case 'docx': case'doc':
        return 'bg-blue-100 text-blue-600';
      case 'xlsx': case'xls':
        return 'bg-green-100 text-green-600';
      case 'sql':
        return 'bg-purple-100 text-purple-600';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'documentation':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'design':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'development':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'testing':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleDownload = async (file) => {
    setIsDownloading(file.id);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${file.name}`);
    
    setIsDownloading(null);
  };

  const handleDownloadAll = async () => {
    setIsDownloading('all');
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('Downloading all files');
    
    setIsDownloading(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const groupedFiles = projectFiles.reduce((acc, file) => {
    if (!acc[file.category]) {
      acc[file.category] = [];
    }
    acc[file.category].push(file);
    return acc;
  }, {});

  const totalSize = projectFiles.reduce((total, file) => {
    const sizeInMB = parseFloat(file.size.replace(' MB', ''));
    return total + sizeInMB;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Files Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Project Files</h3>
          <p className="text-sm text-text-secondary mt-1">
            {projectFiles.length} files • {totalSize.toFixed(1)} MB total
          </p>
        </div>
        <button
          onClick={handleDownloadAll}
          disabled={isDownloading === 'all'}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isDownloading === 'all' ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Preparing Download...</span>
            </>
          ) : (
            <>
              <Icon name="Download" size={16} />
              <span>Download All Files</span>
            </>
          )}
        </button>
      </div>

      {/* Files by Category */}
      <div className="space-y-6">
        {Object.entries(groupedFiles).map(([category, files]) => (
          <div key={category} className="bg-background rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-3 bg-surface border-b border-border">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-text-primary flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
                    {category}
                  </span>
                  <span>({files.length} files)</span>
                </h4>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {files.map((file) => (
                <div key={file.id} className="p-4 hover:bg-surface transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileTypeColor(file.type)}`}>
                        <Icon name={getFileIcon(file.type)} size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-text-primary truncate">{file.name}</h5>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>Uploaded {formatDate(file.uploadDate)}</span>
                          <span>•</span>
                          <span>by {file.uploadedBy}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(file)}
                      disabled={isDownloading === file.id}
                      className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDownloading === file.id ? (
                        <>
                          <Icon name="Loader2" size={16} className="animate-spin" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Download" size={16} />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* File Upload Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">File Access Information</h4>
            <p className="text-sm text-blue-700 mt-1">
              All project files are automatically synchronized and updated by your project team. 
              You'll receive notifications when new files are added or existing files are updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesTab;