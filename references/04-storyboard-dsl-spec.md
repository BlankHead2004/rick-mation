# Storyboard DSL Specification

## Objective

This schema is **the interface between AI planning and deterministic rendering.** Everything upstream (Director, Script, Asset, Motion agents) must resolve into this JSON. Everything downstream (Remotion renderer) consumes only this JSON — never free-form instructions.

A machine-checkable version of the scene schema lives at `schemas/storyboard-scene.schema.json` in this skill.

## Scene schema

```json
{
  "id": "scene_07",
  "start": 42.2,
  "duration": 5.8,
  "purpose": "compare two behaviors",
  "narration": {
    "text": "..."
  },
  "layout": {
    "type": "two_column",
    "variant": "media_compare"
  },
  "elements": [],
  "transitions": {
    "in": "soft_reveal",
    "out": "morph_layout"
  },
  "audio": {
    "music_level_db": -24,
    "sfx": []
  },
  "timing": {
    "beats": []
  }
}
```

## Element schema

Supported element types should initially include (extend deliberately, not ad hoc — see [06-component-library.md](06-component-library.md) for the components that implement each):

```text
text
rich_text
image
video
svg
icon
card
group
line
arrow
chart
table
metric
badge
logo
shape
mask
caption
device_frame
browser_frame
```

## Animation schema

```json
{
  "enter": {
    "preset": "fade_slide_up",
    "duration_frames": 18,
    "delay_frames": 0,
    "stagger_frames": 3
  },
  "active": {
    "preset": "subtle_float"
  },
  "exit": {
    "preset": "fade",
    "duration_frames": 12
  }
}
```

Presets referenced here must come from the registered library in [13-motion-presets.md](13-motion-presets.md). The LLM never invents a preset name.

## Allowed transition names

Start with a controlled set — **the LLM must choose only from this registered list:**

```text
cut
fade
soft_reveal
slide_left
slide_right
slide_up
slide_down
wipe
mask_reveal
card_expand
zoom_through
morph_layout
content_swap
panel_split
panel_merge
```

## Positioning

Prefer semantic positioning:

```json
{
  "anchor": "center_right",
  "offset": {"x": 0, "y": 0},
  "max_width": 720
}
```

...over raw absolute coordinates. Absolute coordinates are allowed only for special compositions where semantic anchoring genuinely cannot express the intent.

### No floating/random placement — every element must have a grid role

**An element with no `anchor` and no `absolute` block, or one whose position was picked arbitrarily "to fill space", is a defect, not a stylistic choice.** Concretely:

- Every element in `elements[]` must resolve to a position derived from the scene's `layout.type`/`layout.variant` grid (columns, zones, safe area) — see [05-design-system-and-motion.md](05-design-system-and-motion.md) (Layout rules) and [17-layout-template-gallery.md](17-layout-template-gallery.md) for the registered grids/zones a layout can expose.
- Do not scatter secondary elements (icons, badges, decorative shapes) at arbitrary offsets just because there is empty space. Empty space is intentional negative space, not a placement problem to solve.
- If a scene has more elements than its chosen layout template has declared zones for, the fix is to choose a layout with more zones, split into two scenes, or cut an element — never to free-place the overflow.
- `absolute` positioning, when genuinely required, still needs a stated reason attached to the element (e.g. `"positionReason": "overlay caption pinned to a fixed video crop"`); an absolute block with no reason is treated the same as an unregistered effect (see Validation requirements below).

## Asset necessity — no filler

Every element of type `image`, `video`, `svg`, `chart`, `table`, `icon`, `logo`, or `device_frame`/`browser_frame` must trace back to the scene's stated `purpose`. Before adding a visual element, ask: *does this scene's communication objective require this asset, or is it here to occupy space?* If you can't answer with the former, don't include it. This mirrors the Director's asset usage plan ([03-director-story-planner.md](03-director-story-planner.md)) and the Necessity principle in [07-asset-pipeline.md](07-asset-pipeline.md) — the storyboard is where that principle becomes enforceable per-element.

## Timeline beats

A beat may be attached to:

- narration word/phrase
- audio transient
- scene-relative time
- media cue

```json
{
  "at": 1.75,
  "action": "emphasize",
  "target": "headline_2"
}
```

Beats are how narration drives visuals — see [08-audio-and-voiceover.md](08-audio-and-voiceover.md) for how they're produced from TTS timing data.

## Validation requirements

**Reject** the storyboard (send back to the authoring agent, do not attempt to render) if:

- scene overlap is invalid;
- timings are negative;
- referenced assets do not exist;
- component types are unknown;
- transition names are unregistered;
- font is unavailable;
- text violates configured length limits;
- unsupported effects are requested;
- required fields are missing;
- an element has no `anchor` and no justified `absolute` block (random/floating placement — see Positioning above);
- an element's `type` is a visual/media type but no `purpose`-linked reason is recorded for including it (filler asset — see Asset necessity above);
- the element count for a scene exceeds the declared zone count of its `layout.type`/`layout.variant` (overcrowded/cluttered composition).

This validation gate is what makes the `LLM -> schema -> validator -> renderer` rule (see [00 in SKILL.md](../SKILL.md)) actually enforceable rather than aspirational.
