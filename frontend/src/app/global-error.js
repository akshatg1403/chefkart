'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ background: '#0A0908', color: '#F5F0E8', fontFamily: 'Syne, system-ui, sans-serif' }}>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '2rem',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{ 
              fontFamily: '"Cormorant Garamond", Georgia, serif', 
              fontSize: '64px', 
              fontWeight: 300,
              color: 'rgba(245,240,232,0.05)',
              lineHeight: 1,
              marginBottom: '-16px',
            }}>
              ◇
            </div>
            <h1 style={{ 
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '28px',
              fontWeight: 300,
              marginBottom: '12px',
            }}>
              Something went wrong
            </h1>
            <p style={{ 
              fontSize: '13px',
              color: 'rgba(212,200,184,0.4)',
              marginBottom: '24px',
            }}>
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: '12px 28px',
                background: '#D4A843',
                color: '#0A0908',
                border: 'none',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
