# Rylee's Journal

A personal interactive journal for Rylee to share her thoughts, feelings, and weekly adventures with her dad.

## How It Works

1. **Rylee shares her thoughts** in our chat
2. **I (AI) update** `src/data/entries.json` with her new entry
3. **We deploy** to Vercel
4. **Dad visits the URL** to read her latest updates

## Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/) (v18 or later)

### Install & Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Next.js — just click Deploy
4. Share the URL with Dad!

## Adding a New Entry

Tell me (the AI) what Rylee wants to say, and I'll update `src/data/entries.json` with:
- Date
- Mood (happy, excited, calm, sad, angry, confused, grateful, tired)
- Title
- Body text
- Optional highlights

Then we redeploy to Vercel.
