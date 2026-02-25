'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Requires tailwind.config.js with neu-* custom classes (shadows, colors, gradients)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [rippling, setRippling] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setRippling(true)
    setTimeout(() => setRippling(false), 1000)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <>
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
          --green-dim: #2d6e50;
        }

        .neu-body {
          background: var(--bg);
          min-height: 100vh;
          display: grid;
          place-items: center;
          font-family: 'Nunito Sans', sans-serif;
        }

        .neu-card {
          display: flex;
          flex-direction: column;
          padding-block: 28px;
          border-radius: 24px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -7px -7px 20px 0px var(--shadow-light),
            -4px -4px 5px 0px rgba(60,100,80,0.3),
            7px 7px 20px 0px var(--shadow-dark),
            4px 4px 5px 0px rgba(0,0,0,0.5);
          height: 400px;
          width: 320px;
          justify-content: space-between;
          align-items: center;
        }

        .neu-title {
          color: var(--text);
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: 0.8px;
          line-height: 1;
        }

        .neu-input {
          border: none;
          border-radius: 12px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          outline: none;
          font-family: 'Nunito Sans', sans-serif;
          color: var(--text);
          padding-inline: 20px;
          height: 50px;
          width: 80%;
          font-size: 0.9rem;
          box-shadow:
              inset 3px 3px 7px rgba(8,12,10,0.8),
  inset -3px -3px 7px rgba(45,80,65,0.5);
          transition: box-shadow 0.5s ease 0.15s;
        }

        .neu-input::placeholder {
          color: var(--text-dim);
        }

        .neu-input:focus {
          box-shadow:
            -5px -5px 15px 0px var(--shadow-light),
            -3px -3px 4px 0px rgba(60,100,80,0.3),
            5px 5px 15px 0px var(--shadow-dark),
            3px 3px 4px 0px rgba(0,0,0,0.5);
            transform: scale(0.98);
  transition: all 0.27s ease;
        }

        .neu-btn-wrap {
          width: 42%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .neu-btn {
          border: none;
          border-radius: 12px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          cursor: pointer;
          font-weight: 800;
          letter-spacing: 0.8px;
          height: 50px;
          font-size: 1rem;
          color: var(--green-accent);
          font-family: 'Nunito Sans', sans-serif;
          position: relative;
          z-index: 100;
          width: 100%;
          box-shadow:
            -5px -5px 15px 0px var(--shadow-light),
            -3px -3px 4px 0px rgba(60,100,80,0.3),
            5px 5px 15px 0px var(--shadow-dark),
            3px 3px 4px 0px rgba(0,0,0,0.5);
          transition: box-shadow 0.15s, color 0.15s;
        }

        .neu-btn:hover {
          color: #86efac;
          box-shadow:
            -3px -3px 10px 0px var(--shadow-light),
            5px 5px 18px 0px var(--shadow-dark);
        }
            button:active {
  box-shadow:
               inset 3px 3px 7px rgba(8,12,10,0.8),
            inset -3px -3px 7px rgba(45,80,65,0.5);
          transform: scale(0.97);
}

        .rip1, .rip2 {
          filter: blur(1px);
          width: 100%;
          position: absolute;
          height: 50px;
          left: 0;
          bottom: 0;
          border-radius: 12px;
          pointer-events: none;
        }

        .rip1 {
          box-shadow: 0.4rem 0.4rem 0.8rem var(--shadow-dark), -0.4rem -0.4rem 0.8rem var(--shadow-light);
          background: linear-gradient(to bottom right, var(--card-light) 0%, var(--card-dark) 100%);
        }

        .rip1.active {
          animation: waves 1s linear forwards;
        }

        .rip2.active {
          box-shadow: 0.4rem 0.4rem 0.8rem var(--shadow-dark), -0.4rem -0.4rem 0.8rem var(--shadow-light);
          animation: waves 1s linear 0.3s forwards;
        }

        @keyframes waves {
          0%   { transform: scale(0.7); opacity: 1; border-radius: 12px; }
          50%  { opacity: 1; border-radius: 16px; }
          100% { transform: scale(2.2); opacity: 0; border-radius: 20px; }
        }

        .neu-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .neu-links a {
          font-size: 0.78rem;
          color: var(--text-dim);
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.2s;
        }

        .neu-links a:hover {
          color: var(--green-accent);
        }

        .neu-error {
          font-size: 0.75rem;
          color: #f87171;
          text-align: center;
          padding-inline: 20px;
        }
      `}</style>

      <div className="neu-body">
        <form onSubmit={handleLogin} className="neu-card">
          <span className="neu-title">Sign in</span>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="neu-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="neu-input"
            required
          />

          {error && <p className="neu-error">{error}</p>}

          <div className="neu-btn-wrap">
            <button type="submit" className="neu-btn">Login</button>
            <span className={`rip1 ${rippling ? 'active' : ''}`}></span>
            <span className={`rip2 ${rippling ? 'active' : ''}`}></span>
          </div>

          <div className="neu-links">
            <Link href="/signup">Sign up</Link>
            <a>Forgot your password?</a>
          </div>
        </form>
      </div>
    </>
  )
}