'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function NewNote() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('notes').insert({
      title,
      content,
      user_id: user.id
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-green-700 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <button onClick={() => router.push('/dashboard')} className="font-bold text-3xl text-gray-300 hover:text-white mb-8 flex items-center gap-2 transition-all">
          ← Back to dashboard
        </button>
        <h1 className="text-4xl font-bold text-white mb-8">New <span className="text-green-400">Note</span></h1>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}
              className="bg-white/10 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl focus:outline-none focus:border-green-500 transition-all text-xl" required />
            <textarea placeholder="Write your note here..." value={content} onChange={e => setContent(e.target.value)}
              className="bg-white/10 border border-white/10 text-white placeholder-gray-500 p-3 rounded-xl focus:outline-none focus:border-green-500 transition-all h-64 resize-none" required />
            <div className="flex gap-4 mt-2">
              <button type="submit" className="bg-green-500/10 hover:bg-green-500/30 text-green-400 px-8 py-3 rounded-xl font-semibold transition-all duration-200">
  Save Note
</button>
              <button type="button" onClick={() => router.push('/dashboard')} className="border border-white/10 text-gray-400 hover:text-white px-8 py-3 rounded-xl transition-all duration-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}