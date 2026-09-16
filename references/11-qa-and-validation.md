# QA and Validation

## Two-layer QA

### Structural QA

Machine-check:

- invalid JSON
- missing assets
- timeline overlap
- duration mismatch
- unsupported component
- unsupported transition
- missing font
- missing audio
- incorrect render dimensions
- incorrect frame rate
- broken references

This is the same gate described in the storyboard "Validation requirements" ([04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md)) — run it before ever invoking the renderer.

### Visual QA

Sample rendered frames and inspect:

- clipping
- overlap
- text overflow
- tiny unreadable text
- awkward crops
- inconsistent margins
- visual collisions
- unexpected blank frames
- excessively dense scenes
- abrupt transition artifacts
- broken masks
- chart/diagram readability
- elements that don't align to the scene's layout grid/zones (random/floating placement — see [05-design-system-and-motion.md](05-design-system-and-motion.md) Composition cleanliness)
- an asset present with no discernible communicative purpose (filler — see [07-asset-pipeline.md](07-asset-pipeline.md) Necessity principle)
- an unremoved plain/white or otherwise unappealing/inconsistent background behind a composited subject (see [07-asset-pipeline.md](07-asset-pipeline.md) Background cleanup)
- a project whose scenes all reuse the exact same layout variant regardless of content (missed opportunity to draw from [17-layout-template-gallery.md](17-layout-template-gallery.md) — flag as a NOTE/WARNING, not necessarily a blocker)

## Audio QA

Check:

- clipping
- long silence
- missing narration
- unexpected noise
- abrupt level changes
- music overpowering speech
- missing SFX references

## QA severity

```text
BLOCKER
ERROR
WARNING
NOTE
```

**Do not allow final render on unresolved BLOCKER/ERROR issues.**

## Automated sampling

**Do not inspect only the first and last frame.** Sample:

- scene boundaries
- every N seconds
- animation peaks
- transition boundaries
- frames around detected QA issues

## Reference similarity QA

Only when the user requested reference matching. Check:

- layout language
- motion density
- card treatment
- typography hierarchy
- use of negative space
- transition vocabulary
- media framing
- color restraint

**Do not attempt pixel-level recreation unless explicitly requested and technically permitted.**

## Final render checklist

```text
[ ] duration correct
[ ] fps correct
[ ] dimensions correct
[ ] audio present
[ ] narration complete
[ ] all required scenes present
[ ] all required assets present
[ ] no blocker/error QA findings
[ ] title-safe margins respected
[ ] text readable at target resolution
[ ] output encoded successfully
[ ] no floating/randomly placed elements — every element traces to a layout zone
[ ] no unremoved plain/unappealing backgrounds behind composited subjects
[ ] no filler assets without a necessity justification
```

When reporting QA findings back to the Director/Storyboard/Repair agents, follow the exact reporting format in [12-prompts-and-guardrails.md](12-prompts-and-guardrails.md) — never say "looks good" or "needs polish"; always give observable issue + timestamp + target element ID + minimal correction.
