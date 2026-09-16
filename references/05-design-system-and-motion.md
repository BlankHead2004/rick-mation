# Design System and Motion System

## Principle

The design system is a constraint mechanism. It prevents visual drift across scenes and across separate projects. A project may override the system intentionally, but the override must be explicit and recorded — never silent.

## Design tokens

Maintain a token set covering:

```ts
colors
typography
spacing
radii
borders
shadows
opacity
zIndex
grid
safeArea
motion
```

## Typography rules

- Use a small approved font set.
- Define title/body/caption scales.
- Establish maximum line lengths.
- Establish maximum title lines.
- Use weight and size to create hierarchy before decorative effects.
- **Never rasterize ordinary text.**
- **Never rely on AI-generated text inside image assets.**
- Keep critical text inside safe areas.

## Layout rules

Use a consistent grid. All layouts must derive from:

- page margins
- column widths
- gaps
- baseline spacing

Do not hand-tune every element independently unless necessary — that's how visual drift creeps in.

## Composition cleanliness (no floating/random elements)

A clean output is a **grid-derived** output. Before finalizing any scene composition:

- Every element must sit on a zone/anchor defined by the scene's layout template ([17-layout-template-gallery.md](17-layout-template-gallery.md)), not at an arbitrary hand-picked coordinate.
- Reject the instinct to "add something in the corner because it looks empty." Negative space is a deliberate design choice (see Reference style principle in `SKILL.md`), not a gap to be filled.
- Cap simultaneous foreground elements per scene to what the chosen layout template actually declares zones for. If content needs more, change template, split the scene, or cut content — never overflow into free-floating placement.
- Decorative components ([06-component-library.md](06-component-library.md)) attach to a layout zone or to another element (e.g. an `AccentLine` under a `Title`); they never float independently at a random offset.
- When in doubt, render the scene at low-res preview and check: can you point to a reason ("grid column 2, top zone") for every element's location? If not, fix the layout before moving on.

## Template diversity — do not hardcode one recurring look

The design system constrains *how* things look (tokens, hierarchy, motion physics); it must not collapse into **one hardcoded template reused for every scene of every project.** Concretely:

- Instantiate tokens (palette, font pairing, radii, accent count) freshly per project from the rules in this file — never copy a previous project's exact hex codes/fonts forward as a default "house style" unless the user explicitly asked for brand consistency across projects.
- For any recurring scene purpose (title/identity, media evidence, comparison, diagram/result, evidence grid, closing card, etc.), pick from **multiple registered layout variants**, not always the same one. See [17-layout-template-gallery.md](17-layout-template-gallery.md) for the starting gallery of variants per composition family.
- Two different projects with a similar communication purpose should generally *not* render as visually identical videos with only the text swapped — vary layout variant, grid density, and motion pairing within the same token/registered-component constraints.
- This does not license arbitrary novelty: every variant chosen must still come from the registered gallery/component set and still pass the composition-cleanliness and motion-hierarchy rules above.

## Card rules

Cards should use:

- consistent radius
- consistent border treatment
- consistent shadow depth
- consistent padding

Avoid excessive glassmorphism, glow, blur or 3D unless requested.

## Color rules

Use:

- neutral background
- neutral foreground
- 1–3 semantic accents

Accent colors should have meaning when possible:

- emphasis
- category
- state
- comparison

**Do not apply accents arbitrarily.** If you can't name the semantic reason for a color, don't use it there.

## Motion rules

### Motion hierarchy

**Primary** (carries meaning):
- layout transformation
- reveal
- scale
- slide
- morph

**Secondary** (supports primary):
- stagger
- micro-positioning
- subtle opacity change

**Tertiary** (ambient only):
- ambient motion

**Tertiary motion must never compete with narration.** Disable it by default in dense informational scenes — see [13-motion-presets.md](13-motion-presets.md).

## Motion timing

Define named speeds (theme-configurable, these are conceptual starting values):

```text
fast   = 120–220 ms
normal = 250–450 ms
slow   = 500–850 ms
spring = (physics-based, not a fixed duration)
```

## Motion physics

Use a small number of easing families:

- standard ease
- emphasized ease
- spring
- linear (for technical motion)

Do not combine unrelated easing systems within the same scene — that reads as inconsistent/broken to a viewer even if each individual curve is fine.

## Key rule — every animation needs a reason

An animation must exist to:

- introduce information
- connect information
- focus attention
- show change
- establish continuity
- resolve information

**If no reason exists, remove the animation.** This is the single most important motion rule in this file — apply it as a filter to every enter/active/exit preset choice in the storyboard.
