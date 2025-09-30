/*
  Entry file for React + Vite + Laravel.
  Save this as: resources/js/app.jsx

  Also ensure these in your project:
  1) package.json scripts:
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "serve": "vite preview"
     }

  2) vite.config.js (example):
     import { defineConfig } from 'vite'
     import laravel from 'laravel-vite-plugin'
     import react from '@vitejs/plugin-react'

     export default defineConfig({
       plugins: [
         laravel({
           input: 'resources/js/app.jsx',
           refresh: true,
         }),
         react(),
       ],
       build: {
         outDir: 'public/build',
         manifest: true,
       },
     })

  After saving, from your project root run:
    npm install
    npm run dev   # for development (hot reload)
  OR
    npm run build # to create public/build/manifest.json for production
*/

import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'

function StudentForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/students', { name, email })
      setMessage('Saved: ' + (res.data?.id ?? JSON.stringify(res.data)))
      setName('')
      setEmail('')
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || 'Unknown error'
      console.error('Error:', err)
      setMessage('Error: ' + errMsg)
    }
  }

  return (
    <div style={{maxWidth: 480, margin: '0 auto', padding: 12}}>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: 8}}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            required
            style={{width: '100%', padding: 8}}
          />
        </div>
        <div style={{marginBottom: 8}}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{width: '100%', padding: 8}}
          />
        </div>
        <button type="submit" style={{padding: '8px 12px'}}>Save Student</button>
      </form>

      {message && <p style={{marginTop: 12}}>{message}</p>}
    </div>
  )
}

// Mount the React app into the blade template's <div id="app"></div>
const el = document.getElementById('app')
if (el) {
  const root = createRoot(el)
  root.render(<StudentForm />)
}

// Exporting not strictly necessary for the entry file, but keep for tests/imports
export default StudentForm
