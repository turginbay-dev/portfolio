# Bekzat Portfolio

Premium multilingual personal portfolio built with Vite, Tailwind CSS, and vanilla JavaScript.

## Purpose

This project is a frontend-only personal portfolio with a premium black + red visual identity.

It is designed to:

- showcase personal intro and developer positioning
- present stack and skills in a clean visual way
- highlight featured projects with gallery and video preview
- support Kazakh, Russian, and English from structured data
- stay easy to edit later without rewriting one giant HTML file

## Stack

- Vite
- Tailwind CSS
- Vanilla JavaScript
- Semantic HTML
- PostCSS + Autoprefixer

## Structure

```text
index.html
package.json
vite.config.js
tailwind.config.js
postcss.config.js

public/
  files/
  media/
    backgrounds/
    me/
    icons/
    logos/
    projects/

src/
  main.js
  style.css
  data/
  locales/
  components/
  sections/
  utils/
```

## How To Run

1. Install Node.js 18+.
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Build production bundle:

```bash
npm run build
```

5. Preview the production build:

```bash
npm run preview
```

## Media Placement

Use files from `public/` so they are available by direct public paths.

Current implementation expects:

- hero background: `/media/backgrounds/Bg-1.png`
- about background: `/media/backgrounds/Bg-2.png`
- projects background: `/media/backgrounds/Bg-3.png`
- contact/footer background: `/media/backgrounds/Bg-4.png`
- main profile image: `/media/me/me.png`

Project covers, screenshots, posters, and videos are read from:

- `/media/projects/naqusta/...`
- `/media/projects/qazsound/...`

CV and PDF links are read from:

- `/files/bekzat-cv-kz.pdf`
- `/files/bekzat-cv-ru.pdf`
- `/files/bekzat-cv-en.pdf`
- `/files/NaqUsta_README.pdf`
- `/files/qazsound-case-study.pdf`

If you rename assets, update the paths in:

- `src/data/profile.js`
- `src/data/projects.js`

## Updating Project Cards

Edit `src/data/projects.js`.

Each project is structured with:

- `id`
- `title`
- `type`
- `stack`
- `links`
- `description`
- `highlights`
- `media`

To update a project:

1. Replace `demo` and `github` links.
2. Update multilingual `description`.
3. Update `highlights`.
4. Replace cover, poster, screenshots, and video paths if needed.

## Changing Languages

Translations are stored in:

- `src/locales/kk.json`
- `src/locales/ru.json`
- `src/locales/en.json`

Shared profile/media configuration is stored in:

- `src/data/profile.js`
- `src/data/socials.js`
- `src/data/skills.js`
- `src/data/projects.js`

The language switcher reads one active locale source and rerenders the page, instead of hardcoding text separately across the HTML.

## Contact Data

Update your real contact links in:

- `src/data/socials.js`

Recommended manual updates:

- WhatsApp number
- email address
- Telegram username
- Instagram URL
- GitHub URL
- LinkedIn URL

## Deployment

You can deploy the built `dist/` output to:

- Vercel
- Netlify
- GitHub Pages
- any static hosting provider

Basic deployment flow:

```bash
npm run build
```

Then upload or publish the generated `dist/` folder.

## Notes

- The project is frontend-only.
- There is no backend, database, auth, or admin panel.
- Project cards, text, and media are modular and data-driven.
- If a media file is still empty or missing, the UI falls back gracefully instead of breaking the layout.
