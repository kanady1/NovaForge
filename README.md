# NovaForge — AI Builder (Multilingual) 🚀

**Features**
- EN/AR/HE UI (default EN)
- OpenAI generation -> live preview
- One-click Publish to GitHub + trigger Vercel deploy
- Plans page with NOWPayments / RedotPay provider abstraction
- Admin dashboard (password via `ADMIN_PASSWORD`) to manage plans
- Tailwind UI styled similar to v0 (dark, soft rounded, accent purple)

## ENV (Vercel → Settings → Environment Variables)
- OPENAI_API_KEY=sk-...
- ADMIN_PASSWORD=choose-strong-password
- GITHUB_TOKEN=ghp_... (repo access)
- GITHUB_OWNER=YourUserOrOrg
- GITHUB_REPO=target-repo
- GITHUB_BRANCH=main
- SITE_DIR= (e.g. `site` or leave empty)
- VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/prj_xxx/xxx
- NOWPAY_CALLBACK_URL=https://yourdomain.com/thanks/nowpayments
- REDOTPAY_CALLBACK_URL=https://yourdomain.com/thanks/redotpay

## Run local
```
npm install
npm run dev
```

## Deploy
1) Push to GitHub
2) Import into Vercel
3) Add ENV above
4) Deploy

## Notes
- Payments are stubbed: they return a redirect URL placeholder. Replace `lib/payments.js` with real provider calls when your merchant accounts are ready.
- For persistent Plans/storage use a DB (Supabase). This demo keeps in-memory data for simplicity.
