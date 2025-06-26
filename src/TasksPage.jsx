import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

export function TasksPage({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: 'unassigned',
    dueDate: '',
    category: 'general'
  });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const teamMembers = [
    { id: 'unassigned', name: 'Unassigned', role: '' },
    { id: 'sarah-johnson', name: 'Sarah Johnson', role: 'Project Manager' },
    { id: 'michael-chen', name: 'Michael Chen', role: 'Lead Developer' },
    { id: 'lisa-rodriguez', name: 'Lisa Rodriguez', role: 'UI/UX Designer' },
    { id: 'david-kim', name: 'David Kim', role: 'Backend Developer' },
    { id: 'emily-watson', name: 'Emily Watson', role: 'QA Engineer' }
  ];

  useEffect(() => {
    // Load tasks data
    setTasks([
      {
        id: 'TASK-001',
        title: 'Review homepage design mockups',
        description: 'Please review the new homepage design mockups and provide feedback on layout, colors, and messaging.',
        priority: 'high',
        status: 'pending',
        assignedTo: 'lisa-rodriguez',
        assignedBy: 'client',
        createdDate: '2024-02-01',
        dueDate: '2024-02-05',
        category: 'design',
        comments: [
          {
            id: 1,
            author: 'John Doe',
            authorType: 'client',
            content: 'The hero section looks great, but can we make the call-to-action button more prominent?',
            timestamp: '2024-02-02 10:30 AM'
          }
        ]
      },
      {
        id: 'TASK-002',
        title: 'API integration testing',
        description: 'Test the payment gateway integration and ensure all endpoints are working correctly.',
        priority: 'high',
        status: 'in-progress',
        assignedTo: 'david-kim',
        assignedBy: 'sarah-johnson',
        createdDate: '2024-01-28',
        dueDate: '2024-02-03',
        category: 'development',
        comments: []
      },
      {
        id: 'TASK-003',
        title: 'Content review for about page',
        description: 'Review and approve the content for the about page, including team bios and company history.',
        priority: 'medium',
        status: 'completed',
        assignedTo: 'unassigned',
        assignedBy: 'client',
        createdDate: '2024-01-25',
        dueDate: '2024-01-30',
        category: 'content',
        completedDate: '2024-01-29',
        comments: [
          {
            id: 1,
            author: 'John Doe',
            authorType: 'client',
            content: 'Content looks good, approved for publication.',
            timestamp: '2024-01-29 02:15 PM'
          }
        ]
      },
      {
        id: 'TASK-004',
        title: 'Mobile responsiveness testing',
        description: 'Test the website on various mobile devices and ensure optimal user experience.',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'emily-watson',
        assignedBy: 'michael-chen',
        createdDate: '2024-02-01',
        dueDate: '2024-02-08',
        category: 'testing',
        comments: []
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'in-progress': return '#3b82f6';
      case 'completed': return '#22c55e';
      case 'overdue': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'design':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>
        );
      case 'development':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16,18 22,12 16,6"/>
            <polyline points="8,6 2,12 8,18"/>
          </svg>
        );
      case 'content':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
        );
      case 'testing':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11H1l6-6v6c3.31 0 6 2.69 6 6s-2.69 6-6 6v-2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        );
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const newTaskData = {
      id: `TASK-${String(tasks.length + 1).padStart(3, '0')}`,
      ...newTask,
      status: 'pending',
      assignedBy: 'client',
      createdDate: new Date().toISOString().split('T')[0],
      comments: []
    };
    
    setTasks([newTaskData, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignedTo: 'unassigned',
      dueDate: '',
      category: 'general'
    });
    setShowNewTaskForm(false);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : undefined }
        : task
    ));
  };

  const getTeamMemberName = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    return member ? member.name : 'Unassigned';
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'my-tasks') return task.assignedBy === 'client';
    return task.status === filter;
  });

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
          Tasks & Requests
        </h1>
        <button
          onClick={() => setShowNewTaskForm(true)}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          New Task
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        background: 'rgba(24, 24, 27, 0.8)',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        borderRadius: '12px',
        padding: '8px'
      }}>
        {[
          { id: 'all', label: 'All Tasks', count: tasks.length },
          { id: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
          { id: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
          { id: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
          { id: 'my-tasks', label: 'My Requests', count: tasks.filter(t => t.assignedBy === 'client').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: filter === tab.id ? '#dc2626' : 'transparent',
              color: filter === tab.id ? 'white' : '#a1a1aa',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
            <span style={{
              background: filter === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              color: filter === tab.id ? 'white' : '#71717a',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '10px'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* New Task Form */}
      {showNewTaskForm && (
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
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
            }}>Create New Task</h2>
            <button
              onClick={() => setShowNewTaskForm(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#a1a1aa',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleCreateTask}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  marginBottom: '6px'
                }}>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(63, 63, 70, 0.2)',
                    border: '1px solid rgba(63, 63, 70, 0.4)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  marginBottom: '6px'
                }}>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(63, 63, 70, 0.2)',
                    border: '1px solid rgba(63, 63, 70, 0.4)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  marginBottom: '6px'
                }}>Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(63, 63, 70, 0.2)',
                    border: '1px solid rgba(63, 63, 70, 0.4)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  marginBottom: '6px'
                }}>Assign To</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(63, 63, 70, 0.2)',
                    border: '1px solid rgba(63, 63, 70, 0.4)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} {member.role ? `(${member.role})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  marginBottom: '6px'
                }}>Category</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(63, 63, 70, 0.2)',
                    border: '1px solid rgba(63, 63, 70, 0.4)',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="general">General</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="content">Content</option>
                  <option value="testing">Testing</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#a1a1aa',
                fontSize: '14px',
                marginBottom: '6px'
              }}>Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                required
                placeholder="Describe the task or request in detail..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px',
                  background: 'rgba(63, 63, 70, 0.2)',
                  border: '1px solid rgba(63, 63, 70, 0.4)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '14px',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => setShowNewTaskForm(false)}
                style={{
                  background: 'rgba(63, 63, 70, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(63, 63, 70, 0.4)',
                  borderRadius: '6px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div style={{
        background: 'rgba(24, 24, 27, 0.8)',
        border: '1px solid rgba(63, 63, 70, 0.4)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: 'rgba(63, 63, 70, 0.2)',
                border: '1px solid rgba(63, 63, 70, 0.4)',
                borderRadius: '8px',
                padding: '20px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                      margin: 0
                    }}>{task.title}</h3>
                    
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(63, 63, 70, 0.4)',
                      color: '#a1a1aa',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
                      {getCategoryIcon(task.category)}
                      {task.category}
                    </div>
                    
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: getStatusColor(task.status),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {task.status.replace('-', ' ')}
                    </div>
                    
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: getPriorityColor(task.priority),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {task.priority}
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#d1d5db',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    margin: '0 0 12px 0'
                  }}>{task.description}</p>
                  
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    color: '#a1a1aa',
                    fontSize: '12px'
                  }}>
                    <span>#{task.id}</span>
                    <span>Assigned to: {getTeamMemberName(task.assignedTo)}</span>
                    <span>Created: {task.createdDate}</span>
                    {task.dueDate && <span>Due: {task.dueDate}</span>}
                    {task.completedDate && <span>Completed: {task.completedDate}</span>}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {task.status !== 'completed' && (
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      style={{
                        background: 'rgba(63, 63, 70, 0.4)',
                        border: '1px solid rgba(63, 63, 70, 0.6)',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: 'white',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Complete</option>
                    </select>
                  )}
                </div>
              </div>
              
              {task.comments.length > 0 && (
                <div style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(63, 63, 70, 0.4)'
                }}>
                  <h4 style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 12px 0'
                  }}>Comments</h4>
                  {task.comments.map(comment => (
                    <div key={comment.id} style={{
                      background: 'rgba(63, 63, 70, 0.3)',
                      borderRadius: '6px',
                      padding: '12px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                          {comment.author}
                        </span>
                        <span style={{ color: '#a1a1aa', fontSize: '12px' }}>
                          {comment.timestamp}
                        </span>
                      </div>
                      <p style={{
                        color: '#d1d5db',
                        fontSize: '14px',
                        margin: 0
                      }}>{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}