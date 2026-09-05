# Chemmanoor Metals — existing website audit and rebuild

Reviewed 5 September 2026. Source: [chemmanoormetals.com](https://chemmanoormetals.com/). This audit covers the public website, its HTML, navigation, images and media. It does not include the hosting account, WordPress administration, server files or the separate ERP directory. Findings about the original website are observations, not a forensic security assessment or a measured performance benchmark.

## Main findings

The existing website has enough business content and product imagery for a strong static website. Its core job is to help a visitor understand the product range, see previous installations, and contact the company. It has no visible need for accounts, a database, checkout or a large JavaScript framework.

The most important issue is content integrity: the moving-pergola and perforated-shutter pages currently contain unrelated gambling promotion. The client feedback page contains three placeholder reviews. These should not be carried into the new website. The existing WordPress installation should be investigated separately before its content or software is trusted as a source for future changes.

## Page and capability inventory

| Existing address | Current content | Rebuilt treatment |
| --- | --- | --- |
| `/` | Large photo carousel, company introduction, benefits and featured products | Clear first-screen proposition, product links, company introduction, authentic installations and contact action |
| `/company/` | Company history, manufacturing and service claims | Concise history, consistent founding date and practical service information |
| `/automatic-shutters/` | Motor categories and shutter-profile images | Readable product guide, application choices and enquiry link |
| `/automatic-gates/` | Swing/sliding options and technical claims | Configuration guide with site-specific enquiry; unsupported ratings and warranty omitted |
| `/moving-pergola-roof/` | Unrelated Lucky Jet promotion in product content | Clean product introduction and original demonstration link |
| `/perforated-shutters/` | Unrelated Aviator promotion in product content | Clean product introduction and original demonstration link |
| `/photo-gallery/` | 23 photos in an AJAX masonry gallery | All 23 photographs hosted locally, lazy loading and an accessible native image dialog |
| `/video-gallery/` | 16 YouTube embeds | All 16 demonstrations preserved; player loads only when selected, with direct YouTube fallback links |
| `/profile/` | Association image, six MP4 videos and repeated maps | Structured business profile and six original product demonstration videos |
| `/clients-feedback/` | Three named testimonial cards with Lorem Ipsum bodies | Honest feedback and after-sales contact page, with no invented endorsements |
| `/contacts/` | Contact details, map and WordPress form | Telephone, email, WhatsApp, map link and an explicitly labeled email-draft enquiry form |
| New `/products/` | Old Products menu was a dropdown without a useful landing page | Four product categories with clear destinations |

Sources: [Company](https://chemmanoormetals.com/company/), [Shutters](https://chemmanoormetals.com/automatic-shutters/), [Gates](https://chemmanoormetals.com/automatic-gates/), [Pergola](https://chemmanoormetals.com/moving-pergola-roof/), [Perforated](https://chemmanoormetals.com/perforated-shutters/), [Photos](https://chemmanoormetals.com/photo-gallery/), [Videos](https://chemmanoormetals.com/video-gallery/), [Profile](https://chemmanoormetals.com/profile/), [Feedback](https://chemmanoormetals.com/clients-feedback/), [Contacts](https://chemmanoormetals.com/contacts/).

## Content accuracy and trust

- The company page identifies 1975 as the founding year. Other copy says “40 years” or refers to a decade of experience. The rebuild uses **Since 1975** so the wording remains consistent over time.
- Existing references to ISO certification and fire ratings do not identify certificate numbers, exact standards, scope or expiry. The rebuild makes no certification claim.
- The gate page advertises a five-year replacement warranty and uses “700/1400 Kg torque power.” Warranty applicability and that technical unit need business confirmation. The rebuild does not repeat either claim.
- The feedback page’s named cards are template placeholders, not usable customer evidence. No review names, ratings or endorsement text has been fabricated.
- Two product pages contain unrelated gambling text and outbound links. This is strong evidence of content contamination; the cause and full extent cannot be established from a public-page review. Rebuilding static files does not remediate the existing server.
- The profile association graphic has no useful text identifying the partner or current relationship. It is omitted pending confirmation.

## Verified business information

| Field | Public-site value |
| --- | --- |
| Name | Chemmanoor Metals |
| Established | 1975 |
| Address | Perakam P.O, Chavakkad Via, Thrissur, Kerala 680505, India |
| Primary telephone | +91 97470 70066 |
| Additional telephone | +91 97470 70055 |
| Landline | 0487 2502666 |
| Email | mail@chemmanoormetals.com |
| WhatsApp | +91 97470 70066 |

These are verified against the website, not by calling the business. Opening hours, pricing, staff names and precise service areas are not invented. Source: [Contacts](https://chemmanoormetals.com/contacts/).

## Design and visitor journey

The original first viewport is dominated by a rotating image with a small navigation bar and little visible explanation of what visitors should do next. Much of the business information appears in long paragraphs. Product links use generic repeated wording; several featured-product buttons have no actual destination. Footer product and social links include `#` placeholders, and the Google+ link is obsolete.

The redesign gives visitors a clear progression: understand the offering → choose a product → inspect relevant work or demonstrations → contact the team. The primary navigation is reduced to Home, Company, Products, Our work and Contact; profile, videos and feedback remain accessible in the footer. Product pages link directly to the enquiry form with the relevant product selected.

The visual direction uses a charcoal foundation, white surfaces, orange call-to-action accents, generous spacing and locally hosted Manrope typography. The existing cyan logo is retained. Authentic images establish the business’s work; no stock photo is presented as a Chemmanoor installation. A clean version of an original patio photograph anchors the home page.

## Mobile and accessibility

Observed original issues include a viewport setting that disables zoom, no H1 on several pages, abrupt heading-level changes, unhelpful or empty image alternatives and multiple overlapping navigation plugins.

The rebuild includes scalable viewport settings, one H1 per content page, semantic landmarks, a skip link, labeled form controls, visible keyboard focus, a menu with expanded-state reporting and Escape handling, a native dialog for gallery images, touch-sized primary controls and reduced-motion support. Layout rules cover small phones, tablets and wide screens. Core content and navigation remain readable without JavaScript. Image links still open the original photograph when the dialog enhancement is unavailable.

Original gallery images have no project names or descriptions. The imported gallery uses numbered installation labels rather than inventing customer identities or locations. Accurate project-specific captions would improve the gallery further if supplied by the business. Original videos do not supply transcript files in the inspected site; video transcript/caption quality has not been verified.

## Performance and maintenance

The original HTML loads WordPress, WPBakery, Slider Revolution, jQuery, menu plugins, animation libraries and several font families. This is a substantial dependency surface for a brochure site. No Lighthouse score or numeric speed improvement is claimed; a controlled performance measurement was not run.

The rebuild serves ordinary HTML pages, one shared stylesheet, one small deferred JavaScript file and local imagery/font files. It has no runtime package dependencies, third-party analytics, database or WordPress requirement. YouTube players are deferred until selected. Local gallery photographs use lazy loading; dimensions reserve their layout. The native profile videos use `preload="none"` and retain the original video URLs.

## Search and migration

The rebuild preserves the original content paths, adds descriptive titles and meta descriptions, allows browser zoom, supplies a sitemap and robots file, and includes structured business data based on public facts. It excludes ratings, pricing, hours and certifications that could not be substantiated.

The private preview uses its own canonical origin. Before deploying to the company domain, regenerate metadata with `SITE_URL=https://chemmanoormetals.com`, run validation and build, and upload the public output. Keep the original `/videos/` media directory available or migrate the six MP4 files and update their URLs. Existing WordPress query-string attachment/search endpoints and old media URLs are outside the recreated public-page scope; review search-console traffic before removing legacy media or creating redirects.

## Contact form behavior

The old contact form relies on Contact Form 7 and Akismet. A static site cannot process and deliver an email by itself. The replacement validates the entered fields and prepares an email draft in the visitor’s email app. It explicitly states that the visitor must send the email; it does not claim that a request was delivered. Call, WhatsApp and direct email links remain available.

If an in-page “message sent” workflow is required later, connect a real submission endpoint and implement delivery/error handling. No form-service account, hidden destination or messaging backend has been added.

## Validation and limits

The included static checker verifies the twelve content pages, local asset references, cross-page anchors, document structure, heading presence, duplicate IDs, gallery count and JavaScript syntax. The build copies only public website files; the audit, authoring scripts, source HTML snapshot and configuration are excluded from the deployment output.

Completed checks: 12 content pages and 415 local references passed; all 23 gallery photographs are present; the public build contains 54 files totaling approximately 4.37 MB. An optional read-only browser contact-details tool was checked through the supported browser interface with both valid input and an invalid-input rejection. A separate source review identified and resolved video-frame sizing, phone-pattern compatibility, current-page semantics and the form’s no-JavaScript fallback.

The original site was inspected visually in a browser. The new site was opened as a preview; comprehensive desktop/mobile browser interaction testing was not performed in this pass. Third-party YouTube playback availability and successful delivery from a visitor’s email app depend on those services and have not been asserted as verified.
