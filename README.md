# Krishna Tiwari — personal website

This is a simple professional website to replace the Bold.pro / Zety public profile. It is a static site: there is no build step. You can host the folder as-is on GitHub Pages, Netlify, or any web host.

The page is built from one data file, so you can update your details later without touching the design.

## The file you edit

**Edit `content/profile.js`.** That is the only file you need to change for name, headline, summary, links, jobs, skills, education, and certifications.

`content/profile.json` is a copy of the same data, useful if you want a plain JSON file. The public page reads `profile.js`, not the JSON file. If you change one, update the other (the editor in `admin.html` can download both).

## How to edit details on GitHub

1. Open the repository and go to `content/profile.js`.
2. Click the pencil icon (Edit).
3. Change only the text inside the quotes, for example `"Singapore"`.
4. Leave commas, brackets `[ ]` and braces `{ }` as they are.
5. Use straight quotes `" "`, not curly quotes `“ ”`.
6. If a sentence itself contains a quote, write it as `\"`.
7. Click **Commit changes**.

If the site is published with GitHub Pages, the live page usually updates in about a minute.

Please do not add a phone number or a home street address to this file. City (Singapore) is enough.

## How to swap the resume PDF

1. Export or copy your latest resume as a PDF.
2. Replace `assets/Krishna_Tiwari_Resume.pdf` with the new file, keeping that exact file name.
3. Commit the new PDF.

The **Download resume** button already points at that path, so you do not need to edit the data file unless you choose a new file name. If you do rename it, update the `resume` path under `contact` in `content/profile.js`.

## How to use the browser editor (`admin.html`)

This is optional. It gives you a form, a full JSON editor, and a live preview, then lets you download an updated data file. Nothing is saved on a server.

1. Open the site in a browser. The most reliable way is to run a small local server in this folder:

   `python3 -m http.server 8000`

   Then visit `http://localhost:8000/admin.html`.

   You can also open `admin.html` directly from the folder (`file://`). That usually works because the data is in `profile.js`.

2. Edit the quick fields at the top (name, headline, email, links, summary) or the full JSON below them (jobs, skills, and so on).
3. Check the live preview on the right. The status should say **Valid**. If it shows a JSON error, fix the quotes or commas first.
4. Click **Download profile.js**.
5. Replace `content/profile.js` in your project or GitHub repo with the downloaded file.
6. Optionally also download `profile.json` and replace `content/profile.json` so the two files stay in sync.

## What is in this folder

- `index.html` — the public page
- `styles.css` — the design
- `script.js` — turns the data file into the page
- `content/profile.js` — **your details** (edit this)
- `content/profile.json` — the same details as plain JSON
- `admin.html` — optional editor with live preview
- `assets/Krishna_Tiwari_Resume.pdf` — resume attached to the download button
- `assets/favicon.svg` — the KT icon in the browser tab

## How to publish later (when you are ready)

Do not publish until you have chosen a host. A typical GitHub Pages setup is:

1. Create a GitHub repository and upload this folder.
2. In the repository Settings, open Pages.
3. Set the source to the `main` branch and the `/` (root) folder.
4. After a minute, GitHub will give you a URL such as `https://your-username.github.io/your-repo-name/`.

If you later have your own domain, add it in the Pages settings, and put that address in the `"url"` field under `"site"` in `content/profile.js` so search-result links can point at the right place.

## Viewing the site on your computer

In this folder, run:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000/` for the public page, or `http://localhost:8000/admin.html` for the editor.
