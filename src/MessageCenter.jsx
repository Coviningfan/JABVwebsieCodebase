import React, { useState, useEffect } from 'react';
import { dataService } from './dataService.js';

export function MessageCenter({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadMessages();
    }
  }, [projectId]);

  const loadMessages = () => {
    setIsLoading(true);
    try {
      const projectMessages = dataService.getProjectMessages(projectId);
      setMessages(projectMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      await dataService.sendMessage(projectId, newMessage.trim());
      setNewMessage('');
      loadMessages(); // Refresh messages
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsSending(false);
  };

  if (!projectId) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: '#a1a1aa'
      }}>
        Select a project to view messages
      </div>
    );
  }

  return (
    <div style={{
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(24, 24, 27, 0.8)',
      border: '1px solid rgba(63, 63, 70, 0.4)',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Messages Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(63, 63, 70, 0.4)',
        background: 'rgba(24, 24, 27, 0.6)'
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '18px',
          fontWeight: '600',
          margin: 0
        }}>Project Messages</h3>
      </div>

      {/* Messages List */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {isLoading ? (
          <div style={{ color: '#a1a1aa', textAlign: 'center' }}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div style={{ color: '#a1a1aa', textAlign: 'center' }}>No messages yet</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              background: message.user_role === 'client' 
                ? 'rgba(220, 38, 38, 0.1)' 
                : 'rgba(63, 63, 70, 0.3)',
              borderRadius: '12px',
              border: `1px solid ${message.user_role === 'client' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(63, 63, 70, 0.4)'}`
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: message.user_role === 'client' ? '#dc2626' : '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  {message.user_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>{message.user_name}</span>
                    <span style={{
                      color: '#a1a1aa',
                      fontSize: '12px'
                    }}>{message.time_ago}</span>
                  </div>
                </div>
              </div>
              <div style={{
                color: '#e5e7eb',
                fontSize: '14px',
                lineHeight: '1.5',
                marginLeft: '40px'
              }}>
                {message.message}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid rgba(63, 63, 70, 0.4)',
        background: 'rgba(24, 24, 27, 0.6)'
      }}>
        <form onSubmit={handleSendMessage} style={{
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isSending}
            style={{
              flex: 1,
              padding: '12px',
              background: 'rgba(24, 24, 27, 0.8)',
              border: '1px solid rgba(63, 63, 70, 0.4)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#dc2626';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(63, 63, 70, 0.4)';
            }}
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            style={{
              padding: '12px 20px',
              background: isSending || !newMessage.trim() ? '#6b7280' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: isSending || !newMessage.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}