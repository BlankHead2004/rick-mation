# Layout Template Gallery

## Objective

This is the **modularity fix for recurring video styles.** Instead of one hardcoded template per scene purpose, this file gives the Storyboard/Director agent a *menu* of registered layout variants per composition family, so different projects genuinely look different from each other while still passing the design-system, composition-cleanliness, and component-registry rules ([05-design-system-and-motion.md](05-design-system-and-motion.md), [06-component-library.md](06-component-library.md)).

`layout.type` in the storyboard scene schema ([04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md)) names the composition family below; `layout.variant` names one of its variants (or a project-specific extension — see "Extending the gallery").

**Selection rule:** pick the variant that best fits *this scene's actual content and purpose* — never the variant that was simply used last, used in a previous project, or is "the default." If two variants fit equally well, prefer the one not yet used elsewhere in the current project, to keep the piece visually varied.

## Composition families and their variants

### `title_card` — opening/closing identity

- **`centered_mark`** — centered title/logo, generous margins, optional single supporting line beneath.
- **`left_anchored`** — title block anchored left third, right two-thirds left as pure negative space or a single supporting visual.
- **`full_bleed_typographic`** — title fills the safe area as the dominant visual event (large `KineticText`/`Title`), no supporting imagery.
- **`framed_context`** — title/logo inside a bordered panel over a subdued background media loop.

### `media_hero` — a single piece of footage/image carries the scene

- **`full_frame`** — media fills the safe area edge-to-edge (respecting crop policy), minimal or no overlay text.
- **`framed_device`** — media placed inside a `DeviceFrame`/`BrowserFrame`, generous surrounding margin.
- **`media_with_context_panel`** — large media card plus a smaller adjacent panel (caption, metric, or label) that annotates it.
- **`pan_zoom_focus`** — single media asset with a deliberate, purpose-driven pan/zoom (see `PanZoomMedia` in [06-component-library.md](06-component-library.md)) to direct attention within the frame.

### `two_column` — comparison / pairing

- **`media_compare`** — two media items side by side (`VideoCompare`/`ImageCompare`).
- **`text_vs_media`** — explanatory text/list on one side, supporting media on the other.
- **`stacked_panels`** — two horizontally stacked panels (top/bottom) instead of left/right, for vertical/9:16 output.
- **`before_after`** — same subject in two states, connected by a shared axis/label.

### `evidence_grid` — multiple supporting items at once

- **`uniform_grid`** — `MediaGrid`/`Grid` of equal-weight cards (e.g. 2x2, 3x2).
- **`hero_plus_grid`** — one larger featured card plus a smaller supporting grid around/beside it.
- **`staggered_reveal_grid`** — same grid, but cards enter with `stagger_children` to control read order (only when the reveal itself carries meaning — see motion rules).

### `diagram_result` — relationships, process, or data

- **`flow_horizontal`** / **`flow_vertical`** — `ProcessFlow`/`Pipeline` laid out along one axis.
- **`hierarchy_tree`** — `Hierarchy`/`Graph` for parent/child or category relationships.
- **`architecture_map`** — `ArchitectureDiagram` for system/spatial relationships.
- **`chart_focus`** — a single `BarChart`/`LineChart`/`PieChart`/`Table` as the dominant element, minimal chrome.

### `typographic_statement` — text as the primary visual event

- **`single_line_reset`** — one large statement, full-width, used as a pacing break (see visual rhythm in [03-director-story-planner.md](03-director-story-planner.md)).
- **`highlighted_phrase`** — a short passage with `HighlightedText`/`KineticText` drawing the eye to specific words in sync with narration beats.
- **`numbered_callout`** — a `Number`/`Metric` paired with a short label, for a single standout statistic.

### `split_view` — simultaneous dual context

- **`primary_secondary`** — one dominant zone plus one narrow supporting rail (e.g. main content + running label/legend).
- **`timeline_strip`** — a `Timeline` component along one edge, main content occupying the rest.

## Extending the gallery

A project may register its own additional variants (e.g. a brand-specific `title_card` treatment). New variants must still:

- derive their zones from the grid/margin/gap tokens in [05-design-system-and-motion.md](05-design-system-and-motion.md);
- be built only from registered components ([06-component-library.md](06-component-library.md));
- pass composition-cleanliness (every element on a declared zone, no floating elements);
- get added to this file (or a project-local copy of it) so future scenes/projects can discover and reuse them — a one-off inline layout that isn't registered anywhere is exactly the "hardcoded, non-modular" failure mode this file exists to prevent.

## Anti-patterns

- Always choosing `centered_mark` for every title card across every project because it's the safest choice.
- Reusing the exact same `evidence_grid` variant + the exact same stagger timing in every project regardless of content.
- Inventing a one-off absolute-position layout for a single scene instead of adding a real variant here.
- Treating this list as exhaustive rather than a starting gallery — add variants as new composition needs arise, following the constraints above.
