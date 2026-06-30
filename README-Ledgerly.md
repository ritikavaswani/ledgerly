# Ledgerly — setup guide

## Files
- **Ledgerly.html** — the app (open this one)
- **sw.js** — makes it work offline once opened
- **manifest.webmanifest** — name/icon/colors when installed
- **icon.png** — your app icon (add a 512×512 PNG named `icon.png` here)

Keep all four files together in the same folder.

## Put it on your iPhone (free, no App Store)

1. Go to **app.netlify.com/drop** in any browser.
2. Drag the folder containing these files onto the page. You get a URL like `your-app.netlify.app`.
3. On your iPhone, open that URL in **Safari**.
4. Open `Ledgerly.html` (e.g. `your-app.netlify.app/Ledgerly.html`).
5. Tap **Share → Add to Home Screen**.

It now launches fullscreen with its own icon and works offline.

## Getting reminders (no account needed)

The reliable way: add your due dates to your **iPhone Calendar**.
- On any subscription, tap **📅 Remind** (or **History → Add all to Calendar**).
- iOS Calendar opens — tap **Add**. You get a recurring event that alerts you the day before and on the due date, even when Ledgerly is closed.

The **🔔 In-app alerts** button is a bonus: when you open the app it flags anything due. (iOS only shows these once the app is Added to Home Screen.) Calendar reminders are the dependable ones.

## What's new in this version
- **Import backup** (you could only export before) — History tab
- **Backup reminder banner** if it's been 14+ days
- **Due/overdue reminders** via notifications
- **Dark mode** (🌙 button, top-right) — follows your phone's setting
- **Works offline** (service worker)
- **Friendly welcome screen** instead of demo data on first run
- Esc closes the add/edit dialog; accessibility labels; focus styles

## Important about your data
Everything is stored **on the device only** (browser localStorage). Use **Export backup** regularly. If you ever clear Safari website data or switch phones, import your backup to restore.
