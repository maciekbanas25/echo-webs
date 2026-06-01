#!/bin/bash
git add src/components/WorkPreview.tsx src/index.css src/pages/Barber.tsx src/pages/BeautySalon.tsx src/pages/Cafe.tsx src/pages/CarDetailer.tsx src/pages/Gym.tsx src/pages/Photographer.tsx src/pages/Portfolio.tsx src/pages/Restaurant.tsx src/pages/Tradesman.tsx
git commit -m "Premium redesign: niche typography + editorial layouts

- Add Google Fonts: Bebas Neue, Barlow Condensed, Cormorant Garamond, Playfair Display, Oswald, Plus Jakarta Sans
- Barber: editorial full-bleed service list layout with Bebas Neue
- Gym: Barlow Condensed headings for athletic feel
- Photographer: Cormorant Garamond 300-weight for editorial elegance
- Cafe/Restaurant: Playfair Display for warmth
- BeautySalon: Cormorant Garamond for luxury feel
- Tradesman: Oswald for trustworthy/strong feel
- CarDetailer: Real Unsplash car images in gallery + before/after
- WorkPreview/Portfolio: 3D hover lift, overlay interaction, 4/3 aspect ratio
- Portfolio: 3-column grid on large screens

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main
