import React, { useState, useEffect } from 'react';
import { adminDataService } from './adminDataService.js';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    email: '',
    full_name: '',
    company_name: '',
    phone: ''
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const customerData = await adminDataService.getCustomers();
    setCustomers(customerData);
    setLoading(false);
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await adminDataService.createCustomer(newCustomer);
    
    if (result.success) {
      await adminDataService.sendVerificationEmail(
        newCustomer.email, 
        result.verification_token
      );
      
      setNewCustomer({ email: '', full_name: '', company_name: '', phone: '' });
      setShowCreateForm(false);
      await loadCustomers();
    }
    
    setLoading(false);
  };

  const getVerificationStatus = (customer) => {
    const verification = customer.customer_verifications?.[0];
    if (!verification) return 'No verification';
    return verification.status;
  };

  const handleResendVerification = async (customerId) => {
    setLoading(true);
    const result = await adminDataService.resendVerificationEmail(customerId);
    if (result.success) {
      console.log('Verification email resent successfully');
    }
    setLoading(false);
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
            Customer Management
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
            Create Customer
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
              Create New Customer
            </h2>
            <form onSubmit={handleCreateCustomer}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: '#ffffff', marginBottom: '8px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={newCustomer.full_name}
                    onChange={(e) => setNewCustomer({...newCustomer, full_name: e.target.value})}
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
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={newCustomer.company_name}
                    onChange={(e) => setNewCustomer({...newCustomer, company_name: e.target.value})}
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
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
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
                  {loading ? 'Creating...' : 'Create & Send Verification'}
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
              All Customers
            </h2>
          </div>
          
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>
              Loading customers...
            </div>
          ) : customers.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af' }}>
              No customers found. Create your first customer to get started.
            </div>
          ) : (
            <div style={{ padding: '24px' }}>
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    background: '#000000',
                    borderRadius: '8px',
                    border: '1px solid #333',
                    marginBottom: '16px'
                  }}
                >
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '18px', margin: '0 0 8px 0' }}>
                      {customer.full_name}
                    </h3>
                    <p style={{ color: '#9ca3af', margin: '0 0 4px 0' }}>
                      {customer.email}
                    </p>
                    {customer.company_name && (
                      <p style={{ color: '#9ca3af', margin: '0' }}>
                        {customer.company_name}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{
                      background: getVerificationStatus(customer) === 'verified' ? '#16a34a' : '#dc2626',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {getVerificationStatus(customer)}
                    </span>
                    {getVerificationStatus(customer) === 'pending' && (
                      <button
                        onClick={() => handleResendVerification(customer.id)}
                        disabled={loading}
                        style={{
                          background: '#f59e0b',
                          color: '#ffffff',
                          padding: '4px 8px',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Resend Email
                      </button>
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
