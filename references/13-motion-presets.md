# Default Motion Presets

These are starting defaults, **not mandatory creative choices** — a project may define its own registered set, but it must still be a *registered* set that the LLM selects from (see [04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md) and [05-design-system-and-motion.md](05-design-system-and-motion.md)).

## Enter

```text
fade
fade_slide_up
fade_slide_down
scale_soft
mask_reveal
stagger_children
```

## Transform

```text
card_expand
panel_split
panel_merge
morph_layout
content_swap
zoom_through
```

## Exit

```text
fade
slide_out
scale_down
mask_close
```

## Ambient

```text
slow_float
micro_scale
subtle_pan
```

**Ambient effects must be disabled by default for dense informational scenes.**

## Transition selection heuristic

Prefer, in this order of priority:

1. `morph_layout` when the next scene is derived from the current composition.
2. `card_expand` when one object becomes the focus.
3. `panel_split` when introducing comparison.
4. `mask_reveal` when revealing media/diagrams.
5. `fade` when semantic continuity is weak or a clean reset is useful.
6. `cut` when timing, contrast or real footage naturally demands it.

**Do not randomize transitions.** Every transition choice should be traceable to one of the six reasons above, or to the "reason a motion must serve" list in [05-design-system-and-motion.md](05-design-system-and-motion.md).
