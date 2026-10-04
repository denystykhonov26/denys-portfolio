# Denys Tykhonov Portfolio — Design and Development Principles

## Status

- The constraints under **Approved brief** come directly from the project brief and are fixed.
- The **Editorial Field Notes** direction was approved by Denys on 2026-10-01.
- Implementation is authorized. Do not deploy until Denys has reviewed the site locally.

## Approved brief

- Build a premium personal freelance portfolio for **Denys Tykhonov**.
- Positioning: **Web Development & AI Automation**.
- Core message: **Made to be seen. Built to work unseen.**
- Supporting message: **I shape the interface people use—and automate the repetitive work behind it.**
- Use a light, minimalist editorial aesthetic with a warm off-white background, dark typography, and muted purple accents.
- Use **Inter** and **Instrument Serif**, with the serif used selectively.
- Prioritize large typography, generous whitespace, clear navigation, responsive behavior, and restrained motion.
- Avoid excessive gradients, glassmorphism, emojis, stock photography, ornamental UI, and generic SaaS card grids.
- Do not invent experience, clients, testimonials, metrics, awards, claims, or project outcomes.
- Required home-page sections: Navigation, Hero, Selected Work, Services, About, Contact, and Footer.
- Every project must have a dedicated case-study page.
- Prefer semantic HTML5, CSS3, vanilla JavaScript, accessibility, performance, SEO, and GitHub Pages compatibility.

## Approved direction: Editorial Field Notes

### Visual thesis

A calm editorial portfolio where oversized typography carries the personality, authentic project artifacts provide proof, and a muted-purple annotation system suggests thoughtful technical work.

The site should feel like a well-edited independent design/development journal: precise rather than sterile, personal rather than playful, and technical without adopting terminal clichés. Inspiration may be taken from the reference's spacious composition, direct navigation, clear type hierarchy, and approachable simplicity. Do not reproduce its circular portrait composition, monospaced identity, status indicator, button styling, or page structure.

### Content plan

1. **Hero — establish identity:** name, positioning, headline, one-sentence introduction, and a single primary action.
2. **Selected work — provide evidence:** two large, image-led project stories with concise context and clear case-study links.
3. **Services — clarify the offer:** Websites, AI Automation, and Custom Scripts & Tools in a ruled editorial list rather than cards.
4. **About — add a human voice:** one short factual introduction; no invented biography.
5. **Contact — invite a conversation:** direct email plus verified GitHub and social links only.
6. **Footer — close quietly:** name, year, and a small back-to-top action.

### Interaction thesis

1. The hero enters as a restrained editorial sequence: eyebrow/name, headline lines, supporting copy, then CTA. Total sequence should complete in roughly 700–900 ms.
2. Large project media uses a subtle scroll reveal and a very small depth shift; motion must never obscure the screenshots or delay access.
3. Links and project rows use precise underline/rule transitions, small arrow movement, and a 1–2% media scale on hover. No bouncy motion or cursor gimmicks.

All motion must honor `prefers-reduced-motion`, remain usable without JavaScript, and use only `opacity` and `transform` where practical.

## Typography

Use no more than two families.

- **Inter:** navigation, body copy, metadata, labels, buttons, project facts, and technical content.
- **Instrument Serif:** selected display phrases only, especially the word or phrase that adds warmth to a headline. Do not use it for paragraphs or routine headings.

Recommended fluid scale:

| Role | Desktop | Mobile | Notes |
| --- | ---: | ---: | --- |
| Hero display | `clamp(4.5rem, 9vw, 8rem)` | `clamp(3rem, 15vw, 4.75rem)` | 0.90–0.96 line-height; tight tracking |
| Section title | `clamp(3rem, 5.5vw, 5rem)` | `clamp(2.25rem, 10vw, 3.25rem)` | One strong line when possible |
| Project title | `clamp(2.25rem, 4vw, 4rem)` | `2rem–2.75rem` | Clear before metadata |
| Lead/body large | `1.25rem–1.5rem` | `1.125rem–1.25rem` | Maximum 38–44 characters per line |
| Body | `1rem–1.125rem` | `1rem` | 1.55–1.7 line-height |
| Label/nav | `0.75rem–0.875rem` | `0.75rem–0.875rem` | Medium weight; restrained tracking |

Rules:

- Sentence case by default; uppercase only for compact indices and metadata.
- Keep body measures around 58–68 characters.
- Use weights 400, 500, and 600 only. Avoid heavy typography everywhere; scale should create hierarchy.
- Load fonts efficiently with `font-display: swap` and only the required files/weights.

