import Link from 'next/link'

export default function Home() {
  return (
    <div className="neu-body" style={{ justifyContent: 'center', gap: '2rem' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;800&display=swap');

        :root {
          --bg: #1a2320;
          --card-light: #1f2b27;
          --card-dark: #141c19;
          --shadow-light: rgba(45, 80, 65, 0.6);
          --shadow-dark: rgba(8, 12, 10, 0.8);
          --text: #8ab5a0;
          --text-dim: #4a7060;
          --green-accent: #4ade80;
        }

        .neu-body {
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Nunito Sans', sans-serif;
        }

        .neu-title {
          font-size: 4rem;
          font-weight: 800;
          color: var(--text);
          letter-spacing: 1px;
          line-height: 1;
        }

        .neu-title span {
          color: var(--green-accent);
        }

        .neu-subtitle {
          color: var(--text-dim);
          font-size: 1.1rem;
          margin-top: 1rem;
          margin-bottom: 2.5rem;
          text-align: center;
        }

        .neu-btn-primary {
          border: none;
          border-radius: 14px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -5px -5px 15px 0px var(--shadow-light),
            -3px -3px 4px 0px rgba(60,100,80,0.3),
            5px 5px 15px 0px var(--shadow-dark),
            3px 3px 4px 0px rgba(0,0,0,0.5);
          color: var(--green-accent);
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.8px;
          padding: 14px 36px;
          cursor: pointer;
          transition: box-shadow 0.15s, color 0.15s;
          text-decoration: none;
        }

        .neu-btn-primary:hover {
          color: #86efac;
          box-shadow:
            -3px -3px 10px 0px var(--shadow-light),
            5px 5px 18px 0px var(--shadow-dark);
        }

        .neu-btn-primary:active {
          box-shadow:
            inset 3px 3px 7px rgba(8,12,10,0.8),
            inset -3px -3px 7px rgba(45,80,65,0.5);
          transform: scale(0.97);
        }

        .neu-btn-ghost {
          border-radius: 14px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            inset 3px 3px 7px rgba(8,12,10,0.8),
            inset -3px -3px 7px rgba(45,80,65,0.5);
          color: var(--text-dim);
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.8px;
          padding: 14px 36px;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }

        .neu-btn-ghost:hover {
          color: var(--green-accent);
        }

        .neu-btn-ghost:active {
          box-shadow:
            -5px -5px 15px 0px var(--shadow-light),
            5px 5px 15px 0px var(--shadow-dark);
        }
      `}</style>

      <h1 className="neu-title">Note<span>Vault</span></h1>
      <p className="neu-subtitle">Your thoughts, secured and organized.</p>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/signup" className="neu-btn-primary">Sign Up</Link>
        <Link href="/login" className="neu-btn-ghost">Login</Link>
      </div>
    </div>
  )
}