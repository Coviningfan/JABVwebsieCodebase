import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load notifications data
    setNotifications([
      {
        id: 'notif-001',
        type: 'project_update',
        title: 'Project milestone completed',
        message: 'Homepage design mockups have been completed and are ready for your review.',
        timestamp: '2024-02-02 14:30:00',
        isRead: false,
        priority: 'high',
        actionUrl: '/projects/1',
        sender: 'Lisa Rodriguez'
      },
      {
        id: 'notif-002',
        type: 'message',
        title: 'New message from project team',
        message: 'Michael Chen has sent you a message regarding the API integration timeline.',
        timestamp: '2024-02-02 11:15:00',
        isRead: false,
        priority: 'medium',
        actionUrl: '/messages',
        sender: 'Michael Chen'
      },
      {
        id: 'notif-003',
        type: 'invoice',
        title: 'Invoice payment received',
        message: 'Your payment for Invoice #INV-2024-001 has been successfully processed.',
        timestamp: '2024-02-01 16:45:00',
        isRead: true,
        priority: 'medium',
        actionUrl: '/invoices',
        sender: 'JABV Labs Billing'
      },
      {
        id: 'notif-004',
        type: 'task',
        title: 'Task assignment updated',
        message: 'The "API integration testing" task has been moved to in-progress status.',
        timestamp: '2024-02-01 09:20:00',
        isRead: true,
        priority: 'low',
        actionUrl: '/tasks',
        sender: 'David Kim'
      },
      {
        id: 'notif-005',
        type: 'file',
        title: 'New file uploaded',
        message: 'Database schema documentation has been uploaded to your project files.',
        timestamp: '2024-01-31 13:10:00',
        isRead: true,
        priority: 'low',
        actionUrl: '/files',
        sender: 'Emily Watson'
      },
      {
        id: 'notif-006',
        type: 'support',
        title: 'Support ticket resolved',
        message: 'Your billing inquiry ticket #TICK-003 has been marked as resolved.',
        timestamp: '2024-01-30 10:30:00',
        isRead: true,
        priority: 'medium',
        actionUrl: '/support',
        sender: 'Lisa Rodriguez'
      }
    ]);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'project_update':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
          </svg>
        );
      case 'message':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        );
      case 'invoice':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        );
      case 'task':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
            <polyline points="9,11 12,14 22,4"/>
            <path d="M21,12v7a2,2 0 01-2,2H5a2,2 0 01-2-2V5a2,2 0 012-2h11"/>
          </svg>
        );
      case 'file':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
            <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
            <polyline points="13,2 13,9 20,9"/>
          </svg>
        );
      case 'support':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
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

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'relative',
            background: 'rgba(63, 63, 70, 0.4)',
            border: '1px solid rgba(63, 63, 70, 0.6)',
            borderRadius: '8px',
            padding: '8px',
            color: '#a1a1aa',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(63, 63, 70, 0.6)';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(63, 63, 70, 0.4)';
            e.target.style.color = '#a1a1aa';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#dc2626',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600',
              padding: '2px 6px',
              borderRadius: '10px',
              minWidth: '18px',
              textAlign: 'center'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '48px',
            right: '0',
            width: '400px',
            maxHeight: '600px',
            background: 'rgba(24, 24, 27, 0.95)',
            border: '1px solid rgba(63, 63, 70, 0.4)',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(63, 63, 70, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0
              }}>Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc2626',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div style={{
              display: 'flex',
              padding: '8px',
              borderBottom: '1px solid rgba(63, 63, 70, 0.4)',
              gap: '4px'
            }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread' },
                { id: 'project_update', label: 'Projects' },
                { id: 'message', label: 'Messages' },
                { id: 'task', label: 'Tasks' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  style={{
                    padding: '6px 12px',
                    background: filter === tab.id ? '#dc2626' : 'transparent',
                    color: filter === tab.id ? 'white' : '#a1a1aa',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {filteredNotifications.length === 0 ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: '#a1a1aa'
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 16px' }}>
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 01-3.46 0"/>
                  </svg>
                  <p style={{ fontSize: '14px', margin: 0 }}>No notifications</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(63, 63, 70, 0.2)',
                      background: notification.isRead ? 'transparent' : 'rgba(220, 38, 38, 0.05)',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(63, 63, 70, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = notification.isRead ? 'transparent' : 'rgba(220, 38, 38, 0.05)';
                    }}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id);
                      }
                      if (notification.actionUrl) {
                        window.location.href = notification.actionUrl;
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{ flexShrink: 0, marginTop: '2px' }}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '4px'
                        }}>
                          <h4 style={{
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                            margin: 0,
                            flex: 1
                          }}>{notification.title}</h4>
                          
                          {!notification.isRead && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              background: '#dc2626',
                              borderRadius: '50%',
                              flexShrink: 0
                            }} />
                          )}
                        </div>
                        
                        <p style={{
                          color: '#d1d5db',
                          fontSize: '13px',
                          lineHeight: '1.4',
                          margin: '0 0 8px 0'
                        }}>{notification.message}</p>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}>
                            <span style={{
                              color: '#a1a1aa',
                              fontSize: '12px'
                            }}>{notification.sender}</span>
                            <span style={{
                              color: '#71717a',
                              fontSize: '12px'
                            }}>•</span>
                            <span style={{
                              color: '#a1a1aa',
                              fontSize: '12px'
                            }}>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#71717a',
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '4px',
                              transition: 'color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = '#dc2626';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = '#71717a';
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3,6 5,6 21,6"/>
                              <path d="M19,6v14a2,2 0 01-2,2H7a2,2 0 01-2-2V6m3,0V4a2,2 0 012-2h4a2,2 0 012,2v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid rgba(63, 63, 70, 0.4)',
              textAlign: 'center'
            }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}