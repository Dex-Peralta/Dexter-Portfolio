# Editing Guide

## Configure the Formspree contact form

The portfolio is configured to use this endpoint:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xaeodjaw
```

The active value is stored in `.env.local` in the project root. `.env.local` is ignored by Git because `.gitignore` contains `*.local`.

To change the endpoint later:

1. Open `.env.local`.
2. Replace the `VITE_FORMSPREE_ENDPOINT` value.
3. Restart the Vite development server.
4. Run `npm run build`.

The centralized frontend configuration is [src/config/contact.js](src/config/contact.js). It reads `VITE_FORMSPREE_ENDPOINT` before optionally using `VITE_FORMSPREE_FORM_ID`.

Do not add private API keys or secrets to Vite environment variables. The Formspree endpoint is a public form identifier.

In Formspree, confirm that the form's receiving email is `2301107739@student.buksu.edu.ph` and complete email verification if Formspree requests it.

The form sends `name`, `email`, `subject`, `message`, `_replyto`, `_subject`, and `_gotcha`. `_replyto` lets the receiving email reply to the visitor.

## Local testing

1. Restart `npm run dev` after editing `.env.local` by stopping the server and running `npm run dev` again.
2. Open the local site and navigate to Contact.
3. Submit one real test message only when you are ready, using valid test values.
4. Confirm the button changes to `SENDING...`, then `MESSAGE SENT`.
5. Confirm the status changes to `MESSAGE SENT SUCCESSFULLY!` only after Formspree accepts the request.
6. Check the Formspree submissions dashboard and receiving email inbox.
6. Test invalid fields, the copy button, and the browser's responsive layouts.

Formspree spam filtering and the honeypot field (`_gotcha`) are enabled by the integration. Keep Formspree spam protection enabled in the dashboard when available.

## Troubleshooting submission errors

- `The contact form is not configured yet`: `.env.local` was not loaded or the server was not restarted. Add `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xaeodjaw`, restart Vite, and rebuild.
- `Your message could not be sent`: check the internet connection, browser console, Formspree dashboard, and endpoint. The entered form values remain visible so the visitor can retry.
- No email arrives after a successful acceptance: verify the receiving email in Formspree and check spam/junk folders.
- A submission is blocked: review the Formspree spam settings and honeypot configuration.
- Browser CORS or network errors: confirm the exact endpoint and deploy the latest build.

## Deployment

Add `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xaeodjaw` to the hosting provider's environment-variable settings:

- **Vercel:** Project Settings → Environment Variables → add `VITE_FORMSPREE_ENDPOINT` for Production and other required environments.
- **Netlify:** Site configuration → Environment variables → add `VITE_FORMSPREE_ENDPOINT`.

Then rebuild and redeploy:

```powershell
npm run build
```

Client-side Formspree form IDs and endpoints are public. Never place private credentials in this project. Verify one real submission after deployment and confirm email notifications and Formspree dashboard entries before announcing that the form is live.
