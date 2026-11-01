# FeverDream website

Bilingual, static company website for **https://feverdream.dev**. The redesign keeps the original rainbow Eye of Horus and Egyptian-inspired identity while presenting AI, software, and infrastructure clearly. EZpenguin and Double Agent lead the internal project showcase; education appears as one additional area of work.

## Content and build

- English: `/en/`; Brazilian Portuguese: `/pt/`.
- Eleven canonical routes per language, including project detail pages and four service pages.
- Source copy and shared HTML: `scripts/build.py`.
- Shared presentation and navigation: `assets/site.css` and `assets/site.js`.
- Generated HTML is committed so Hostinger needs no runtime or dependency installation.

```sh
python3 scripts/build.py
python3 scripts/check_site.py
node --check assets/site.js
```

The generator uses only Python's standard library. Social-preview PNG and optimized logos are committed assets. GitHub Actions validates generated output and checks that regeneration produces no changes.

## Search and sharing

Each canonical page has its own title, description, canonical URL, EN/PT-BR/x-default alternates, Open Graph and Twitter metadata, and Organization/WebSite/WebPage JSON-LD. Interior pages include breadcrumbs. The sitemap contains the 22 canonical pages with language alternates. Robots permits crawling. Legacy HTML entry points retain static fallbacks; `.htaccess` supplies permanent redirects on Apache.

Keywords are supplementary metadata; discovery depends on useful content, crawlability, relevant links, and search-engine indexing. No ranking or traffic result is guaranteed. Once deployed, verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://feverdream.dev/sitemap.xml`.

## Project accuracy

Project descriptions were checked against their repository READMEs on October 31, 2026:

- [EZpenguin](https://github.com/zarigata/EZpenguin): early-stage Debian-based Linux project; GPL-3.0-or-later.
- [Double Agent](https://github.com/zarigata/double-agent): product/architecture specification and multilingual web preview. Runtime capabilities are planned. Source-available, with restrictions described in its license.

No client logos, testimonials, customer counts, or performance claims were invented. Public contact remains `vendas@feverdream.dev`.

## Hostinger deployment

**A GitHub commit or merged PR does not deploy to Hostinger.** This repository was the matching older FeverDream site; the live bilingual site had additional edits not present in the repository. Hosting access and the currently deployed `.htaccess` must be checked before uploading. No DNS or hosting configuration was changed by this redesign.

1. Back up the current `public_html` and `.htaccess` in Hostinger.
2. Run the checks above on the exact commit to upload.
3. Upload `en/`, `pt/`, `assets/`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `index.html`, and the legacy root HTML files. Preserve unrelated server scripts and configuration.
4. Review and merge this repository's `.htaccess` rules into the live configuration; retain its existing HTTPS, security, PHP, and other application rules. Enable the new directory routes and avoid language redirects that override them.
5. Check `/`, both language homes, a project page, language switching, mobile menu, email links, old page redirects, the sitemap, and social-preview URL over HTTPS. Clear the Hostinger cache as needed.
6. Submit the sitemap through the site's verified search-console accounts.

For local viewing, use any static server that serves directory `index.html` files. There is no backend form: the contact CTA opens the visitor's email app and states the destination visibly.
