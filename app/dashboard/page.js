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
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-green-700 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white">
            My <span className="text-green-400">Notes</span>
          </h1>
          <div className="flex gap-3 items-center">
            <Link href="/notes/new" className="hidden md:block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-200">
  + New Note
</Link>
<Link href="/notes/new" className="md:hidden fixed bottom-6 right-6 z-50 bg-green-500/30 hover:bg-green-500/40 text-green-400 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-200">
  +
</Link>
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 backdrop-blur-md bg-gray-900/90 border border-white/10 rounded-xl shadow-2xl p-2 z-50">
                  <p className="text-gray-400 text-xs px-3 py-2 border-b border-white/10 truncate">
                    {user?.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-400 hover:text-white hover:bg-red-500/20 px-3 py-2 rounded-lg text-sm transition-all duration-200 mt-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes.length === 0 ? (
          <div className="text-center mt-32">
            <p className="text-gray-500 text-xl">No notes yet.</p>
            <p className="text-gray-600 mt-2">
              Click <span className="text-green-400">+ New Note</span> to get
              started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div key={note.id} onClick={() => router.push(`/notes/view/${note.id}`)} className="cursor-pointer backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:border-green-400/50 hover:bg-white/10 transition-all duration-200">
                
  <h2 className="text-3xl font-bold text-white mb-2 hover:text-green-400 transition-all">{note.title}</h2>
  <p className="text-[#cbd5e7] mb-4 line-clamp-3">{note.content}</p>

                <div className="text-xs text-gray-600 mb-4">
                  <p>Created: {new Date(note.created_at).toLocaleString()}</p>
                  <p>
                    Last edited: {new Date(note.updated_at).toLocaleString()}
                  </p>
                </div>
                <div onClick={e => e.stopPropagation()} className="flex gap-3 border-t border-white/10 pt-4">
                  <Link
                    href={`/notes/${note.id}`}
                    className="flex-1 text-center bg-green-500/10 hover:bg-green-500/30 text-green-400 text-sm font-medium py-2 rounded-lg transition-all duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="flex-1 text-center bg-red-500/10 hover:bg-red-500/30 text-red-400 text-sm font-medium py-2 rounded-lg transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
