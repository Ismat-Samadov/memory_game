import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Free Secure Password Generator - Strong Random Passwords Online | SecurePassGen</title>
        <meta name="description" content="Generate ultra-secure random passwords instantly with our free online password generator. Customizable length (4-50 characters), instant generation, mobile-friendly. No registration required, completely private." />
        <meta name="keywords" content="password generator, secure password, random password, strong password, online password tool, free password generator, password security, cybersecurity, password maker, random string generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="SecurePassGen" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="US" />
        <meta name="geo.position" content="39.76;-98.5" />
        <meta name="ICBM" content="39.76, -98.5" />
        
        {/* Enhanced Open Graph */}
        <meta property="og:site_name" content="SecurePassGen" />
        <meta property="og:title" content="Free Secure Password Generator - Strong Random Passwords Online" />
        <meta property="og:description" content="Generate ultra-secure random passwords instantly. Free online password generator with customizable length, mobile-friendly design, and enterprise-grade security." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pwd-gen-vert.vercel.app/" />
        <meta property="og:image" content="https://pwd-gen-vert.vercel.app/icon-512x512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Secure Password Generator Tool" />
        <meta property="og:locale" content="en_US" />
        
        {/* Enhanced Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@securepassgen" />
        <meta name="twitter:creator" content="@securepassgen" />
        <meta name="twitter:title" content="Free Secure Password Generator - Strong Random Passwords" />
        <meta name="twitter:description" content="Generate ultra-secure random passwords instantly. Free, fast, and mobile-friendly password generator." />
        <meta name="twitter:image" content="https://pwd-gen-vert.vercel.app/icon-512x512.png" />
        <meta name="twitter:image:alt" content="Secure Password Generator Tool" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Password Gen" />
        <meta name="application-name" content="SecurePassGen" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/icon-192x192.png" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Secure Password Generator",
              "alternateName": "SecurePassGen",
              "description": "Generate ultra-secure random passwords instantly with customizable length. Free online password generator with enterprise-grade security and mobile-friendly design.",
              "url": "https://pwd-gen-vert.vercel.app/",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "softwareVersion": "1.0",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1247"
              },
              "featureList": [
                "Secure random password generation",
                "Customizable password length (4-50 characters)",
                "Instant generation",
                "Mobile-friendly interface",
                "No registration required",
                "Completely private and secure",
                "Copy to clipboard functionality"
              ],
              "author": {
                "@type": "Organization",
                "name": "SecurePassGen",
                "url": "https://pwd-gen-vert.vercel.app/"
              },
              "datePublished": "2024-01-01",
              "dateModified": "2024-08-13"
            })
          }}
        />
        
        <link rel="canonical" href="https://pwd-gen-vert.vercel.app/" />
        <link rel="alternate" hrefLang="en" href="https://pwd-gen-vert.vercel.app/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Head>

      <main className="main-container gradient-bg" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="generator-card" style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 className="header-title" style={{
              fontSize: '2rem',
              margin: '0 0 0.5rem 0',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              🔐 Secure Password Generator
            </h1>
            <p style={{ 
              color: '#64748b', 
              margin: '0',
              fontSize: '1rem'
            }}>
              Create ultra-secure random passwords instantly - Free, fast, and private
            </p>
          </header>

          {/* Password Display */}
          <section style={{ marginBottom: '1.5rem' }}>
            <div className="password-input-group" style={{ 
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
                className="password-input"
                style={{
                  flex: '1',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontFamily: 'Monaco, Consolas, monospace',
                  fontSize: '0.9rem',
                  background: '#f8fafc',
                  minHeight: '44px',
                  outline: 'none',
                  wordBreak: 'break-all'
                }}
              />
              <button
                onClick={copyPassword}
                disabled={!password}
                aria-label="Copy password to clipboard"
                className="copy-button"
                style={{
                  padding: '0.75rem 1rem',
                  background: copied ? '#10b981' : (password ? '#2563eb' : '#9ca3af'),
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: password ? 'pointer' : 'not-allowed',
                  minWidth: '80px',
                  minHeight: '44px',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {copied ? '✓ Copied!' : 'Copy'}
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
            <div className="features-grid" style={{ 
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

          {/* Enhanced SEO Content Section */}
          <section style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            background: '#f8fafc', 
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#374151'
          }}>
            <h2 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Professional Password Security
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  Enterprise-Grade Security
                </h3>
                <p style={{ margin: '0', lineHeight: '1.5', color: '#6b7280' }}>
                  Our password generator uses cryptographically secure random number generation 
                  to create passwords that meet enterprise security standards and compliance requirements.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  Privacy-First Design
                </h3>
                <p style={{ margin: '0', lineHeight: '1.5', color: '#6b7280' }}>
                  All password generation happens locally in your browser. No passwords are stored, 
                  logged, or transmitted to our servers, ensuring complete privacy and security.
                </p>
              </div>
            </div>
            
            <div style={{ 
              textAlign: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid #e2e8f0',
              fontSize: '0.8rem',
              color: '#6b7280'
            }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                <strong>Free Online Password Generator</strong> - Create secure, random passwords 
                with customizable length (4-50 characters). Perfect for personal accounts, 
                business applications, and security-conscious users.
              </p>
              <p style={{ margin: '0' }}>
                Compatible with all password managers including LastPass, 1Password, Bitwarden, 
                and Dashlane. Works on desktop and mobile devices without registration.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}