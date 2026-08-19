# Attention–Identity Strategy Finder
### Peak Exposure Media — Interactive lead-gen questionnaire

A single-page, no-build website that walks a visitor through your A/B decision
tree and shows them a personalized Attention/Identity strategy split. When
someone submits the "Build My Strategy" form at the end, their name, company,
email, result, and full answer path are emailed straight to
**Cameron@peakexposuremedia.com**.

It's plain HTML/CSS/JS — no build step, no framework — so it runs directly on
GitHub Pages.

---

## 1. Files

```
index.html      → page structure
styles.css       → all styling (PEM navy/gold palette, Bebas Neue + Montserrat)
script.js        → question tree, navigation logic, form submission
assets/          → logo files pulled from your brand guidelines
```

## 2. Connect the lead form to your email (Formspree — 5 minutes)

Since this is a static site with no server, we use **Formspree** (free tier)
to forward form submissions to your inbox. No password sharing, no backend to
maintain.

1. Go to **[formspree.io](https://formspree.io)** and create a free account.
2. Click **New Form**, name it something like "PEM Strategy Finder Leads."
3. Set the notification email to **Cameron@peakexposuremedia.com** and verify
   it (Formspree will email a confirmation link — click it).
4. Copy the form endpoint it gives you. It looks like:
   `https://formspree.io/f/abc1234`
5. Open **`script.js`** and near the top, replace:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   with your real endpoint.
6. Commit and push. Done — submissions now land in your inbox and in your
   Formspree dashboard (which also gives you a spreadsheet-style export of
   every lead, including their full question/answer path and result).

**Free tier** covers 50 submissions/month, which is usually plenty to start.
If you outgrow it, Formspree's paid tiers raise that limit — no code changes
needed.

> Alternative: if you'd rather use EmailJS, Basin, or your own backend, just
> swap the `fetch()` call in the `leadForm` submit handler in `script.js` —
> everything else on the page stays the same.

## 3. Host it on GitHub Pages

1. Create a new GitHub repository (e.g. `pem-strategy-finder`).
2. Add all the files in this folder to the repo (keep the `assets/` folder
   structure intact).
3. Push to GitHub.
4. In the repo, go to **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
6. GitHub will give you a live URL, typically:
   `https://yourusername.github.io/pem-strategy-finder/`
7. (Optional) Add a custom domain under the same Pages settings if you want
   it at something like `strategy.peakexposuremedia.com`.

That URL is what you'll link to from ads, your website, email signatures,
etc. — that's the "button" your prospects click to take the survey.

## 4. What data gets captured

When someone completes the quiz **and submits the contact form**, Formspree
receives:

- Name, Company, Email
- Final strategy (e.g. "Attention Led — 60/40")
- Attention % / Identity %
- Every question shown and the answer they picked, in order
- Date completed

Because this is a static site, responses **aren't stored anywhere** unless
someone submits the form — there's no database. If down the road you want to
log every completed quiz (not just the ones that convert to leads) for your
own analysis, that needs a lightweight backend or a tool like Google
Sheets + Zapier/SheetDB sitting behind the same `fetch()` call. Happy to wire
that up if useful — just flag it.

## 5. Customizing

- **Colors/fonts** — all in `styles.css`, using CSS variables at the top of
  the file (`--navy`, `--gold`, etc.), sampled directly from your logo files.
- **Question copy / branching logic** — all in `script.js`, in the
  `QUESTIONS` and `RESULTS` objects. Each question option has a `next` field
  pointing to the next question ID (or a `RESULT_#` key).
- **Logo** — currently using the gold full logo (`assets/pem-logo-gold.png`)
  on the dark navy background. Swap in `pem-logo-white.png` if you'd prefer.

## 6. Local preview

No install needed — just open `index.html` in a browser. For a closer-to-
production preview (some browsers restrict local file access), run a tiny
local server from this folder:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.
