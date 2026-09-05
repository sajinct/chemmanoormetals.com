# Chemmanoor Metals

A modern, responsive rebuild using plain HTML, CSS and JavaScript. No framework, database or runtime package dependencies.

[Live website](https://sajinct.github.io/chemmanoormetals.com/) · [GitHub repository](https://github.com/sajinct/chemmanoormetals.com)

## GitHub Pages

Pushing to `main` runs `.github/workflows/pages.yml`, which generates pages with the configured Pages URL, validates them, builds a clean `dist/` directory and publishes only those website files. The workflow can also be started manually from the repository’s Actions tab.

The repository uses **Settings → Pages → Source: GitHub Actions**. No custom domain or DNS change is required for the project URL above. The error page’s home link includes the project path, so it also works from nested missing URLs.

Only the public website output is served by Pages. This public source repository separately contains the authoring scripts, documentation and non-secret metadata for the earlier Sites review copy.

## Run locally

Open `index.html` directly, or run `npm run dev` and visit `http://127.0.0.1:4173/`. Node.js is only needed for the optional development/build helpers. No package installation is required.

## Edit

- `index.html`: homepage content and shared header/footer source.
- `assets/styles.css`: shared design and responsive styles.
- `assets/main.js`: mobile menu, image dialog, video loading and email-draft form.
- Each route directory contains an ordinary, independently readable `index.html`.
- `scripts/generate-pages.mjs`: optional centralized authoring helper for inner-page content. Running it regenerates the inner pages and their shared navigation/footer from the homepage. Edit content in this helper if you intend to regenerate; manual edits to generated inner pages would be overwritten.

All primary copy is present in HTML; JavaScript does not render the pages.

## Validate and build

```powershell
npm run check
npm run build
```

Upload the contents of `dist/` to any static host. Preserve directory paths. A web server should serve `index.html` in each directory and use `404.html` for missing pages. The build includes only website files, excluding scripts, documentation and the audit snapshot.

To prepare metadata for the original domain:

```powershell
$env:SITE_URL = 'https://chemmanoormetals.com'
node scripts/generate-pages.mjs
npm run check
npm run build
```

The default metadata targets GitHub Pages. The deployment workflow automatically uses GitHub’s configured Pages URL, including a future custom domain if one is configured. The earlier private Sites review remains a separate deployment. Domain/DNS changes have not been made.

## Contact and media

The enquiry form prepares a `mailto:` draft. Visitors send it from their own email app. It does not store enquiries or send an email from a server. Direct call, WhatsApp and email links work independently.

The 23 gallery photographs and selected product/hero photos are local assets from the existing site. The original company logo is retained. Manrope is hosted locally under its included SIL Open Font License. Asset provenance is documented in `docs/assets.md`.

All 16 original YouTube demonstrations are retained behind click-to-load players. Six profile demonstrations reference the existing `https://chemmanoormetals.com/videos/` MP4 files. Preserve that media directory when replacing the old website, or download/migrate the videos and update the profile URLs first. Do not delete existing hosting content wholesale.

The rebuild preserves `/company/`, the four product pages, both gallery pages, `/profile/`, `/clients-feedback/` and `/contacts/`, and adds `/products/`.

## Audit

See `docs/site-audit.md` for the detailed original-site analysis, content issues, design decisions, migration notes and validation limits. Unrelated gambling copy, placeholder testimonials and unverified certification/warranty claims were not imported.