## Color system

| Token | Value | Purpose |
| --- | --- | --- |
| Canvas | `#FAFAF8` | Primary background |
| Ink | `#181818` | Main text and strong rules |
| Muted ink | `#686762` | Secondary copy and metadata |
| Hairline | `#DDDCD5` | Dividers and quiet structure |
| Purple | `#7063A4` | Large accents, marks, decorative rules |
| Purple accessible | `#594D88` | Small linked text and focus/interactive states |
| Purple wash | `#ECE9F4` | Occasional project field or selection background |
| White | `#FFFFFF` | Media mats only when needed |

- Purple should occupy well under 10% of a typical viewport.
- Do not add gradients to compensate for weak composition.
- Preserve visible keyboard focus with a 2 px accessible-purple outline and offset.
- Validate all text/background combinations to WCAG AA; use the darker purple for small text.

## Grid and spacing

### Desktop

- 12-column grid inside a maximum content width of `1440px`.
- Page gutters: `clamp(32px, 5vw, 80px)`.
- Column gap: 24–32 px.
- Main text frequently spans columns 1–8; annotations and metadata use the remaining columns.
- Major section spacing: 144–192 px.
- Internal section spacing: 48–80 px.

### Tablet

- 8-column grid, 32 px gutters, 20–24 px gaps.
- Preserve asymmetric editorial layouts while reducing empty columns.

### Mobile

- 4-column grid with 20 px gutters and 16 px gaps.
- Major section spacing: 88–112 px.
- Internal spacing: 32–56 px.
- Touch targets must be at least 44 × 44 px.

Base spacing tokens: `4, 8, 12, 16, 24, 32, 48, 64, 96, 144, 192` px. Use the scale consistently; do not patch layouts with arbitrary values.

## Page composition

### Navigation

- Slim header with the name/wordmark left and Work / About / Contact right.
- Desktop header is calm and transparent on the page canvas; a single hairline may appear after scrolling.
- Mobile uses the name plus one compact menu control. The opened menu is a simple full-width list, not a floating glass panel.
- Anchor links must work with JavaScript disabled and show current/hover/focus state clearly.

### Hero

- Treat the first viewport as a typographic poster.
- Make **Denys Tykhonov** the dominant composition, with **Web Development & AI Automation** immediately visible as the clear professional descriptor.
- Keep “Made to be seen. Built to work unseen.” as a smaller editorial signature beside the professional descriptor rather than the main headline.
- Keep the full hero slogan in Inter and one dark color. Emphasize “seen” and “unseen” through a masked reveal and animated underline rather than a contrasting typeface or color.
- Keep the supporting copy narrow and use one primary text-link/arrow CTA: **View selected work**.
- Add a quiet margin annotation such as `Independent portfolio / 2026`, but only if it remains factual and does not compete with the message.
- Do not use a portrait placeholder, availability dot, floating badges, terminal motifs, or decorative cards.

### Selected work

- Present projects as two large editorial chapters, numbered `01` and `02`.
- Use wide media, strong titles, one-sentence descriptions, and compact metadata underneath or beside the image.
- Avoid placing both projects in equal generic cards. Vary their compositions while preserving a shared grid and caption system.
- Each preview links to a dedicated semantic case-study page.

### Services

- Use three horizontally ruled rows: Websites; AI Automation; Custom Scripts & Tools.
- Each row contains a short, factual description. No icons are required.
- On larger screens, title and explanation can occupy opposing grid columns; stack them on mobile.

### About

- Use a short first-person introduction based only on confirmed facts: Denys builds modern websites, AI-powered automations, and useful digital tools.
- Pair the text with a simple typographic pull line or working-principles list, not an invented portrait or biography.

### Contact and footer

- Contact should be a generous final typographic invitation with one clear email link.
- Include GitHub and other social links only after their exact URLs are confirmed.
- Footer remains minimal: name, year, and back-to-top.

## Project presentation

### 01 — Intertekhkorm

**Visual character:** precise, commercial, content-rich, and grounded in the actual bilingual product site.

- Lead with a clean, high-resolution desktop capture showing the Ukrainian headline, navigation, and product imagery.
- Use a second crop/detail to demonstrate product catalogue and modal/form behavior if suitable source captures are available.
- Let the warm product photography naturally contrast with the portfolio's purple annotation system; do not recolor the client work.
- Home-page caption: `Bilingual B2B website · Web development` plus the factual stack in compact metadata.
- Case-study sequence: overview; context; information architecture/localization; catalogue and inquiry flow; responsive details; stack; live site and repository.
- State only the supplied features: responsive design, UA/EN localization, product catalogue, interactive product modals, quotation request forms, SEO optimization, and modular HTML/CSS/JavaScript architecture.
- Do not claim conversion, traffic, commercial results, or a specific client role beyond what Denys confirms.

