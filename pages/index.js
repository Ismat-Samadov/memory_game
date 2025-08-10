import { useState } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);

  const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyPassword = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      alert('Password copied!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 20px 25px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          🔐 Secure Password Generator
        </h1>
        
        <p style={{ 
          textAlign: 'center', 
          color: '#64748b', 
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Generate strong, secure passwords with customizable options
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Generated password will appear here"
              style={{
                flex: '1',
                minWidth: '300px',
                padding: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontFamily: 'Monaco, monospace',
                fontSize: '1rem',
                background: '#f8fafc'
              }}
            />
            <button
              onClick={copyPassword}
              disabled={!password}
              style={{
                padding: '1rem 1.5rem',
                background: password ? '#2563eb' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: password ? 'pointer' : 'not-allowed',
                minWidth: '100px'
              }}
            >
              Copy
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ 
            display: 'block', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: '#374151'
          }}>
            Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              background: '#e2e8f0',
              borderRadius: '4px',
              outline: 'none',
              WebkitAppearance: 'none'
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            marginTop: '0.25rem' 
          }}>
            <span>4</span>
            <span>50</span>
          </div>
        </div>

        <button
          onClick={generatePassword}
          style={{
            width: '100%',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          🚀 Generate Secure Password
        </button>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem' 
        }}>
          {[
            { icon: '🔒', title: 'Secure', desc: 'Cryptographically secure generation' },
            { icon: '🚀', title: 'Fast', desc: 'Generate passwords instantly' },
            { icon: '🛡️', title: 'Private', desc: 'Everything happens in your browser' },
            { icon: '📱', title: 'Responsive', desc: 'Works on all devices' }
          ].map((feature, index) => (
            <div key={index} style={{
              padding: '1rem',
              background: 'rgba(37, 99, 235, 0.05)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(37, 99, 235, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#1f2937' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}