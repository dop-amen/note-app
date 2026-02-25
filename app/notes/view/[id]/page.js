'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import Link from 'next/link'

export default function ViewNote({ params }) {
  const { id } = use(params)
  const [note, setNote] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchNote = async () => {
      const { data } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single()
      if (data) setNote(data)
    }
    fetchNote()
  }, [id])

  if (!note) return (
    <div className="neu-page" style={{ display: 'grid', placeItems: 'center' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;800&display=swap');
        :root {
          --bg: #1a2320;
          --card-light: #1f2b27;
          --card-dark: #141c19;
          --text-dim: #4a7060;
        }
        .neu-page { background: var(--bg); min-height: 100vh; font-family: 'Nunito Sans', sans-serif; }
      `}</style>
      <p style={{ color: 'var(--text-dim)' }}>Loading...</p>
    </div>
  )

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
          
          --text-dimmer: #2e4a3a;
          --green-accent: #4ade80;
        }

        .neu-page {
          background: var(--bg);
          min-height: 100vh;
          font-family: 'Nunito Sans', sans-serif;
          color: var(--text);
          padding: 2.5rem 1.5rem;
        }

        .neu-container {
          max-width: 680px;
          margin: 0 auto;
        }

        .neu-back {
          background: none;
          border: none;
          color: var(--text);
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          padding: 0;
        }

        .neu-back:hover { color: var(--text); }

        .neu-card {
          border-radius: 24px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -7px -7px 20px 0px var(--shadow-light),
            -4px -4px 5px 0px rgba(60,100,80,0.3),
            7px 7px 20px 0px var(--shadow-dark),
            4px 4px 5px 0px rgba(0,0,0,0.5);
          padding: 2rem;
        }

        .neu-note-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 8px;
          letter-spacing: 0.3px;
        }

        .neu-dates {
          font-size: 0.7rem;
          color: var(--text-dimmer);
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }

        .neu-content {
          font-size: 0.95rem;
          color: var(--text);
          line-height: 1.8;
          white-space: pre-wrap;
        }

        .neu-divider {
          border: none;
          border-top: 1px solid rgba(45,80,65,0.25);
          margin: 1.8rem 0 1.5rem;
        }

        .neu-btn {
          border: none;
          border-radius: 12px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -4px -4px 10px 0px var(--shadow-light),
            4px 4px 10px 0px var(--shadow-dark);
          color: var(--green-accent);
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          padding: 10px 24px;
          cursor: pointer;
          transition: box-shadow 0.15s, color 0.15s;
          text-decoration: none;
          display: inline-block;
        }

        .neu-btn:hover {
          color: #86efac;
          box-shadow: -2px -2px 6px 0px var(--shadow-light), 4px 4px 12px 0px var(--shadow-dark);
        }

        .neu-btn:active {
          box-shadow:
            inset 3px 3px 7px rgba(8,12,10,0.8),
            inset -3px -3px 7px rgba(45,80,65,0.5);
          transform: scale(0.97);
        }
      `}</style>

      <div className="neu-page">
        <div className="neu-container">
          <button className="neu-back" onClick={() => router.push('/dashboard')}>
            ← Back to dashboard
          </button>

          <div className="neu-card">
            <h1 className="neu-note-title">{note.title}</h1>
            <div className="neu-dates">
              <p>Created: {new Date(note.created_at).toLocaleString()}</p>
              <p>Last edited: {new Date(note.updated_at).toLocaleString()}</p>
            </div>
            <p className="neu-content">{note.content}</p>
            <hr className="neu-divider" />
            <Link href={`/notes/${note.id}`} className="neu-btn">Edit this note</Link>
          </div>
        </div>
      </div>
    </>
  )
}