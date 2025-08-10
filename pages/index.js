import { useState } from 'react';
import Head from 'next/head';

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
      try {
        await navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Password copied!');
      }
    }
  };

  return (
    <>
      <Head>
        <title>Free Secure Password Generator - Strong Random Passwords Online</title>
        <meta name="description" content="Generate secure, random passwords instantly. Free online password generator with customizable length (4-50 chars). No registration required. Works on mobile." />
        <meta name="keywords" content="password generator, secure password, random password, strong password, online password tool, free password generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free Secure Password Generator" />
        <meta property="og:description" content="Generate secure, random passwords instantly. Free online tool with customizable options." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pwd-gen-vert.vercel.app/" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Secure Password Generator" />
        <meta name="twitter:description" content="Generate secure passwords instantly. Free online tool." />
        
        <link rel="canonical" href="https://pwd-gen-vert.vercel.app/" />
      </Head>

      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2rem',
              margin: '0 0 0.5rem 0',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              🔐 Password Generator
            </h1>
            <p style={{ 
              color: '#64748b', 
              margin: '0',
              fontSize: '1rem'
            }}>
              Generate secure passwords instantly
            </p>
          </header>

          {/* Password Display */}
          <section style={{ marginBottom: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <input
                type="text"
                value={password}
                readOnly
                placeholder="Click generate to create password"
                aria-label="Generated password"
                style={{
                  flex: '1',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Monaco, Consolas, monospace',
                  fontSize: '0.9rem',
                  background: '#f8fafc',
                  minHeight: '44px', // Touch target
                  outline: 'none'
                }}
              />
              <button
                onClick={copyPassword}
                disabled={!password}
                aria-label="Copy password to clipboard"
                style={{
                  padding: '0.75rem 1rem',
                  background: password ? '#2563eb' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: password ? 'pointer' : 'not-allowed',
                  minWidth: '80px',
                  minHeight: '44px', // Touch target
                  fontSize: '0.9rem'
                }}
              >
                Copy
              </button>
            </div>
          </section>

          {/* Length Control */}
          <section style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="length-slider" style={{ 
              display: 'block', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#374151',
              fontSize: '0.9rem'
            }}>
              Length: {length} characters
            </label>
            <input
              id="length-slider"
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              aria-label="Password length"
              style={{
                width: '100%',
                height: '6px',
                background: '#e2e8f0',
                borderRadius: '3px',
                outline: 'none',
                WebkitAppearance: 'none',
                cursor: 'pointer'
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
          </section>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              minHeight: '44px', // Touch target
              marginBottom: '2rem'
            }}
          >
            Generate Password
          </button>

          {/* Features */}
          <section>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Why Use Our Generator?
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '1rem',
              textAlign: 'center'
            }}>
              {[
                { icon: '🔒', title: 'Secure', desc: 'Random generation' },
                { icon: '⚡', title: 'Fast', desc: 'Instant results' },
                { icon: '🛡️', title: 'Private', desc: 'No data stored' },
                { icon: '📱', title: 'Mobile', desc: 'Works anywhere' }
              ].map((feature, index) => (
                <div key={index} style={{
                  padding: '0.75rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{feature.icon}</div>
                  <h3 style={{ 
                    fontWeight: '600', 
                    fontSize: '0.85rem',
                    margin: '0 0 0.25rem 0', 
                    color: '#1f2937' 
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#6b7280',
                    margin: '0'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <footer style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: '#f8fafc', 
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            <p style={{ margin: '0' }}>
              Free online password generator. Create secure, random passwords with customizable length. 
              No registration required. Works on desktop and mobile devices.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}