### 02 — VSE Homework Agent

**Visual character:** personal, intelligent, operational, and clearly different from the corporate website.

- Use the robot artwork as a compact identity artifact, not as a large generic hero illustration.
- Make the Telegram output screenshot the primary proof of the product, preferably in a tall crop paired with a simple text-based system flow: `Mail → Extract → Store → Notify`.
- Use a pale-purple or ink field to distinguish the case study while keeping the overall portfolio light.
- Home-page caption: `Personal academic automation · Python / AI` and explicitly label it **Personal project**.
- Case-study sequence: problem; automation flow; extraction and duplicate handling; reminders/summaries; local architecture; macOS startup; stack; privacy note.
- Before public use, crop, blur, or replace names, course identifiers, deadlines, and message content that may expose private academic information. Do not fabricate replacement results.
- State only the supplied behavior: email monitoring, AI-based task extraction, deadline reminders, Telegram summaries, duplicate detection, a local database, and automatic macOS startup.
- Do not imply university affiliation, endorsement, deployment scale, or public availability.

## Case-study template

Each project page should use the same underlying structure without forcing identical art direction:

1. Project index, title, type, and concise factual summary.
2. Large authentic visual.
3. Metadata row: project type, responsibilities if confirmed, year if confirmed, and stack.
4. Problem/context.
5. Approach or system flow.
6. Key implementation details and selected screens.
7. Technical stack.
8. Verified external links.
9. Previous/next project navigation and contact prompt.

Never invent missing dates, roles, results, responsibilities, links, or process details. Mark unknowns for confirmation before publication.

## Responsive behavior

- Preserve hierarchy and rhythm, not exact desktop geometry.
- Hero type should wrap intentionally into three or four short mobile lines without orphaned words.
- Project media becomes full-width within the page gutters; captions follow immediately after the related image.
- Horizontal metadata wraps into a vertical definition list.
- Ruled service rows stack while keeping generous tap spacing.
- Keep essential content in source order so CSS layout changes do not harm reading order.
- Test at minimum: 320, 375, 768, 1024, 1440, and 1920 px widths.

## Accessibility, performance, and SEO

- Use semantic landmarks, one `<h1>` per page, logical heading order, a skip link, keyboard-operable navigation, and descriptive link labels.
- Provide useful alt text for content imagery; use empty alt text for purely decorative assets.
- Never communicate meaning by color or motion alone.
- Respect reduced motion and contrast preferences where applicable.
- Convert project captures to appropriately sized AVIF/WebP with fallback as needed; declare dimensions to prevent layout shift.
- Avoid dependencies unless a native platform feature cannot meet the requirement. No framework is needed for the current scope.
- Use page-specific title, description, canonical URL, Open Graph metadata, and structured data appropriate to a person/portfolio without unverifiable claims.
- Target strong Core Web Vitals and test with real mobile throttling before release.

## Engineering conventions

- Use semantic HTML5, layered maintainable CSS, and small progressive-enhancement JavaScript modules.
- Prefer CSS custom properties for color, typography, spacing, layout, borders, and motion.
- Keep content separate from presentation where practical; project data may be stored in a small JSON/data module if it reduces duplication without complicating static deployment.
- Ensure all paths work under a GitHub Pages repository subpath; avoid root-relative assumptions unless a custom domain build explicitly supports them.
- Use kebab-case filenames, clear component/section class names, and no inline styles or inline event handlers.
- Do not add a build step unless it creates a concrete benefit that outweighs GitHub Pages complexity.
- Validate HTML, lint CSS/JavaScript where tooling exists, check keyboard navigation, and visually test desktop and mobile before calling the implementation complete.

## Quality gates

- The first viewport unmistakably communicates Denys's name, discipline, and point of view.
- The page can be understood by scanning headings and project captions.
- Each section has one job and one dominant visual idea.
- Authentic work is more prominent than decoration.
- The two projects feel related by the portfolio system but remain visually distinct.
- No generic card grid, fake metrics, filler copy, or unsupported claim is present.
- Removing shadows and animation does not reduce the design's quality or usability.
- The implementation remains fast, accessible, responsive, and fully functional on GitHub Pages.
