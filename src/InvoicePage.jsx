import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

export function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    // Load invoice data
    setInvoices([
      {
        id: 'INV-2024-001',
        projectName: 'E-commerce Platform',
        amount: 15000,
        status: 'paid',
        dueDate: '2024-01-15',
        issueDate: '2024-01-01',
        description: 'Development Phase 1 - Core functionality implementation',
        items: [
          { description: 'Frontend Development', hours: 120, rate: 85, amount: 10200 },
          { description: 'Backend API Development', hours: 80, rate: 90, amount: 7200 },
          { description: 'Database Design', hours: 20, rate: 100, amount: 2000 }
        ]
      },
      {
        id: 'INV-2024-002',
        projectName: 'Mobile App Development',
        amount: 8500,
        status: 'pending',
        dueDate: '2024-02-15',
        issueDate: '2024-02-01',
        description: 'UI/UX Design and Wireframing',
        items: [
          { description: 'UI Design', hours: 60, rate: 75, amount: 4500 },
          { description: 'UX Research', hours: 40, rate: 80, amount: 3200 },
          { description: 'Prototyping', hours: 18, rate: 85, amount: 1530 }
        ]
      },
      {
        id: 'INV-2024-003',
        projectName: 'Database Migration',
        amount: 5200,
        status: 'overdue',
        dueDate: '2024-01-30',
        issueDate: '2024-01-15',
        description: 'Database optimization and migration services',
        items: [
          { description: 'Database Analysis', hours: 24, rate: 100, amount: 2400 },
          { description: 'Migration Planning', hours: 16, rate: 95, amount: 1520 },
          { description: 'Data Transfer', hours: 32, rate: 90, amount: 2880 }
        ]
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'overdue': return 'Overdue';
      default: return 'Unknown';
    }
  };

  if (selectedInvoice) {
    return (
      <div>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setSelectedInvoice(null)}
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
            Back to Invoices
          </button>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'white',
            margin: 0
          }}>
            Invoice {selectedInvoice.id}
          </h1>
        </div>

        {/* Invoice Details */}
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '32px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            marginBottom: '32px'
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 16px 0'
              }}>
                <span style={{ color: '#dc2626' }}>JABV</span>{' '}
                <span style={{ color: 'white' }}>Labs</span>
              </h2>
              <p style={{ color: '#a1a1aa', margin: '0 0 8px 0' }}>123 Tech Street</p>
              <p style={{ color: '#a1a1aa', margin: '0 0 8px 0' }}>Innovation City, IC 12345</p>
              <p style={{ color: '#a1a1aa', margin: 0 }}>contact@jabvlabs.com</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: getStatusColor(selectedInvoice.status),
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                {getStatusLabel(selectedInvoice.status)}
              </div>
              <div>
                <p style={{ color: '#a1a1aa', fontSize: '14px', margin: '0 0 4px 0' }}>Issue Date</p>
                <p style={{ color: 'white', fontSize: '16px', margin: '0 0 16px 0' }}>{selectedInvoice.issueDate}</p>
                <p style={{ color: '#a1a1aa', fontSize: '14px', margin: '0 0 4px 0' }}>Due Date</p>
                <p style={{ color: 'white', fontSize: '16px', margin: 0 }}>{selectedInvoice.dueDate}</p>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(63, 63, 70, 0.4)',
            paddingTop: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              margin: '0 0 8px 0'
            }}>Project: {selectedInvoice.projectName}</h3>
            <p style={{
              color: '#a1a1aa',
              fontSize: '14px',
              margin: 0
            }}>{selectedInvoice.description}</p>
          </div>

          {/* Invoice Items */}
          <div style={{ marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid rgba(63, 63, 70, 0.4)'
                }}>
                  <th style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'left',
                    padding: '12px 0'
                  }}>Description</th>
                  <th style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'center',
                    padding: '12px 0'
                  }}>Hours</th>
                  <th style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'right',
                    padding: '12px 0'
                  }}>Rate</th>
                  <th style={{
                    color: '#a1a1aa',
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: 'right',
                    padding: '12px 0'
                  }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.items.map((item, index) => (
                  <tr key={index} style={{
                    borderBottom: '1px solid rgba(63, 63, 70, 0.2)'
                  }}>
                    <td style={{
                      color: 'white',
                      fontSize: '14px',
                      padding: '16px 0'
                    }}>{item.description}</td>
                    <td style={{
                      color: 'white',
                      fontSize: '14px',
                      textAlign: 'center',
                      padding: '16px 0'
                    }}>{item.hours}</td>
                    <td style={{
                      color: 'white',
                      fontSize: '14px',
                      textAlign: 'right',
                      padding: '16px 0'
                    }}>${item.rate}</td>
                    <td style={{
                      color: 'white',
                      fontSize: '14px',
                      textAlign: 'right',
                      padding: '16px 0'
                    }}>${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '2px solid rgba(63, 63, 70, 0.4)',
            paddingTop: '16px'
          }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                color: '#a1a1aa',
                fontSize: '16px',
                margin: '0 0 8px 0'
              }}>Total Amount</p>
              <p style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '700',
                margin: 0
              }}>${selectedInvoice.amount.toLocaleString()}</p>
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(63, 63, 70, 0.4)'
          }}>
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
              Download PDF
            </button>
            <button style={{
              background: 'rgba(63, 63, 70, 0.2)',
              color: 'white',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: 'white',
        margin: '0 0 32px 0'
      }}>
        Invoices & Billing
      </h1>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </div>
            <div>
              <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>Total Paid</p>
              <p style={{ color: 'white', fontSize: '24px', fontWeight: '700', margin: 0 }}>$15,000</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <div>
              <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>Pending</p>
              <p style={{ color: 'white', fontSize: '24px', fontWeight: '700', margin: 0 }}>$8,500</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'rgba(24, 24, 27, 0.8)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <div>
              <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>Overdue</p>
              <p style={{ color: 'white', fontSize: '24px', fontWeight: '700', margin: 0 }}>$5,200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices List */}
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
        }}>Recent Invoices</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => setSelectedInvoice(invoice)}
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
                  }}>{invoice.id}</h3>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: getStatusColor(invoice.status),
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                    padding: '4px 8px',
                    borderRadius: '12px'
                  }}>
                    {getStatusLabel(invoice.status)}
                  </div>
                </div>
                <p style={{
                  color: '#a1a1aa',
                  fontSize: '14px',
                  margin: '0 0 4px 0'
                }}>{invoice.projectName}</p>
                <p style={{
                  color: '#71717a',
                  fontSize: '12px',
                  margin: 0
                }}>Due: {invoice.dueDate}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 4px 0'
                }}>${invoice.amount.toLocaleString()}</p>
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