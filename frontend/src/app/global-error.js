'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body style={{ background: '#020208', color: '#e0e0e8', fontFamily: 'Rajdhani, system-ui, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundImage: 'linear-gradient(rgba(0,255,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{
              fontFamily: 'Orbitron, system-ui, sans-serif',
              fontSize: '64px',
              fontWeight: 700,
              color: 'rgba(0,255,245,0.1)',
              lineHeight: 1,
              marginBottom: '16px',
              textShadow: '0 0 40px rgba(0,255,245,0.1)',
            }}>
              &#9674;
            </div>
            <h1 style={{
              fontFamily: 'Orbitron, system-ui, sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              marginBottom: '12px',
            }}>
              SOMETHING WENT WRONG
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#505070',
              marginBottom: '24px',
            }}>
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #00fff5, #00b4d8)',
                color: '#020208',
                border: 'none',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '0.15em',
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
