# Get Ledgerly on your iPhone — click by click

No terminal needed. You'll host the app free on GitHub Pages, then add it to your Home Screen.
About 10 minutes.

---

## Before you start
Make sure these 5 files are in one folder on your computer:
- `Ledgerly.html`
- `index.html`
- `sw.js`
- `manifest.webmanifest`
- `icon.png`  ← **save your purple "L" logo as this exact name** (a square PNG)

(The `push-backend` folder is for notifications later — you do NOT upload it here.)

---

## Part A — Put it online (GitHub Pages)

**1. Make a new repository**
- Go to https://github.com/new
- **Repository name:** `ledgerly`
- Set it to **Public**
- Leave everything else unticked → click **Create repository**

**2. Upload your files**
- On the new repo page, click **“uploading an existing file”** (it's a link in the middle of the page)
- Drag all **5 files** into the box
- Scroll down → click **Commit changes**

**3. Turn on GitHub Pages**
- Click **Settings** (top of the repo) → **Pages** (left sidebar)
- Under **Source**, choose **Deploy from a branch**
- **Branch:** `main`, folder: `/ (root)` → click **Save**
- Wait ~1 minute. Refresh the page — it shows:
  > Your site is live at **https://YOURNAME.github.io/ledgerly/**

That link is your app. (It's secure HTTPS — required for the app and notifications to work.)

---

## Part B — Add it to your Home Screen (iPhone)

1. On your iPhone, open **Safari** (must be Safari, not Chrome)
2. Go to **https://YOURNAME.github.io/ledgerly/**
3. Tap the **Share** button (the square with an up-arrow)
4. Scroll down → tap **Add to Home Screen** → **Add**

You now have a Ledgerly icon. Open it — it runs fullscreen like a real app, and works offline.

---

## Part C — Later: turn on push notifications
Once the app is on your Home Screen, follow **push-backend/README.md** to set up the free
backend, paste your two keys into `Ledgerly.html`, re-upload it (see “Updating” below), then
open the app → **History → Enable push notifications**.

---

## Updating the app later
When you change a file (e.g. after pasting your push keys into `Ledgerly.html`):
1. Go to your repo on github.com → click the file → click the **pencil** ✏️ (or delete it and re-upload)
2. Paste/upload the new version → **Commit changes**
3. On your phone, open the app. It refreshes automatically within a moment. If you ever see an
   old version, close the app fully and reopen it.

> Tip: if a change really won't show, open `sw.js`, change `ledgerly-v1` to `ledgerly-v2`,
> and commit — that forces the offline cache to refresh.

---

## Quick troubleshooting
- **Bare link shows a 404** → wait another minute after enabling Pages; it can take a few minutes the first time.
- **No app icon / generic icon** → make sure `icon.png` was uploaded and is a square PNG.
- **“Add to Home Screen” missing** → you're not in Safari. Open the link in Safari.
- **Push won't enable** → push only works *after* Add to Home Screen (iOS 16.4+), and only once the backend is set up.
