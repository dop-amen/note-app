# NoteVault 🗒️

A clean, modern note-taking web app where anyone can sign up and manage their personal notes.

🔗 **Live Demo:** [note-app-tau-tawny.vercel.app](https://note-app-tau-tawny.vercel.app)

---

## Screenshots

> Add a screenshot of your app here

---

## Features

- 🔐 User authentication (sign up, login, logout)
- 📝 Create, read, update and delete notes
- 🔒 Each user can only see and edit their own notes
- 🕒 Timestamps showing when a note was created and last edited
- 📱 Fully responsive — works on mobile and desktop
- ⚡ Deployed on Vercel for fast global access

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Frontend framework |
| Tailwind CSS v4 | Styling |
| Supabase | Database & Authentication |
| Vercel | Hosting & Deployment |

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/dop-amen/note-app.git
cd note-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Setup

This project uses Supabase. Create a `notes` table with the following columns:

| Column | Type |
|--------|------|
| id | uuid (primary key) |
| user_id | uuid |
| title | text |
| content | text |
| created_at | timestamptz |
| updated_at | timestamptz |

Enable **Row Level Security (RLS)** and add policies so users can only access their own notes.

---

## License

This project is open source and available under the [MIT License](LICENSE).
