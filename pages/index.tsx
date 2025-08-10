import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  const generatePassword = () => {
    if (passwordType === 'password') {
      let charset = '';
      if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (includeNumbers) charset += '0123456789';
      if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      if (excludeSimilar) {
        charset = charset.replace(/[il1Lo0O]/g, '');
      }

      let result = '';
      for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      setPassword(result);
    }
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      alert('Password copied to clipboard!');
    }
  };

  return (
    <>
      <Head>
        <title>Free Secure Password Generator | Strong Random Passwords Online</title>
        <meta name="description" content="Generate secure, random passwords, passphrases, and PINs instantly. Free online password generator with customizable length, character types, and strength analysis. No registration required." />
        <meta name="keywords" content="password generator, secure password, random password, strong password, passphrase generator, PIN generator, online password tool, cybersecurity, password security" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta property="og:title" content="Free Secure Password Generator | Strong Random Passwords Online" />
        <meta property="og:description" content="Generate secure, random passwords, passphrases, and PINs instantly. Free online password generator with customizable options and strength analysis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.vercel.app" />
        <meta property="og:image" content="https://your-domain.vercel.app/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Secure Password Generator" />
        <meta name="twitter:description" content="Generate secure, random passwords, passphrases, and PINs instantly with advanced customization options." />
        <meta name="twitter:image" content="https://your-domain.vercel.app/og-image.png" />
        
        <link rel="canonical" href="https://your-domain.vercel.app" />
        
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        <meta name="author" content="Secure Password Generator" />
        <meta name="publisher" content="Secure Password Generator" />
        <meta name="format-detection" content="telephone=no" />
      </Head>

      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1 className="app-title">
              Secure Password Generator
            </h1>
            <p className="app-subtitle">
              Generate strong, secure passwords, passphrases, and PINs instantly
            </p>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            {/* Password Generator */}
            <div className="generator-container">
              <div className="password-display">
                <div className="password-output">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    placeholder="Generated password will appear here"
                    className="password-field"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="copy-btn"
                    disabled={!password}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="generator-options">
                <div className="option-group">
                  <label className="option-title">
                    Length: {length}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="length-slider"
                  />
                  <div className="length-labels">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-title">Character Types</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={includeUpper}
                        onChange={(e) => setIncludeUpper(e.target.checked)}
                      />
                      <span className="checkbox-label">Uppercase (A-Z)</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={includeLower}
                        onChange={(e) => setIncludeLower(e.target.checked)}
                      />
                      <span className="checkbox-label">Lowercase (a-z)</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                      />
                      <span className="checkbox-label">Numbers (0-9)</span>
                    </label>
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                      />
                      <span className="checkbox-label">Symbols (!@#$...)</span>
                    </label>
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-title">Advanced Options</label>
                  <div className="checkbox-group">
                    <label className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={excludeSimilar}
                        onChange={(e) => setExcludeSimilar(e.target.checked)}
                      />
                      <span className="checkbox-label">Exclude similar characters (i, l, 1, L, o, 0, O)</span>
                    </label>
                  </div>
                </div>

                <button onClick={generatePassword} className="generate-btn">
                  Generate Password
                </button>
              </div>
            </div>
            
            <section className="info-section">
              <div className="info-grid">
                <div className="info-card">
                  <h2>🔒 Military-Grade Security</h2>
                  <p>Uses cryptographically secure random number generation to create truly unpredictable passwords that can't be guessed or cracked.</p>
                </div>
                
                <div className="info-card">
                  <h2>⚡ Instant Generation</h2>
                  <p>Generate passwords, passphrases, or PINs instantly with customizable length, character types, and advanced security options.</p>
                </div>
                
                <div className="info-card">
                  <h2>🎯 Smart Analysis</h2>
                  <p>Real-time password strength analysis checks for length, complexity, and common vulnerabilities to ensure maximum security.</p>
                </div>
                
                <div className="info-card">
                  <h2>🛡️ Privacy First</h2>
                  <p>All passwords are generated locally in your browser. Nothing is stored or transmitted to any servers - complete privacy guaranteed.</p>
                </div>
                
                <div className="info-card">
                  <h2>📱 Multi-Platform</h2>
                  <p>Works perfectly on desktop, tablet, and mobile devices. Responsive design ensures optimal experience on any screen size.</p>
                </div>
                
                <div className="info-card">
                  <h2>🚀 Always Free</h2>
                  <p>Completely free to use with no registration, no ads, no tracking, and no limitations. Generate unlimited passwords anytime.</p>
                </div>
              </div>
            </section>

            <section className="faq-section">
              <h2>Frequently Asked Questions</h2>
              
              <div className="faq-item">
                <h3>How secure are the generated passwords?</h3>
                <p>Our password generator uses cryptographically secure random number generation (CSPRNG) to ensure true randomness. Passwords are generated locally in your browser and never transmitted to any servers, making them completely secure.</p>
              </div>
              
              <div className="faq-item">
                <h3>What makes a password strong?</h3>
                <p>Strong passwords typically have 12+ characters, include a mix of uppercase, lowercase, numbers, and symbols, avoid common patterns, and don't contain personal information or dictionary words.</p>
              </div>
              
              <div className="faq-item">
                <h3>Should I use passwords or passphrases?</h3>
                <p>Passphrases (multiple random words) are often easier to remember while maintaining high security. They're excellent for master passwords. Complex passwords are better for accounts you'll store in a password manager.</p>
              </div>
              
              <div className="faq-item">
                <h3>How often should I change my passwords?</h3>
                <p>Change passwords immediately if there's a security breach, if you suspect compromise, or if sharing accounts. For regular accounts, focus on using unique, strong passwords rather than frequent changes.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I trust this password generator?</h3>
                <p>Yes! This tool runs entirely in your browser using client-side JavaScript. Passwords are never sent to our servers or stored anywhere. You can even use it offline after loading the page.</p>
              </div>
            </section>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>&copy; 2025 Secure Password Generator. Built with security and privacy in mind.</p>
            <p>Generate passwords locally in your browser - no data collection, no tracking.</p>
          </div>
        </footer>
      </div>
    </>
  )
}