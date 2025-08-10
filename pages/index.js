export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🔐 Secure Password Generator
        </h1>
        
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Your password generator is working! Now deploying the full version...
        </p>

        <div style={{
          padding: '1rem',
          background: '#f0f9ff',
          borderRadius: '0.5rem',
          border: '1px solid #0ea5e9',
          textAlign: 'center'
        }}>
          <p style={{ color: '#0ea5e9', fontWeight: 'bold' }}>
            ✅ Deployment Successful!
          </p>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            The password generator is now live on Vercel.
          </p>
        </div>
      </div>
    </div>
  );
}