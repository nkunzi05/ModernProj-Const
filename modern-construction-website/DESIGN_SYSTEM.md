# Modern Construction and Projects — Design System

Everything visual comes from the logo: a charcoal-and-red wordmark on white, set in a
geometric sans, with a tracked uppercase sub-line ("CONSTRUCTION & PROJECTS").
Tokens live in `src/index.css` (`@theme` and `@utility` blocks). Use them instead of
hex values or arbitrary Tailwind sizes.

## Audit (before this redesign)

| Area | Found | Action taken |
|---|---|---|
| Brand colour | Named `clay` (terracotta), not tied to the brand | Replaced by `brand` tokens sampled from the logo |
| Unused tokens | `moss`, `ochre` | Removed (`ochre` → `brand-bright`) |
| Labels | 15 near-identical combos of size + tracking (55 arbitrary font sizes, 8 tracking values) | Consolidated into `type-label` and `type-action` |
| Headlines | 16 one-off `clamp()` sizes | Consolidated into `type-display-xl / lg / md` (hero and one statement headline keep their own) |
| Fonts | Instrument Serif italic display, loaded from Google | Montserrat (matches the wordmark), self-hosted |
| Hardcoded hex in components | 0 | No change needed |

## Colour

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F4F4F2` | Page background |
| `sand` | `#E7E7E4` | Alternate section background, image placeholder |
| `bone` | `#CDCDC9` | Inactive numerals, dividers on light |
| `smoke` | `#5D5D60` | Secondary text (6:1 on paper) |
| `charcoal` | `#3F3F40` | Logo grey; use sparingly for brand moments |
| `ink` | `#222223` | Body text, dark sections, primary buttons |
| `brand` | `#8B1A17` | Logo red: emphasis, links, errors, the "Why" section fill |
| `brand-deep` | `#6E1311` | Hover/pressed on red fills |
| `brand-bright` | `#D63A32` | Red on dark backgrounds only, large text and rules |

Rules: red is for emphasis and action, never large body text on dark grounds. Headline
emphasis uses `<em>` in `text-brand`, repeating the logo's grey/red split; it is never italic.

## Typography

| Role | Token / class | Spec |
|---|---|---|
| Display family | `font-display` | Montserrat (variable), headings 700, tracking −0.025em |
| Body family | `font-sans` | Hanken Grotesk (variable), 17px / 1.6 |
| Hero | Hero.tsx only | `clamp(2.3rem, 11vw, 4.4rem)` → `clamp(4rem, 7.4vw, 8rem)` |
| Display XL | `type-display-xl` | Page titles, project titles, 404 |
| Display LG | `type-display-lg` | Section titles, CTA band |
| Display MD | `type-display-md` | Contact headline, smaller section titles |
| Label | `type-label` | 0.72rem, 600, uppercase, 0.16em tracking; field labels, meta, eyebrows |
| Action | `type-action` | 0.78rem, 700, uppercase, 0.12em tracking; buttons and text links |

Keep body copy under ~75 characters per line (`max-w-lg` / `max-w-xl`).

## Components

### Button (`components/ui.tsx`)
| Variant | Use when |
|---|---|
| `dark` | Primary action on light backgrounds |
| `light` | Primary action on dark or photo backgrounds |
| `brand` | The single most important action in a dark section (CTA band) |
| `outline` / `outlineLight` | Secondary action next to a primary one |

States: hover swaps fill (dark → brand, brand → ink); focus shows a 2px `brand` outline;
min height 54px for touch. Label says exactly what happens ("Send project enquiry").

### Form field (`sections/Contact.tsx` → `Field`)
Underline input, `type-label` label, `*` in brand for required. Error: border turns
`brand`, message below with `role="alert"`, linked via `aria-describedby`.

### File field (`sections/Contact.tsx` → `FileField`) — new
| Property | Value |
|---|---|
| Accepts | JPG, JPEG, PNG, WEBP, HEIC, PDF, DOC, DOCX, XLS, XLSX |
| Limit | One file, 5 MB (`MAX_FILE_BYTES`) |
| Sent as | `attachment` field in a multipart request to FormSubmit |

| State | Visual | Behaviour |
|---|---|---|
| Empty | Dashed box, upload icon, "Choose a file or drag it here" | Click or keyboard opens picker |
| Drag over | Brand border, faint red tint | Drop selects the file |
| Selected | Solid box with file name and size, "Remove" | Remove clears it |
| Error | Brand border, message below | Wrong type or over 5 MB; file is not kept |
| Sending | Button reads "Uploading and sending…" | Button disabled |

Accessibility: the real `<input type="file">` is visually hidden but focusable; focus
ring appears on the dropzone; errors use `role="alert"`.

## Motion
One page-load sequence (hero lines rise, image settles), scroll reveals, and
state-change motion (menu, accordion, service panel). All of it is disabled under
`prefers-reduced-motion`, and content is visible without JavaScript.

## Do / don't
| Do | Don't |
|---|---|
| Use `type-label` for any small uppercase text | Add new `text-[0.7xrem] tracking-[…]` combinations |
| Pick one of the three display sizes | Add a new `clamp()` for a heading |
| Use `brand-bright` for red on `ink` | Use `brand` text on `ink` (fails contrast) |
| Use the logo files in `public/brand/` | Recreate the logo in type |
