import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunicationsTab = ({ projectId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock messages data
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Johnson",
      senderRole: "Project Manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Hi John! I wanted to provide you with an update on the e-commerce platform redesign project. We've successfully completed the UI/UX design phase and are now moving into the frontend development stage.

The design mockups have been finalized and approved by the stakeholder review committee. Our development team is excited to begin implementing the new responsive design that will significantly improve user experience across all devices.`,
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: true,
      isClient: false
    },
    {
      id: 2,
      sender: "You",
      senderRole: "Client",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Thank you for the update, Sarah! The design mockups look fantastic. I'm particularly impressed with the mobile-first approach and the clean, modern aesthetic. When do you expect the first development milestone to be completed?",
      timestamp: new Date(Date.now() - 82800000), // 23 hours ago
      isRead: true,
      isClient: true
    },
    {
      id: 3,
      sender: "Michael Chen",senderRole: "Lead Developer",avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `Great question! Based on our current development velocity and the complexity of the features, we're targeting February 25th for the completion of Frontend Development Phase 1.

This phase will include:
• Responsive layout implementation
• Core navigation components
• Product catalog functionality
• Shopping cart integration

We'll keep you updated with weekly progress reports and will reach out if we encounter any blockers that might affect the timeline.`,
      timestamp: new Date(Date.now() - 79200000), // 22 hours ago
      isRead: true,
      isClient: false
    },
    {
      id: 4,
      sender: "Emily Rodriguez",senderRole: "UI/UX Designer",avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",content: "I've uploaded the final design assets to the project files section. This includes all the icons, color palettes, typography guidelines, and component specifications that the development team will need for implementation.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      isClient: false
    }
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const message = {
      id: messages.length + 1,
      sender: "You",
      senderRole: "Client",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: newMessage,
      timestamp: new Date(),
      isRead: true,
      isClient: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setIsLoading(false);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return timestamp.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Messages Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Project Communications</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Icon name="Users" size={16} />
          <span>{messages.filter(m => !m.isClient).length} team members</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="card-dark rounded-lg border border-white/10">
        {/* Messages List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex space-x-3 ${message.isClient ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                  <Image
                    src={message.avatar}
                    alt={message.sender}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className={`flex-1 min-w-0 ${message.isClient ? 'text-right' : ''}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-white text-sm">{message.sender}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{message.senderRole}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{formatTimestamp(message.timestamp)}</span>
                  {!message.isRead && !message.isClient && (
                    <div className="w-2 h-2 bg-[#AB1C1C] rounded-full"></div>
                  )}
                </div>
                <div className={`rounded-lg p-3 shadow-sm border border-white/10 ${message.isClient ? 'bg-[#AB1C1C] text-white' : 'bg-black/40 text-white'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Composition - Fixed Styling */}
        <div className="border-t border-white/10 p-4">
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={3}
                  className="w-full px-3 py-2 border border-white/20 rounded-lg resize-none focus:ring-2 focus:ring-[#AB1C1C] focus:border-transparent text-sm bg-black/40 text-white placeholder-gray-300"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Icon name="Info" size={14} />
                <span>Messages are sent to all team members</span>
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim() || isLoading}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#AB1C1C] text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunicationsTab;