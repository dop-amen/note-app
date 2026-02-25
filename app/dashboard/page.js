"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        fetchNotes(user.id);
      }
    };
    getUser();

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotes = async (userId) => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setNotes(data || []);
  };

  const handleDelete = async (id) => {
    await supabase.from("notes").delete().eq("id", id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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
        }

        .neu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 2rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .neu-page-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text);
          letter-spacing: 0.5px;
        }

        .neu-page-title span { color: var(--green-accent); }

        /* Extruded button */
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
          padding: 10px 22px;
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

        /* Profile avatar */
        .neu-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -3px -3px 8px 0px var(--shadow-light),
            3px 3px 8px 0px var(--shadow-dark);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.15s;
        }

        .neu-avatar:active {
          box-shadow:
            inset 2px 2px 5px rgba(8,12,10,0.8),
            inset -2px -2px 5px rgba(45,80,65,0.5);
        }

        /* Dropdown */
        .neu-dropdown {
          position: absolute;
          right: 0;
          margin-top: 10px;
          width: 220px;
          border-radius: 16px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -5px -5px 15px 0px var(--shadow-light),
            5px 5px 15px 0px var(--shadow-dark);
          padding: 8px;
          z-index: 50;
        }

        .neu-dropdown-email {
          font-size: 0.72rem;
          color: var(--text-dim);
          padding: 8px 12px;
          border-bottom: 1px solid rgba(45,80,65,0.3);
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .neu-logout {
          width: 100%;
          text-align: left;
          border: none;
          background: none;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.85rem;
          color: #f87171;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .neu-logout:hover { background: rgba(248,113,113,0.1); }

        /* Note cards */
        .neu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem 2rem;
        }

        .neu-card {
          border-radius: 20px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -5px -5px 15px 0px var(--shadow-light),
            5px 5px 15px 0px var(--shadow-dark);
          padding: 1.5rem;
          cursor: pointer;
          transition: box-shadow 0.2s;
        }

        .neu-card:hover {
          box-shadow:
            -7px -7px 20px 0px var(--shadow-light),
            7px 7px 20px 0px var(--shadow-dark);
        }

        .neu-card:active {
          box-shadow:
            inset 3px 3px 8px rgba(8,12,10,0.7),
            inset -3px -3px 8px rgba(45,80,65,0.4);
        }

        .neu-card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .neu-card:hover .neu-card-title { color: var(--green-accent); }

        .neu-card-content {
          font-size: 0.85rem;
          color: var(--text);
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }

        .neu-card-dates {
          font-size: 0.7rem;
          color: var(--text-dimmer);
          margin-bottom: 14px;
          line-height: 1.8;
        }

        .neu-card-actions {
          display: flex;
          gap: 10px;
          border-top: 1px solid rgba(45,80,65,0.25);
          padding-top: 14px;
        }

        .neu-action-btn {
          flex: 1;
          text-align: center;
          border: none;
          border-radius: 10px;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -3px -3px 7px 0px var(--shadow-light),
            3px 3px 7px 0px var(--shadow-dark);
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 8px;
          cursor: pointer;
          transition: box-shadow 0.15s;
          text-decoration: none;
          display: block;
        }

        .neu-action-btn.edit { color: var(--green-accent); }
        .neu-action-btn.delete { color: #f87171; }

        .neu-action-btn:active {
          box-shadow:
            inset 2px 2px 5px rgba(8,12,10,0.8),
            inset -2px -2px 5px rgba(45,80,65,0.5);
          transform: scale(0.97);
        }

        /* FAB */
        .neu-fab {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(145deg, var(--card-light), var(--card-dark));
          box-shadow:
            -4px -4px 10px 0px var(--shadow-light),
            4px 4px 10px 0px var(--shadow-dark);
          color: var(--green-accent);
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          z-index: 50;
          transition: box-shadow 0.15s;
        }

        .neu-fab:active {
          box-shadow:
            inset 3px 3px 7px rgba(8,12,10,0.8),
            inset -3px -3px 7px rgba(45,80,65,0.5);
        }

        .neu-empty {
          text-align: center;
          margin-top: 8rem;
          color: var(--text-dim);
        }

        .neu-empty p:first-child { font-size: 1.2rem; margin-bottom: 8px; }
        .neu-empty p:last-child { font-size: 0.9rem; color: var(--text-dimmer); }
        .neu-empty span { color: var(--green-accent); }
      `}</style>

      <div className="neu-page">
        <div className="neu-header">
          <h1 className="neu-page-title">My <span>Notes</span></h1>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link href="/notes/new" className="neu-btn" style={{ display: 'none' }}
              onMouseEnter={e => e.target.style.display = 'inline-block'}
            >+ New Note</Link>
            <Link href="/notes/new" className="neu-btn hidden md:inline-block">+ New Note</Link>

            <div style={{ position: 'relative' }} ref={profileRef}>
              <button className="neu-avatar" onClick={() => setProfileOpen(!profileOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 20, height: 20, color: 'var(--text)' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </button>
              {profileOpen && (
                <div className="neu-dropdown">
                  <p className="neu-dropdown-email">{user?.email}</p>
                  <button className="neu-logout" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="neu-empty">
            <p>No notes yet.</p>
            <p>Click <span>+ New Note</span> to get started!</p>
          </div>
        ) : (
          <div className="neu-grid">
            {notes.map((note) => (
              <div key={note.id} className="neu-card" onClick={() => router.push(`/notes/view/${note.id}`)}>
                <h2 className="neu-card-title">{note.title}</h2>
                <p className="neu-card-content">{note.content}</p>
                <div className="neu-card-dates">
                  <p>Created: {new Date(note.created_at).toLocaleString()}</p>
                  <p>Last edited: {new Date(note.updated_at).toLocaleString()}</p>
                </div>
                <div className="neu-card-actions" onClick={e => e.stopPropagation()}>
                  <Link href={`/notes/${note.id}`} className="neu-action-btn edit">Edit</Link>
                  <button onClick={() => handleDelete(note.id)} className="neu-action-btn delete">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link href="/notes/new" className="neu-fab md:hidden">+</Link>
      </div>
    </>
  );
}