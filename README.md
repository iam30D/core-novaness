# Core-Novaness Website

Static multi-page marketing site for Core-Novaness.

## Included pages

- `index.html`
- `about.html`
- `services.html`
- `portfolio.html`
- `industries.html`
- `testimonials.html`
- `contact.html`
- `404.html`

## Stack

- Plain HTML
- CSS
- Vanilla JavaScript

## Why this setup

- Fast to load
- Easy to host on Cloudflare Pages
- Low maintenance
- Easy to expand later into a framework if needed

## Local preview

Serve the folder with any static server.

Example:

```bash
npx serve .
```

## Deploying on Cloudflare Pages

1. Push this folder to a Git repository.
2. Create a new Cloudflare Pages project and connect the repository.
3. Use `.` as the build output directory.
4. Leave the build command empty for this static site.
5. Deploy and attach the custom domain `corenovaness.com`.

## Included Cloudflare config

- Cloudflare Pages automatically serves matching HTML files on clean URLs like `/services`
- Cloudflare Pages also redirects `.html` page requests to extensionless URLs
- `_headers` adds basic security headers for the live site and prevents `pages.dev` copies from being indexed

## Notes

- The contact form opens the user's default email app using `mailto:` so it works without a backend.
- The testimonials page now uses transparent launch-stage proof messaging instead of placeholder quotes.
