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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-green-700 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition-all">
          ← Back to dashboard
        </button>
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">{note.title}</h1>
          <div className="text-xs text-gray-600 mb-6">
            <p>Created: {new Date(note.created_at).toLocaleString()}</p>
            <p>Last edited: {new Date(note.updated_at).toLocaleString()}</p>
          </div>
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{note.content}</p>
          <div className="mt-8 border-t border-white/10 pt-6">
            <Link href={`/notes/${note.id}`} className="bg-green-500/10 hover:bg-green-500/30 text-green-400 text-sm font-medium px-5 py-2 rounded-lg transition-all duration-200">
              Edit this note
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}