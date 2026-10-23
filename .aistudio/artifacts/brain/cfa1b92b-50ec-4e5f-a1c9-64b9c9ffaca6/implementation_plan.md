# শিখুন (Shikhun) — Ultra-Subtle Wallpaper Pattern Plan

Calibrates the pastel messenger doodle background into an ultra-subtle, airy wallpaper with a spacious 340px $\times$ 340px repeating tile and whisper-soft 15–16% opacity for a peaceful, distraction-free aesthetic.

### User Review & Critical Decisions

> [!IMPORTANT]
> The exact adjustments confirmed by you:

- **Ultra-Subtle Visibility**: The pattern layer opacity will be reduced from 45% down to **16%** (`opacity-[0.16]`), creating a soothing, unobtrusive ambient watermark.
- **Spacious 340px Tile**: The pattern repetition grid is expanded from 240px to **340px $\times$ 340px** (`backgroundSize: '340px 340px'`).
- **Fewer, Well-Spaced Icons**: Prunes dense clusters to provide generous breathing space between each cute doodle (smiling book, pencil, graduation cap, boba cup, planet, cloud, and star) with fine 1px–1.2px strokes.

---

### 1. Visual Comparison

| Attribute | Previous Version | Refined Whisper Version |
| :--- | :--- | :--- |
| **Tile Dimensions** | 240px $\times$ 240px | **340px $\times$ 340px** (Generous breathing room) |
| **Pattern Opacity** | 45% (Noticeable) | **16%** (Whisper-soft watermark) |
| **Icon Density** | 15 items in 240px | **Curated 10 spacious items in 340px** |
| **Reading Experience**| Medium ambient presence | **Zero distraction, high-end calm elegance** |

---

### 2. Implementation Steps

1. **Update `src/components/ArtisticBackground.tsx`**:
   - Reconstruct the SVG data-URI with a 340px $\times$ 340px viewport and curated, well-spaced doodles.
   - Adjust wrapper opacity to `opacity-[0.16]` and `backgroundSize: '340px 340px'`.
2. **Verify Build**:
   - Run `compile_applet` and `lint_applet` to confirm flawless build.
