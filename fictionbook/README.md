# FictionBook

A responsive entertainment library built with React, Vite, and plain CSS. It includes original fictional sample titles across seven media types, local demo accounts, library lists, progress tracking, ratings, spoiler-aware reviews, profiles, community posts and friend requests, and a customizable theme studio with a Rainbow Pride theme.

## Setup

Requires Node.js 18+ and npm.

1. Open `.env.local` in the project root and replace `PASTE_YOUR_TMDB_API_KEY_HERE` with your TMDB v3 API key. If you have the longer Read Access Token, follow the instructions in `TMDB_KEY.txt` instead.
2. Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173). If you edit `.env.local` while Vite is running, stop and restart the server.

### TMDB integration

- The Home page fetches popular movies from TMDB and uses the live results in the movie catalogue.
- Global search includes TMDB movie results alongside local titles in other categories.
- Movie cards and detail dialogs display TMDB poster artwork, synopsis, release year, genre names, and ratings.
- If TMDB is unavailable or no key is configured, the app falls back to the included fictional sample catalogue and shows a gentle notice.
- Credentials are read from `.env.local`; Vite's `VITE_` variables are exposed to browser code. This is for a local demo only. Do not commit or share a real credential.
- TMDB data and poster images are provided by The Movie Database. FictionBook is not endorsed or certified by TMDB.

Open the local URL printed by Vite (usually http://localhost:5173).

Build and preview:

```bash
npm run build
npm run preview
```

## API credential file

`TMDB_KEY.txt` explains where to paste your credential. Vite does **not** automatically load variables from `.txt`, so enter the key in `.env.local` in the project root. The `.env.local` file is included with a placeholder value for convenience.

## Structure

```text
fictionbook/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── lib.js
    ├── components/       # Reserved for extracted reusable components
    ├── pages/            # Reserved for extracted route pages
    ├── data/titles.js
    ├── hooks/useAppState.js
    └── styles/
        ├── index.css
        └── app.css
```

## Features

- Five-step registration: account, about you, optional identity, taste profile, review and terms/privacy acceptance.
- Password confirmation, show/hide toggle, strength meter, age 13+ check, unique username/email checks, remember me, demo recovery page.
- Passwords are PBKDF2/SHA-256 hashed with per-account random salts via Web Crypto before being stored. This is still **not production authentication**: account records and password hashes live in localStorage. Do not use a real password.
- Responsive top navigation, global live search, category browsing, filters, sorting, pagination, detail modal, “more like this”, recently viewed, recommendations and “Surprise me”.
- 56 original invented sample titles: 8 each for Movies, TV Shows, Anime, Games, Books, Light Novels and Manga. Cover art is generated CSS placeholder artwork, not copyrighted posters.
- Unified library lists: Currently consuming, Plan to consume, Completed, On hold, Dropped and Favourites; progress slider, type filter, sort and stats.
- 1–5 star ratings, reviews with title/text/rating/date and spoiler reveal controls, delete own reviews.
- Profile page with avatar upload, bio, pronouns, gender, member-since, recently added titles, reviews, ratings, favourites, posts and library stats.
- Profile privacy setting, JSON data export, clear activity data, account deletion confirmation.
- Theme studio with hue/saturation wheel, brightness slider, HEX validation, pink/purple/red/blue/green/orange/teal presets, Rainbow Pride gradients, light base toggle, reset-to-pink, persistence and reduced-motion handling.
- Community posts, likes, local demo friend requests, onboarding tour, toast messages and keyboard focus indicators.

## Storage / backend migration

The app persists one versioned object named `fictionbook-v1` in localStorage. `src/lib.js` contains storage and hashing helpers; `src/hooks/useAppState.js` centralizes persistence. These can be replaced with an API/repository layer later.

## Known limitations

- This is a local prototype, not a production social network. Accounts, posts, reviews, friend requests and lists do not sync across browsers/devices. Friend requests work only between demo accounts in the same browser.
- Demo recovery does not send email. There is no server-side authorization, email verification, real password recovery, rate limiting, moderation, or remote database.
- “Community” title scores are sample metadata; they are not computed from a server-wide community.
- The registration birth date is a local age gate, not legal age verification.
- Profile review editing is not implemented as a separate edit flow; reviews can be posted and deleted.
- `components/` and `pages/` are present for future extraction. The current prototype keeps route/page composition in `src/App.jsx` to make the demo easy to run.
