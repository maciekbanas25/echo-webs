# EchoWebs

Marketing site for **EchoWebs** — professional web design for small businesses.
Live at **[echowebs.co.uk](https://echowebs.co.uk)**.

## Tech stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS 3** + **shadcn/ui**
- **Supabase** — database + edge functions (reviews & quote requests)
- **Resend** — transactional email (quote notifications & confirmations)
- **Vercel** — hosting (auto-deploys from `main`)

## Local development

```sh
npm install
npm run dev      # start the dev server
npm run build    # production build
npx tsc --noEmit # type-check
```

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase values:

```
VITE_SUPABASE_PROJECT_ID="..."
VITE_SUPABASE_PUBLISHABLE_KEY="..."
VITE_SUPABASE_URL="https://<project>.supabase.co"
```

## Deployment

Pushing to `main` auto-deploys to Vercel. Supabase edge functions in
`supabase/functions/` are deployed via the Supabase dashboard. Database schema
lives in `supabase/migrations/`.
