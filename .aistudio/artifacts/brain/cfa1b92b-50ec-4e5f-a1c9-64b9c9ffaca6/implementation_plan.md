# শিখুন (Shikhun) — Cute Pastel Pink Messenger Wallpaper Pattern

A visual and ambient upgrade implementing a seamless, medium-density doodle pattern wallpaper inspired by Telegram and Messenger chat themes, styled with a soft, cute, pinkish-pastel aesthetic.

### User Review & Critical Decisions

> [!IMPORTANT]
> The wallpaper system has been tailored to your specific preferences:

- **Confirmed Style**: **Messenger / Telegram Chat Pattern Wallpaper** — a seamless repeating wallpaper tile featuring cute, hand-crafted study and creativity doodles.
- **Confirmed Color Palette**: **Soft Pinkish & Cute Pastel** — a soothing blush off-white canvas (`#FFF8F9` / `#FAF6F8`) overlaid with soft pastel pinks, lavender, coral blush, and gentle mint tones.
- **Confirmed Density**: **Medium-Density Seamless Tile** (240px $\times$ 240px grid repeat) ensuring continuous, charming pattern coverage across the entire background without cluttering foreground reading cards.
- **Zero-Legibility Impact**: Pattern strokes and fills are calibrated at soft 20–25% opacity so Bengali text in **Hind Siliguri** remains 100% crisp, readable, and WCAG AA compliant.

---

### 1. Overview & Pattern Anatomy

- **What It Does**: Replaces isolated stickers and dot grids with a continuous, cohesive chat-theme wallpaper pattern across the entire application background.
- **Pattern Iconography (Cute Study & Creative Tech Doodles)**:
  1. 📖 Smiling Open Book & Bookmark
  2. ✏️ Cute Pink Pencil & Eraser
  3. 🎓 Mini Graduation Cap with Tassel
  4. 💻 Tiny Retro Computer with Cute Eyes
  5. ⭐ Twinkling Pastel Stars & Sparkle Diamonds
  6. 🪐 Kawaii Saturn Planet & Orbit
  7. 🧋 Sweet Boba / Study Mug
  8. 🎈 Cute Heart Balloon
  9. ✈️ Paper Airplane in Flight
  10. 💡 Creative Spark Lightbulb
  11. `</>` Soft Code Tag Brackets
  12. 🎨 Mini Artist Paint Palette
  13. 🧩 Learning Puzzle Piece
  14. ☁️ Soft Dream Cloud Puff

---

### 2. User Experience & Visual Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│               Top Navigation Bar (Translucent Glass)                   │
└────────────────────────────────────────────────────────────────────────┘
│                                                                        │
│   Seamless 240px × 240px Cute Pastel Pattern Wallpaper Background      │
│   [ 📖  ⭐  ✏️  💻  🪐  🧋  🎓  💡  🎈  ☁️  🎨  🧩  ✈️ ] (Tiled)     │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │  Foreground Content Cards (Clean white/glass with soft edge) │     │
│   │  [ Bengali Hind Siliguri Typography with High Contrast ]     │     │
│   └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│   [ Continuous 3D Mascot Orb Floating in Open Spatial Corridor ]       │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

#### Wallpaper Implementation Strategy
- **Seamless SVG Tile (`CuteWallpaperPattern`)**: Embedded as a vector pattern with optimized path curves, repeating infinitely along X and Y axes (`background-repeat: repeat`).
- **Surface Elevation Contrast**: Content containers and course cards utilize soft white and clean hairline boundaries (`bg-white/95 border-slate-200/80 shadow-2xs`), allowing the cute wallpaper pattern to playfully show through in all page margins and section interstices.

---

### 3. Implementation Steps
1. **Redesign `ArtisticBackground.tsx`**: Replace the previous isolated stickers with the 240px seamless pinkish-pastel messenger doodle pattern tile and soft blush ambient gradients.
2. **Harmonize Base Colors**: Ensure body background and page containers complement the pinkish-pastel wallpaper atmosphere.
3. **Verify Build**: Run `compile_applet` and `lint_applet` to confirm flawless compilation.
