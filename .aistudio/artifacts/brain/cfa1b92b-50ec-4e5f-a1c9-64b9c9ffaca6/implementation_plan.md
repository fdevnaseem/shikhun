# শিখুন (Shikhun) — 3D Catmull-Rom Spline Curve Motion Plan

Implements a continuous 3D Catmull-Rom spline curve with natural arc swoops (`THREE.CatmullRomCurve3`) parameterized by real-time DOM section scroll offsets, ensuring the 3D mascot responds instantly upon scrolling and progressively glides through each section's height without lag.

### User Review & Critical Decisions

> [!IMPORTANT]
> Key improvements confirmed by you:

1. **Elimination of Scroll Lag**:
   - *Previous Problem*: Using whole-page global `scrollY / maxScroll` meant the mascot didn't move until long after the user had already entered Section 2.
   - *Solution*: Map scroll progress directly to individual section bounds (`offsetTop` and `offsetHeight`). The very moment the user scrolls past the Hero fold, the mascot immediately starts its 3D flight.
2. **Smooth Catmull-Rom 3D Spline Curve**:
   - A multi-point 3D curve with natural arc swoops (`THREE.CatmullRomCurve3`) connecting:
     - **Hero [Right]** $\to$ *Arching Swoop* $\to$ **About [Left]** $\to$ *Arching Swoop* $\to$ **Methodology [Right]** $\to$ **Tracks [Upper Right]** $\to$ **CTA [Center]**.
   - Generates graceful, physics-like banking and curved flight arcs rather than flat linear interpolations.
3. **Progressive Gliding Throughout Each Section**:
   - Inside each section, progress $u \in [0, 1]$ advances smoothly as the user reads, guiding the mascot along its dedicated open corridor with continuous visual momentum.

---

### 1. Spline Waypoint Architecture

```
Section Anchor       DOM Trigger Range            Spline Waypoint (X, Y, Z)     Spatial Corridor
──────────────       ─────────────────            ─────────────────────────     ────────────────
#section-hero        0% to 100% of Hero           Point 0: ( 2.40,  0.15,  0.0)  Right Flank
Swoop Arc 1          Between Hero & About         Point 1: ( 0.20,  0.40,  0.3)  Natural Crest
#section-about       0% to 100% of About          Point 2: (-2.40, -0.10,  0.0)  Left Flank
Swoop Arc 2          Between About & Methodology  Point 3: (-0.10,  0.35,  0.3)  Natural Crest
#section-methodology 0% to 100% of Methodology    Point 4: ( 2.40,  0.15,  0.0)  Right Flank
#section-tracks      0% to 100% of Tracks         Point 5: ( 1.60,  1.40, -0.6)  Upper Hover Arc
#section-cta         0% to 100% of CTA            Point 6: ( 0.00,  0.20,  0.2)  Center Landing
```

---

### 2. Implementation Steps

1. **Update `ThreeHeroCanvas.tsx`**:
   - Construct `THREE.CatmullRomCurve3` with intermediate swoop waypoints.
   - Implement `getSectionProgress()` measuring live DOM section rects and scroll offsets to derive the exact spline parameter $t \in [0, 1]$.
   - Query `splineCurve.getPoint(t, targetPos)` and damp with frame-rate independent inertia (`MathUtils.damp`).
2. **Verify Build**:
   - Run `compile_applet` and `lint_applet` to confirm clean compilation and zero errors.
