# MFA Sports Mahe — Design Tokens & Style Guide

This document specifies the design tokens, typography, component rules, and kit aesthetic implemented for the MFA Sports Mahe mobile-first redesign.

---

## 1. Brand Color Palette

The color system is built around a **pitch-green stadium base** combined with high-visibility **electric volt** accents, evoking authentic matchday energy and sublimation kit finishes.

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--mfa-color-pitch-black` | `#030D08` | Primary page background, deepest contrast |
| `--mfa-color-pitch-dark` | `#071911` | Secondary section background |
| `--mfa-color-pitch-surface` | `#0B251A` | Elevated containers, navigation bars |
| `--mfa-color-pitch-card` | `#0E3022` | Product cards, badge backgrounds |
| `--mfa-color-pitch-border` | `#184734` | Card dividers, input strokes |
| `--mfa-color-pitch-border-light` | `#25664B` | Interactive hover borders |
| `--mfa-color-volt` | `#D6FF00` | Primary action buttons, badges, key accents |
| `--mfa-color-volt-hover` | `#C2EA00` | Hover state for volt elements |
| `--mfa-color-volt-muted` | `rgba(214, 255, 0, 0.15)` | Subtle badge fills, glow layers |
| `--mfa-color-gold` | `#FFBE1A` | Deal badges, champion highlights |
| `--mfa-color-red` | `#EF4444` | Price drop / discount badges |
| `--mfa-color-text-primary` | `#FFFFFF` | Headings, hero copy, high-emphasis text |
| `--mfa-color-text-secondary`| `#CBD5E1` | Body copy, secondary specifications |
| `--mfa-color-text-muted` | `#80968B` | Labels, timestamps, subtle captions |

---

## 2. Typography

We use a strong condensed display typeface for matchday impact and a clean sans-serif for high legibility on mobile viewports.

- **Display Face**: `Barlow Condensed` / `Oswald` (uppercase, bold/extra-bold, tracking-wide). Used for headers, kit numbers, category banners, prices, and CTAs.
- **Body Face**: `Inter` / system-ui (regular/medium/semibold). Used for descriptions, specifications, policies, and form inputs.
- **Mono Face**: `JetBrains Mono` / monospace. Used for order IDs, SKU codes, technical timestamps.

---

## 3. Radii & Shapes

To reflect sharp kit design and athletic apparel:
- Cards and containers use tight, crisp corners: `2px` (`--mfa-radius-sm`) or `4px` (`--mfa-radius-md`).
- Pills and tags use full round borders: `9999px` (`--mfa-radius-full`).
- Pill buttons feature a high-contrast chamfer or diagonal jersey slant accents (`skew-x-[-6deg]`).

---

## 4. Component Styles

### A. Primary Action Button ("Buy on MFA Sports")
- **Background**: `--mfa-color-volt` (`#D6FF00`)
- **Text**: Deep pitch black (`#030D08`), font-weight 700, uppercase, condensed tracking.
- **Hover**: Scale `1.02`, background `--mfa-color-volt-hover`.
- **Target**: Deep links to `https://www.mfasportsmahe.com/Products/<slug>`.

### B. Product Card
- **Background**: `--mfa-color-pitch-card` (`#0E3022`)
- **Border**: 1px solid `--mfa-color-pitch-border` (`#184734`)
- **Image**: 1:1 square ratio, clean dark backdrop, webp compressed.
- **Price Tag**: Bold kit-number typography with real INR symbol (₹), crossed MRP, and a volt/red percentage discount tag.

### C. Trust & Support Strip
- High contrast, sticky on mobile, thumb-friendly icons for Quick Dial, WhatsApp/Instagram, and Free Delivery notification.

---

## 5. Usage Rules for Website AI Tab

When the Website AI dashboard tab embeds or mirrors components:
1. Always import `tokens.css`.
2. Do not use generic grey-scale cards; use `--mfa-color-pitch-surface` and `--mfa-color-pitch-border`.
3. Highlight prices and numbers with `--mfa-font-display` and `--mfa-color-volt`.
