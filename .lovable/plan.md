# Animated, Colorful Splash + Landing Hero

Bring the uploaded "how it works" collage into the app as motion-driven, colorful screens.

## 1. Splash screen (`/`)

- Animated brand intro instead of the current static logo:
  - Soft animated gradient backdrop (brand blue → teal → green), slowly shifting.
  - Logo scales in with a gentle bounce, then a shine sweep across it.
  - "LAUNDRY GIRL" letters animate in one by one; tagline fades up after.
  - Floating bubble/sparkle particles drifting upward for a playful laundry feel.
  - Progress bar (2.5s) replaces the plain spinner, then auto-navigates to `/landing`.
- Respect `prefers-reduced-motion`: animations collapse to a simple fade.

## 2. Landing page (`/landing`)

Add an animated hero and "How it works" section above the existing login buttons (buttons and routing stay unchanged).

- **Hero**: the uploaded collage as a large rounded card with a Ken Burns slow zoom, colorful gradient glow behind it, and a fade-up reveal on load. Tagline "Clean Clothes. Happy Life." animates in.
- **How it works**: three animated step cards recreated from the image — 1. Customer, 2. Delivery Staff, 3. Washing Partner — each with its own accent color (blue / teal / green), icon, short caption chips (Easy Booking, Doorstep Pickup / Pickup from Doorstep / Wash, Dry, Fold), and staggered slide-in as you scroll. Animated arrows connect the steps on desktop, stacked on mobile.
- **Trust strip**: Trained Women Partners, Safe & Hygienic Service, On-time Delivery, Affordable Pricing — animated pill badges.

## Technical notes

- Upload the collage via `lovable-assets` and reference the `.asset.json` pointer (no binary in the repo).
- New keyframes (gradient shift, float, shimmer, ken-burns, staggered fade-up) added to `tailwind.config.ts`; colorful gradient/glow tokens added to `src/index.css` as semantic tokens — no hardcoded color utilities in components.
- New components: `src/components/landing/HeroCollage.tsx`, `HowItWorks.tsx`, `TrustStrip.tsx`; splash animation contained in `src/pages/SplashScreen.tsx`.
- Scroll reveals via a small IntersectionObserver hook, no new dependencies.
- No backend, auth, or business-logic changes.
