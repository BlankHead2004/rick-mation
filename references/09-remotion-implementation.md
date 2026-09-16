# Remotion Implementation

## Project structure

```text
src/
  compositions/
  components/
  motion/
  transitions/
  themes/
  layouts/
  data/
  audio/
  assets/
  validators/
  render/
  utils/
```

## Composition architecture

```tsx
<MainComposition
  project={project}
  storyboard={storyboard}
  theme={theme}
/>
```

The composition should resolve:

- scenes
- frames
- components
- audio
- transitions

## Timing

Use frames as the authoritative render unit.

```ts
const frame = useCurrentFrame();
const fps = useVideoConfig().fps;
const seconds = frame / fps;
```

All scene durations should ultimately resolve to frame counts.

## Scene rendering

Each scene should be a **pure function** of:

- scene JSON
- current frame
- theme
- assets

Avoid hidden mutable state. This is what makes independent re-rendering of any scene (`render --scene 07`, see [01-system-architecture.md](01-system-architecture.md)) safe.

## Interpolation

Centralize interpolation helpers, e.g.:

```ts
fadeIn(frame, start, duration)
slideIn(frame, start, duration, distance)
springValue(frame, config)
stagger(index, baseDelay, step)
```

Every motion preset in [13-motion-presets.md](13-motion-presets.md) should resolve to a call into this shared helper library — never a one-off calculation inline in a scene component.

## Media

For all videos:

- validate metadata
- define crop strategy
- define object positioning
- define playback range
- support optional time remapping only when necessary

## Text measurement

Implement deterministic text measurement/wrapping.

**Never depend on screenshot-based manual placement for ordinary text.**

## SVG

Use SVG for:

- diagrams
- charts
- connectors
- icons
- precise vector illustrations

SVG text remains selectable/renderable rather than being baked into generated images — this is why diagrams/charts must never be generated as raster images (see [07-asset-pipeline.md](07-asset-pipeline.md)).

## Rendering modes

- **Preview** — low resolution / reduced quality / fast.
- **Review** — full resolution but optimized for validation.
- **Final** — exact requested output settings.

## CLI-level operations

Recommended:

```bash
generate:plan
generate:script
generate:audio
generate:assets
render:preview
qa:visual
qa:structural
repair
render:final
```

## Rule

**A successful generation run must leave behind all machine-readable intermediate artifacts.** The final MP4 alone is not considered a complete build — see the persisted-state list in [01-system-architecture.md](01-system-architecture.md) and the final-deliverables list in [15-end-to-end-runbook.md](15-end-to-end-runbook.md).
