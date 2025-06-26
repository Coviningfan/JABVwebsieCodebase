import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

export function KnowledgeBasePage() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [helpfulCount, setHelpfulCount] = useState({});

  const categories = [
    { id: 'all', name: 'All Articles', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'account', name: 'Account Management', icon: '👤' },
    { id: 'projects', name: 'Project Management', icon: '📁' },
    { id: 'billing', name: 'Billing & Payments', icon: '💳' },
    { id: 'technical', name: 'Technical Support', icon: '🔧' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' }
  ];

  useEffect(() => {
    setArticles([
      {
        id: 'kb-001',
        title: 'Getting Started with Your Client Portal',
        category: 'getting-started',
        summary: 'Learn how to navigate your new client portal and access all available features.',
        content: `
# Getting Started with Your Client Portal

Welcome to your JABV Labs client portal! This guide will help you get familiar with all the features available to you.

## Dashboard Overview
Your dashboard provides a quick overview of:
- Active projects and their status
- Recent messages and updates
- Upcoming milestones and deadlines
- Invoice summaries

## Navigation
Use the sidebar menu to access different sections:
- **Projects**: View all your projects and their details
- **Messages**: Communicate with your project team
- **Files**: Access and manage project files
- **Invoices**: View billing information and download invoices
- **Support**: Create tickets and get help
- **Tasks**: Manage project tasks and requests

## Quick Actions
- Click on any project card to view detailed information
- Use the search function to quickly find files or information
- Set up notifications to stay updated on project progress

## Need Help?
If you have questions, you can:
1. Search this knowledge base for answers
2. Create a support ticket
3. Send a message to your project team
        `,
        lastUpdated: '2024-02-01',
        views: 1250,
        helpful: 95,
        tags: ['onboarding', 'navigation', 'overview']
      },
      {
        id: 'kb-002',
        title: 'How to Upload and Manage Files',
        category: 'projects',
        summary: 'Step-by-step guide to uploading, organizing, and sharing project files.',
        content: `
# How to Upload and Manage Files

Managing your project files is easy with the built-in file management system.

## Uploading Files
1. Navigate to the Files section
2. Click the "Upload File" button
3. Select your file or drag and drop it
4. Choose the appropriate folder
5. Add a description if needed

## File Organization
Files are automatically organized into folders:
- **Documents**: Contracts, proposals, reports
- **Designs**: Mockups, wireframes, assets
- **Development**: Code files, databases
- **Assets**: Images, videos, marketing materials
- **Testing**: Test results, feedback
- **Documentation**: User guides, technical docs

## File Sharing
- All uploaded files are instantly available to your project team
- You can download any file at any time
- File versions are tracked automatically

## Best Practices
- Use descriptive file names
- Keep files organized in appropriate folders
- Regularly review and clean up old files
- Upload files in commonly supported formats (PDF, JPG, PNG, DOC, etc.)
        `,
        lastUpdated: '2024-01-28',
        views: 890,
        helpful: 87,
        tags: ['files', 'upload', 'organization', 'sharing']
      },
      {
        id: 'kb-003',
        title: 'Understanding Your Invoice',
        category: 'billing',
        summary: 'Learn how to read your invoices and understand billing terms.',
        content: `
# Understanding Your Invoice

Your invoices contain detailed information about the work completed and charges incurred.

## Invoice Sections
**Header Information**
- Invoice number and date
- Project name and billing period
- Payment due date

**Line Items**
- Description of work performed
- Hours worked or flat fee
- Rate and total amount
- Project phase or milestone

**Payment Information**
- Accepted payment methods
- Payment instructions
- Late fees and terms

## Payment Status
- **Paid**: Payment received and processed
- **Pending**: Invoice sent, awaiting payment
- **Overdue**: Payment past due date
- **Draft**: Invoice being prepared

## Questions About Billing?
If you have questions about any charges:
1. Review the detailed line items
2. Check the project activity log
3. Contact your project manager
4. Create a billing support ticket

## Payment Methods
We accept:
- Bank transfers
- Credit cards
- Online payment portals
- Checks (by arrangement)
        `,
        lastUpdated: '2024-01-25',
        views: 456,
        helpful: 92,
        tags: ['billing', 'invoice', 'payment', 'charges']
      },
      {
        id: 'kb-004',
        title: 'Creating and Managing Tasks',
        category: 'projects',
        summary: 'How to create task requests and track their progress.',
        content: `
# Creating and Managing Tasks

The task management system allows you to request work and track progress.

## Creating a New Task
1. Go to the Tasks section
2. Click "New Task"
3. Fill in the task details:
   - Title: Brief description
   - Description: Detailed requirements
   - Priority: High, Medium, or Low
   - Due Date: When you need it completed
   - Assign To: Team member (optional)

## Task Categories
- **Design**: UI/UX work, graphics, layouts
- **Development**: Coding, features, fixes
- **Content**: Writing, editing, reviews
- **Testing**: QA, bug fixes, validation
- **General**: Other requests

## Tracking Progress
Tasks move through these stages:
- **Pending**: Waiting to be started
- **In Progress**: Currently being worked on
- **Completed**: Finished and ready for review

## Communication
- Add comments to provide additional details
- Receive notifications when status changes
- Team members can ask questions directly on tasks

## Best Practices
- Be specific in your task descriptions
- Set realistic due dates
- Provide examples or references when helpful
- Follow up if you don't see progress
        `,
        lastUpdated: '2024-02-01',
        views: 234,
        helpful: 88,
        tags: ['tasks', 'requests', 'project-management', 'workflow']
      },
      {
        id: 'kb-005',
        title: 'Two-Factor Authentication Setup',
        category: 'account',
        summary: 'Secure your account with two-factor authentication.',
        content: `
# Two-Factor Authentication Setup

Protect your account with an additional layer of security using two-factor authentication (2FA).

## What is 2FA?
Two-factor authentication requires two forms of verification:
1. Your password (something you know)
2. A code from your phone (something you have)

## Setting Up 2FA
1. Go to Settings > Security
2. Click "Enable Two-Factor Authentication"
3. Download an authenticator app:
   - Google Authenticator
   - Authy
   - Microsoft Authenticator
4. Scan the QR code with your app
5. Enter the verification code
6. Save your backup codes

## Using 2FA
After setup, you'll need to:
1. Enter your password as usual
2. Open your authenticator app
3. Enter the 6-digit code
4. Complete login

## Backup Codes
- Save backup codes in a secure location
- Use them if you lose access to your phone
- Each code can only be used once
- Generate new codes after using them

## Troubleshooting
- Make sure your phone's time is correct
- Try generating a new code if one doesn't work
- Contact support if you're locked out
        `,
        lastUpdated: '2024-01-30',
        views: 167,
        helpful: 94,
        tags: ['security', '2fa', 'authentication', 'account']
      },
      {
        id: 'kb-006',
        title: 'Integrating with Third-Party Tools',
        category: 'integrations',
        summary: 'Connect your favorite tools and services to streamline workflows.',
        content: `
# Integrating with Third-Party Tools

Connect your portal with external tools to streamline your workflow.

## Available Integrations

**Calendar Sync**
- Google Calendar
- Outlook Calendar
- Apple Calendar
- Sync project milestones and meetings

**File Storage**
- Google Drive
- Dropbox
- OneDrive
- Automatic file synchronization

**Communication**
- Slack notifications
- Microsoft Teams
- Email alerts
- Real-time updates

**Project Management**
- Jira integration
- Asana sync
- Trello boards
- Task synchronization

## Setting Up Integrations
1. Go to Settings > Integrations
2. Select the service you want to connect
3. Click "Connect" and authorize access
4. Configure sync preferences
5. Test the connection

## Benefits
- Reduced manual work
- Real-time synchronization
- Centralized notifications
- Improved collaboration

## Security
- All integrations use secure OAuth
- You can revoke access at any time
- Data is encrypted in transit
- Regular security audits

## Need Help?
- Check integration status in Settings
- Review sync logs for errors
- Contact support for custom integrations
        `,
        lastUpdated: '2024-01-27',
        views: 312,
        helpful: 85,
        tags: ['integrations', 'calendar', 'sync', 'automation']
      }
    ]);

    setHelpfulCount({
      'kb-001': 95,
      'kb-002': 87,
      'kb-003': 92,
      'kb-004': 88,
      'kb-005': 94,
      'kb-006': 85
    });
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const markHelpful = (articleId, helpful) => {
    setHelpfulCount(prev => ({
      ...prev,
      [articleId]: helpful ? (prev[articleId] || 0) + 1 : Math.max(0, (prev[articleId] || 0) - 1)
    }));
  };

  if (selectedArticle) {
    return (
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setSelectedArticle(null)}
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
            Back to Knowledge Base
          </button>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '24px'
        }}>
          <div style={{
            borderBottom: '1px solid rgba(63, 63, 70, 0.4)',
            paddingBottom: '24px',
            marginBottom: '32px'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 12px 0'
            }}>{selectedArticle.title}</h1>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              color: '#a1a1aa',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              <span>Last updated: {selectedArticle.lastUpdated}</span>
              <span>{selectedArticle.views} views</span>
              <span>{helpfulCount[selectedArticle.id] || selectedArticle.helpful}% found helpful</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedArticle.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    background: 'rgba(220, 38, 38, 0.1)',
                    color: '#dc2626',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '4px 8px',
                    borderRadius: '12px'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            color: 'white',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            {selectedArticle.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return (
                  <h1 key={index} style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: 'white',
                    margin: '32px 0 16px 0'
                  }}>
                    {line.substring(2)}
                  </h1>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={index} style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: 'white',
                    margin: '24px 0 12px 0'
                  }}>
                    {line.substring(3)}
                  </h2>
                );
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h3 key={index} style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#dc2626',
                    margin: '20px 0 8px 0'
                  }}>
                    {line.slice(2, -2)}
                  </h3>
                );
              }
              if (line.trim().startsWith('- ')) {
                return (
                  <li key={index} style={{
                    color: '#d1d5db',
                    marginBottom: '4px',
                    marginLeft: '20px'
                  }}>
                    {line.substring(2)}
                  </li>
                );
              }
              if (line.trim().match(/^\d+\./)) {
                return (
                  <li key={index} style={{
                    color: '#d1d5db',
                    marginBottom: '4px',
                    marginLeft: '20px',
                    listStyleType: 'decimal'
                  }}>
                    {line.substring(line.indexOf('.') + 1).trim()}
                  </li>
                );
              }
              if (line.trim() === '') {
                return <br key={index} />;
              }
              return (
                <p key={index} style={{
                  color: '#d1d5db',
                  marginBottom: '12px'
                }}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 16px 0'
          }}>Was this article helpful?</h3>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => markHelpful(selectedArticle.id, true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
              </svg>
              Yes, helpful
            </button>
            <button
              onClick={() => markHelpful(selectedArticle.id, false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(63, 63, 70, 0.4)',
                color: 'white',
                border: '1px solid rgba(63, 63, 70, 0.6)',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
              </svg>
              Needs improvement
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          Knowledge Base
        </h1>
      </div>

      {/* Search Bar */}
      <div style={{
        background: 'rgba(24, 24, 27, 0.8)',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        borderRadius: '12px',
        padding: '24px',
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
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search articles, guides, and FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 16px 16px 52px',
              background: 'rgba(63, 63, 70, 0.2)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '24px'
      }}>
        {/* Categories Sidebar */}
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
          }}>Categories</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px',
                  background: selectedCategory === category.id 
                    ? 'rgba(220, 38, 38, 0.1)' 
                    : 'transparent',
                  border: selectedCategory === category.id 
                    ? '1px solid #dc2626' 
                    : '1px solid transparent',
                  borderRadius: '8px',
                  color: selectedCategory === category.id ? '#dc2626' : '#d1d5db',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <span>{category.name}</span>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#a1a1aa',
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}>
                  {category.id === 'all' 
                    ? articles.length 
                    : articles.filter(a => a.category === category.id).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: 'white',
            margin: '0 0 24px 0'
          }}>
            {selectedCategory === 'all' 
              ? 'All Articles' 
              : categories.find(c => c.id === selectedCategory)?.name
            }
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
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
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    margin: '0 0 8px 0'
                  }}>{article.title}</h3>
                  
                  <p style={{
                    color: '#d1d5db',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    margin: '0 0 12px 0'
                  }}>{article.summary}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      color: '#a1a1aa',
                      fontSize: '12px'
                    }}>
                      <span>{article.views} views</span>
                      <span>{helpfulCount[article.id] || article.helpful}% helpful</span>
                      <span>Updated {article.lastUpdated}</span>
                    </div>
                    
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#a1a1aa'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 16px' }}>
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                No articles found
              </h3>
              <p style={{ fontSize: '14px', margin: 0 }}>
                Try adjusting your search terms or browse different categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}