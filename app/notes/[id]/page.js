'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { use } from 'react'

export default function EditNote({ params }) {
  const { id } = use(params)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchNote = async () => {
      const { data } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single()
      if (data) {
        setTitle(data.title)
        setContent(data.content)
      }
    }
    fetchNote()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', id)
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

        .neu-container { max-width: 680px; margin: 0 auto; }

        .neu-back {
          background: none; border: none;
          color: var(--text);
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.9rem; cursor: pointer;
          margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 6px;
          transition: color 0.2s; padding: 0;
        }
        .neu-back:hover { color: var(--text); }

        .neu-page-title {
          font-size: 2rem; font-weight: 800;
          color: var(--text); margin-bottom: 1.5rem; letter-spacing: 0.3px;
        }
        .neu-page-title span { color: var(--green-accent); }

        .neu-card {
          border-radius: 24px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -7px -7px 20px 0px var(--shadow-light),
            -4px -4px 5px 0px rgba(60,100,80,0.3),
            7px 7px 20px 0px var(--shadow-dark),
            4px 4px 5px 0px rgba(0,0,0,0.5);
          padding: 2rem;
          display: flex; flex-direction: column; gap: 1.2rem;
        }

        .neu-input, .neu-textarea {
          border: none; border-radius: 12px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          outline: none;
          font-family: 'Nunito Sans', sans-serif;
          color: var(--text);
          padding: 14px 20px; font-size: 0.95rem;
          box-shadow:
            inset 3px 3px 7px rgba(8,12,10,0.8),
            inset -3px -3px 7px rgba(45,80,65,0.5);
          transition: box-shadow 0.3s ease;
          width: 100%; box-sizing: border-box;
        }

        .neu-input { font-size: 1.1rem; font-weight: 700; }
        .neu-textarea { height: 220px; resize: none; line-height: 1.7; }
        .neu-input::placeholder, .neu-textarea::placeholder { color: var(--text-dimmer); }

        .neu-input:focus, .neu-textarea:focus {
          box-shadow:
            -4px -4px 10px 0px var(--shadow-light),
            4px 4px 10px 0px var(--shadow-dark);
        }

        .neu-actions { display: flex; gap: 12px; margin-top: 4px; }

        .neu-btn {
          border: none; border-radius: 12px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -4px -4px 10px 0px var(--shadow-light),
            4px 4px 10px 0px var(--shadow-dark);
          color: var(--green-accent);
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800; font-size: 0.95rem; letter-spacing: 0.5px;
          padding: 12px 28px; cursor: pointer;
          transition: box-shadow 0.15s, color 0.15s;
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

        .neu-btn-ghost {
          border: none; border-radius: 12px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            inset 3px 3px 7px rgba(8,12,10,0.8),
            inset -3px -3px 7px rgba(45,80,65,0.5);
          color: var(--text-dim);
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800; font-size: 0.95rem;
          padding: 12px 28px; cursor: pointer; transition: color 0.2s;
        }
        .neu-btn-ghost:hover { color: var(--text); }
        .neu-btn-ghost:active {
          box-shadow:
            -4px -4px 10px 0px var(--shadow-light),
            4px 4px 10px 0px var(--shadow-dark);
        }

        .neu-error { font-size: 0.78rem; color: #f87171; }
      `}</style>

      <div className="neu-page">
        <div className="neu-container">
          <button className="neu-back" onClick={() => router.push('/dashboard')}>
            ← Back to dashboard
          </button>
          <h1 className="neu-page-title">Edit <span>Note</span></h1>
          {error && <p className="neu-error" style={{ marginBottom: '1rem' }}>{error}</p>}
          <form onSubmit={handleUpdate} className="neu-card">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="neu-input"
              required
            />
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="neu-textarea"
              required
            />
            <div className="neu-actions">
              <button type="submit" className="neu-btn">Update Note</button>
              <button type="button" className="neu-btn-ghost" onClick={() => router.push('/dashboard')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}