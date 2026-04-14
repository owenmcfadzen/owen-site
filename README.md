# owen-site

Personal site — Charter, Inter, Astro. Plain surface, deep structure.

## Stack

- **Astro** — static site generation with islands architecture
- **Charter** — serif, for reading (body text, ledes, headings)
- **Inter** — sans, for navigation (UI, labels, subtitles)
- **JetBrains Mono** — monospace, for data (footnotes, code, dates)
- **Netlify** — auto-deploy from `main`

## Design System

Three type sizes (21.5, 18.5, 14). Three spacing values (56, 32, 22). Three color tiers (body, muted, faint). Column width computed from font metrics via canvas `measureText()`.

## Development

```
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```
