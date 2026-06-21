# AlphaScreen.pro | Deployment & Setup Guide

## 🚀 Going Live on Vercel
AlphaScreen is built with Next.js 14 and is optimized for Vercel deployment.

### 1. Supabase Setup
1. Go to [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project.
3. Open the **SQL Editor** and paste the contents of `supabase_schema.sql`.
4. Go to **Project Settings > API** and copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

### 2. Environment Variables
Rename `.env.example` to `.env.local` and fill in your keys:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `FAL_KEY` (For FLUX.1 and Kling AI rendering)
- `ELEVENLABS_API_KEY` (For Voice Synthesis)

### 3. GitHub Push
```bash
git init
git add .
git commit -m "Initial Production Build of AlphaScreen"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 4. Vercel Deployment
1. Connect your GitHub repo to Vercel.
2. In the Vercel dashboard, add the environment variables from step 2.
3. Set the domain to **alphascreen.pro**.
4. Deploy.

## 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion.
- **Backend**: Next.js API Routes, Supabase (PostgreSQL).
- **AI Orchestration**: Fal.ai (Flux/Kling), ElevenLabs (Voice).
- **Video Processing**: FFmpeg (Cloud).
