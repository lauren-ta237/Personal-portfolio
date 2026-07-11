import React, { useState } from 'react';
import ChatWindow from './AIButton';

export default function ChatTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#2563eb', // Clean Blue accent
          color: '#ffffff',
          border: 'none',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Slide-Up Chat Panel Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px', // Clears the floating action button
            right: '24px',
            width: '400px',
            height: '600px',
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 140px)',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: 9998,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Your chat state logic handles rendering everything inside here */}
          <ChatWindow />
        </div>
      )}
    </>
  );
}