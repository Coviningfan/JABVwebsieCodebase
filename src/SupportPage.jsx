import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

export function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    description: ''
  });
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  useEffect(() => {
    // Load support tickets data
    setTickets([
      {
        id: 'TICK-001',
        subject: 'Login issues with new password',
        category: 'account',
        priority: 'high',
        status: 'open',
        createdDate: '2024-02-01',
        lastUpdated: '2024-02-01',
        assignedTo: 'Sarah Johnson',
        responses: [
          {
            id: 1,
            author: 'John Doe',
            authorType: 'client',
            content: 'I\'m having trouble logging in after resetting my password. The system says my credentials are invalid.',
            timestamp: '2024-02-01 09:30 AM'
          }
        ]
      },
      {
        id: 'TICK-002',
        subject: 'Request for project timeline update',
        category: 'project',
        priority: 'medium',
        status: 'in-progress',
        createdDate: '2024-01-28',
        lastUpdated: '2024-01-30',
        assignedTo: 'Michael Chen',
        responses: [
          {
            id: 1,
            author: 'John Doe',
            authorType: 'client',
            content: 'Could you please provide an updated timeline for the e-commerce platform project? I need to share this with our stakeholders.',
            timestamp: '2024-01-28 02:15 PM'
          },
          {
            id: 2,
            author: 'Michael Chen',
            authorType: 'support',
            content: 'Thanks for reaching out! I\'ll coordinate with the project team and get you an updated timeline by end of week.',
            timestamp: '2024-01-30 10:45 AM'
          }
        ]
      },
      {
        id: 'TICK-003',
        subject: 'Billing inquiry for January invoice',
        category: 'billing',
        priority: 'low',
        status: 'resolved',
        createdDate: '2024-01-25',
        lastUpdated: '2024-01-26',
        assignedTo: 'Lisa Rodriguez',
        responses: [
          {
            id: 1,
            author: 'John Doe',
            authorType: 'client',
            content: 'I have a question about line item #3 on the January invoice. Could you clarify what this charge covers?',
            timestamp: '2024-01-25 11:20 AM'
          },
          {
            id: 2,
            author: 'Lisa Rodriguez',
            authorType: 'support',
            content: 'That line item covers the additional API integration work we discussed in our January 15th meeting. I\'ve attached the detailed breakdown.',
            timestamp: '2024-01-26 09:00 AM'
          }
        ]
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#dc2626';
      case 'in-progress': return '#f59e0b';
      case 'resolved': return '#22c55e';
      case 'closed': return '#6b7280';
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
      case 'account':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        );
      case 'project':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
          </svg>
        );
      case 'billing':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        );
      case 'technical':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16,18 22,12 16,6"/>
            <polyline points="8,6 2,12 8,18"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
    }
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicketData = {
      id: `TICK-${String(tickets.length + 1).padStart(3, '0')}`,
      ...newTicket,
      status: 'open',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      assignedTo: 'Support Team',
      responses: [
        {
          id: 1,
          author: 'John Doe',
          authorType: 'client',
          content: newTicket.description,
          timestamp: new Date().toLocaleString()
        }
      ]
    };
    
    setTickets([newTicketData, ...tickets]);
    setNewTicket({ subject: '', category: 'general', priority: 'medium', description: '' });
    setShowNewTicketForm(false);
  };

  if (selectedTicket) {
    return (
      <div>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setSelectedTicket(null)}
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
            Back to Support
          </button>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'white',
            margin: 0
          }}>
            {selectedTicket.subject}
          </h1>
        </div>

        {/* Ticket Details */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: '24px'
          }}>
            <div>
              <p style={{ color: '#a1a1aa', fontSize: '12px', margin: '0 0 4px 0' }}>Ticket ID</p>
              <p style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>{selectedTicket.id}</p>
            </div>
            <div>
              <p style={{ color: '#a1a1aa', fontSize: '12px', margin: '0 0 4px 0' }}>Status</p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: getStatusColor(selectedTicket.status),
                color: 'white',
                fontSize: '12px',
                fontWeight: '500',
                padding: '4px 8px',
                borderRadius: '12px',
                textTransform: 'capitalize'
              }}>
                {selectedTicket.status.replace('-', ' ')}
              </div>
            </div>
            <div>
              <p style={{ color: '#a1a1aa', fontSize: '12px', margin: '0 0 4px 0' }}>Priority</p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: getPriorityColor(selectedTicket.priority),
                color: 'white',
                fontSize: '12px',
                fontWeight: '500',
                padding: '4px 8px',
                borderRadius: '12px',
                textTransform: 'capitalize'
              }}>
                {selectedTicket.priority}
              </div>
            </div>
            <div>
              <p style={{ color: '#a1a1aa', fontSize: '12px', margin: '0 0 4px 0' }}>Assigned To</p>
              <p style={{ color: 'white', fontSize: '14px', margin: 0 }}>{selectedTicket.assignedTo}</p>
            </div>
          </div>
        </div>

        {/* Conversation */}
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
            margin: '0 0 24px 0'
          }}>Conversation</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {selectedTicket.responses.map((response) => (
              <div
                key={response.id}
                style={{
                  background: response.authorType === 'client' 
                    ? 'rgba(220, 38, 38, 0.1)' 
                    : 'rgba(63, 63, 70, 0.2)',
                  border: `1px solid ${response.authorType === 'client' ? '#dc2626' : 'rgba(63, 63, 70, 0.4)'}`,
                  borderRadius: '8px',
                  padding: '16px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: response.authorType === 'client' 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' 
                        : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontWeight: '500', fontSize: '12px' }}>
                        {response.authorType === 'client' ? 'JD' : 'ST'}
                      </span>
                    </div>
                    <div>
                      <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: 0 }}>
                        {response.author}
                      </p>
                      <p style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
                        {response.authorType === 'client' ? 'Client' : 'Support Team'}
                      </p>
                    </div>
                  </div>
                  <p style={{ color: '#a1a1aa', fontSize: '12px', margin: 0 }}>
                    {response.timestamp}
                  </p>
                </div>
                <p style={{
                  color: 'white',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {response.content}
                </p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(63, 63, 70, 0.4)'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              margin: '0 0 16px 0'
            }}>Add Reply</h4>
            <textarea
              placeholder="Type your message here..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '12px',
                background: 'rgba(63, 63, 70, 0.2)',
                border: '1px solid rgba(63, 63, 70, 0.4)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                resize: 'vertical',
                outline: 'none',
                marginBottom: '16px'
              }}
            />
            <button style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Send Reply
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
          Support Center
        </h1>
        <button
          onClick={() => setShowNewTicketForm(true)}
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
          New Ticket
        </button>
      </div>

      {/* New Ticket Form */}
      {showNewTicketForm && (
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
            }}>Create New Support Ticket</h2>
            <button
              onClick={() => setShowNewTicketForm(false)}
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

          <form onSubmit={handleCreateTicket}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  marginBottom: '6px'
                }}>Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
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
                }}>Category</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
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
                  <option value="account">Account</option>
                  <option value="project">Project</option>
                  <option value="billing">Billing</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: '#a1a1aa',
                  fontSize: '14px',
                  marginBottom: '6px'
                }}>Priority</label>
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
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
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#a1a1aa',
                fontSize: '14px',
                marginBottom: '6px'
              }}>Description</label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                required
                placeholder="Please describe your issue in detail..."
                style={{
                  width: '100%',
                  minHeight: '120px',
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
                Create Ticket
              </button>
              <button
                type="button"
                onClick={() => setShowNewTicketForm(false)}
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

      {/* Support Tickets List */}
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
        }}>Your Support Tickets</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: 0
                  }}>{ticket.subject}</h3>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(63, 63, 70, 0.4)',
                    color: '#a1a1aa',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    textTransform: 'capitalize'
                  }}>
                    {getCategoryIcon(ticket.category)}
                    {ticket.category}
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: getStatusColor(ticket.status),
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    textTransform: 'capitalize'
                  }}>
                    {ticket.status.replace('-', ' ')}
                  </div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: getPriorityColor(ticket.priority),
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    textTransform: 'capitalize'
                  }}>
                    {ticket.priority}
                  </div>
                </div>
                <p style={{
                  color: '#a1a1aa',
                  fontSize: '14px',
                  margin: '0 0 4px 0'
                }}>#{ticket.id} • Assigned to {ticket.assignedTo}</p>
                <p style={{
                  color: '#71717a',
                  fontSize: '12px',
                  margin: 0
                }}>
                  Created {ticket.createdDate} • Last updated {ticket.lastUpdated}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}