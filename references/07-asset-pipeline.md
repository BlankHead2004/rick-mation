# Asset Pipeline

## Asset classes

1. User-provided footage
2. User-provided images
3. Source-document figures
4. Generated stills
5. Generated vectors
6. Icons/logos
7. Screenshots/screen recordings
8. Data files
9. Audio/music/SFX

## Asset manifest

A machine-checkable version of this record lives at `schemas/asset-manifest-entry.schema.json` in this skill.

```json
{
  "id": "robot_demo_03",
  "path": "assets/robot_demo_03.mp4",
  "type": "video",
  "duration": 8.4,
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "source": "user",
  "hash": "...",
  "safe_usage": true,
  "notes": "close-up interaction"
}
```

## Asset ingestion

Automatically, on ingest:

- hash assets
- inspect metadata
- create thumbnails/contact sheets
- detect duration
- detect dimensions
- extract representative frames
- identify audio presence
- index OCR/text only when needed
- classify by visual content
- **flag backgrounds that need cleanup** — plain/white/seamless studio backdrop, a busy/unappealing background, or any background that will visually clash once composited over the project's design-system background (see Background cleanup below)

## Necessity principle — pull assets on demand, never speculatively

**An asset is included in a scene only because that scene's stated `purpose` needs it — never to fill space, hit a "one visual per scene" habit, or because the asset happened to be available.**

- Resolve/prepare assets **per scene, driven by the storyboard's actual `elements[]` list** (just-in-time), not as a bulk "process everything in the input folder" pass done up front regardless of whether it's used.
- Before pulling any image/video/chart/diagram into a scene, the authoring agent must be able to answer: *what does this asset provide that the narration/text alone does not?* If there's no answer, leave the scene without it — a clean scene with fewer elements beats a cluttered one with an unjustified asset (see also Composition cleanliness in [05-design-system-and-motion.md](05-design-system-and-motion.md) and the Asset necessity clause in [04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md)).
- If a source folder contains assets nobody's scene ends up needing, that is the expected, correct outcome — do not force their inclusion.

## Selection rules

Prefer, **in this order**, when appropriate:

1. authoritative user-provided asset;
2. source-document figure/data;
3. generated vector/diagram;
4. generated still;
5. external/licensed asset;
6. synthetic filler.

**Never replace a precise source asset with a generic generated substitute merely because generation is easier.** This is a common failure mode to actively guard against — check yourself when reaching for image generation.

## Background cleanup — remove unappealing/inconsistent backgrounds before compositing

An image (or a video frame used as a still) with a plain, busy, or otherwise unappealing/inconsistent background must **not** be composited as-is just because it was the fastest path. Clean it up first:

1. **Detect.** During ingestion, flag any image asset whose background is: a flat/near-solid color sweep (studio white/green/blue backdrop), a background visually inconsistent with the project's design-system background ([05-design-system-and-motion.md](05-design-system-and-motion.md)), or generally busy/distracting relative to the subject.
2. **Deterministic first choice — chroma/color key.** When the background is a flat or near-uniform color, remove it deterministically with FFmpeg's `colorkey`/`chromakey` filter (or Remotion's SVG/CSS masking for simple geometric cases). This is preferred because it is scriptable, reproducible, and needs no extra tooling — consistent with the determinism rule in [01-system-architecture.md](01-system-architecture.md).
3. **AI matting fallback.** For complex, non-uniform backgrounds, use an image-matting/segmentation tool to extract the subject with alpha. Treat the cutout exactly like any other generated/derived asset: give it a stable ID, and record `background_treatment` provenance (tool/model, version, method) in the asset manifest — see `schemas/asset-manifest-entry.schema.json`.
4. **Composite onto the design system, not onto whatever the source had.** After cutout, place the subject over the project's actual neutral background/card treatment via the `MaskedMedia`/`ImageFrame` components ([06-component-library.md](06-component-library.md)), so it reads as native to the composition rather than pasted on top of its original backdrop.
5. **Video with the same problem** (e.g. subject shot against a plain or green-screen backdrop): apply the same chroma-key-first, matte-fallback treatment before framing it with `VideoFrame`/`DeviceFrame`; do not leave a visibly mismatched backdrop in frame.

### If the needed tool isn't available

Before doing any of the above, check whether an installed Cursor skill or MCP tool already provides background removal/matting or chroma-keying in the current environment. If none is available:

- **Tell the user explicitly** which capability is missing and what you'd need, e.g. a Python package (`pip install rembg`), an npm package (`@imgly/background-removal`), or an API key for a hosted service (remove.bg, Photoroom, Clipdrop) — and ask whether to install/configure it or fall back to the deterministic FFmpeg colorkey path (which needs nothing extra but only works on flat/near-uniform backgrounds).
- **Never silently skip the cleanup and composite an unappealing background anyway** — a flagged-but-unfixed background is a QA finding (see Asset QA below and [11-qa-and-validation.md](11-qa-and-validation.md)), not an acceptable final state.
- This same escalation pattern applies to any other missing capability in the pipeline (e.g. speech-to-text alignment, a specific TTS voice provider, OCR) — surface the gap and ask, rather than improvising a silent workaround. See [10-ai-orchestrator-agents.md](10-ai-orchestrator-agents.md) (Tooling and skill gaps).

## Footage treatment

Footage should normally be:

- cropped deterministically
- masked deterministically
- framed consistently
- color-adjusted consistently
- gently panned/zoomed only when useful

**Do not repeatedly regenerate the same physical event with AI video.** Real footage carries physical reality that generated video cannot faithfully reproduce — treat regeneration as a last resort, not a shortcut.

## AI-generated visual assets

Use image generation for:

- conceptual hero visuals
- isolated object illustrations
- backgrounds
- abstract visual metaphors
- decorative assets

**Do not use generated images where exact factual geometry or text matters.** Diagrams, charts, and UI mockups belong in SVG/HTML/vector form (see [09-remotion-implementation.md](09-remotion-implementation.md)), not as generated raster images.

## Transparency

Generated assets should have:

- stable IDs
- prompt/version metadata
- seed where supported
- generation model metadata
- provenance flag

## Asset QA

Reject:

- incorrect aspect ratio without an explicit crop policy
- corrupted media
- missing alpha when alpha is required
- unreadable text baked into images
- inappropriate compression artifacts
- accidental watermarks/logos
- an asset flagged for background cleanup that was composited without cleanup (unremoved plain/unappealing/inconsistent background)
- an element in the storyboard with no necessity justification (filler asset — see Necessity principle above)
