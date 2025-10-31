# NovaForge Studio (Lovable-style)

- Dark UI (black / white) like your screenshots.
- Home page with a black chat composer (Attach / Public / Supabase / Mic / Arrow button).
- Projects grid under the composer.
- Builder workspace: top toolbar (Preview / Share / Sync / Publish), left chat + updates, right live preview, fixed bottom input with up arrow.
- Local versioning to restore previous snapshots (kept in localStorage).
- All logic is client-side; you can later wire the Publish button to GitHub/Vercel APIs.

## Run locally
npm i
npm run dev

## Deploy to Vercel
- Push this folder to GitHub and import.
- Framework: Next.js. Build: `npm run build`. Output: `.next`
