# Ledgerly push backend — setup (one time, ~15 min)

This is the small free service that sends you a real notification when a subscription
is due, **even when Ledgerly is closed**. It runs on Cloudflare Workers.

You only do this once. After it's live, you paste two values into the app and you're done.

---

## What you need
- A free **Cloudflare account** → https://dash.cloudflare.com/sign-up
- **Node.js** installed on your computer → https://nodejs.org (the "LTS" download)
- A terminal (Mac: the **Terminal** app)

---

## Step 1 — Open this folder in a terminal
```
cd path/to/push-backend
npm install
```
(`npm install` downloads the tools. It may take a minute.)

## Step 2 — Log in to Cloudflare
```
npx wrangler login
```
A browser window opens — click **Allow**.

## Step 3 — Create the storage (KV)
```
npx wrangler kv namespace create LEDGERLY_KV
```
It prints something like:
```
id = "abc123def456..."
```
Copy that `id` and paste it into **wrangler.toml**, replacing `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.

## Step 4 — Generate your VAPID keys
These are the security keys that let only your backend send you notifications.
```
npm run vapid
```
It prints a **Public Key** and a **Private Key**. Keep this window open — you'll use both.

## Step 5 — Store the keys as secrets
Run each line; paste the matching value when prompted:
```
npx wrangler secret put VAPID_PUBLIC_KEY
npx wrangler secret put VAPID_PRIVATE_KEY
npx wrangler secret put VAPID_SUBJECT
```
- `VAPID_PUBLIC_KEY` → the Public Key from step 4
- `VAPID_PRIVATE_KEY` → the Private Key from step 4
- `VAPID_SUBJECT` → `mailto:youremail@example.com` (your real email)

## Step 6 — Deploy
```
npm run deploy
```
At the end it prints your live URL, e.g.:
```
https://ledgerly-push.yourname.workers.dev
```
Copy that URL. Test it works by opening `https://ledgerly-push.yourname.workers.dev/health`
in a browser — you should see `{"ok":true,...}`.

## Step 7 — Connect the app
Open **Ledgerly.html**, find this near the top of the `<script>`:
```js
const PUSH_CONFIG = {
  backendUrl: "",
  vapidPublicKey: ""
};
```
Fill them in:
- `backendUrl` → your Worker URL from step 6
- `vapidPublicKey` → the **Public Key** from step 4

Re-upload Ledgerly.html to your host.

## Step 8 — Turn it on (on your iPhone)
1. Make sure Ledgerly is **Added to your Home Screen** (push only works in the installed app on iOS 16.4+).
2. Open it from the Home Screen → **History → Enable push notifications** → Allow.

That's it. Each morning the backend checks your due dates and notifies you of anything due or overdue.

---

## Good to know
- **Cost:** Cloudflare's free tier is far more than this needs (it sends a handful of pushes a day).
- **Timezone / time:** It runs daily at 20:00 UTC (~8–9am NZ). Change `crons` in `wrangler.toml` and `npm run deploy` again to adjust.
- **Privacy:** The backend stores only what it needs to remind you — your push subscription and each
  active subscription's name, amount, and due date. No payment history, no logins.
- **It stays in sync:** whenever you add/pay/change a subscription in the app (while online), it quietly
  updates the backend, so reminders always reflect reality.
- **If a push fails to arrive:** check `/health` works, that you enabled it from the Home-Screen app (not Safari),
  and that the Public Key in the app exactly matches the one in your secrets.
