# End-to-End Runbook

This is the operational phase-by-phase checklist for running the whole pipeline on a real project. `SKILL.md` has a condensed version with links back into the topical reference files; this file is the detailed step list.

## Phase 0 — Intake

1. Read user brief.
2. Register any references the user already supplied. **If none were supplied, record `references: []` and move on — do not ask the user for a reference video.** References are an optional input, not a prerequisite.
3. Register all assets.
4. Determine output settings.
5. Record hard constraints.
6. Determine whether voiceover is required.

_Detail: [02-creative-brief-intake.md](02-creative-brief-intake.md)_

## Phase 1 — Analyze references (conditional — usually skipped)

**Run this phase only if the user actually supplied reference media.** If `references` is empty, write `reference_analysis.json` as `[]` and go straight to Phase 2. Do not pause, do not prompt for a reference video, and do not treat its absence as missing information — the harness derives its visual language from the design system ([05-design-system-and-motion.md](05-design-system-and-motion.md)) and template gallery ([17-layout-template-gallery.md](17-layout-template-gallery.md)), which need no reference at all.

When references were supplied, extract:
- composition
- typography
- colors
- motion
- transitions
- audio rhythm
- media framing
- information density

Turn them into rules.

_Detail: [02-creative-brief-intake.md](02-creative-brief-intake.md) (Reference analysis contract), [16-reference-video-analysis.md](16-reference-video-analysis.md)_

## Phase 2 — Build content model

Extract:
- claims
- facts
- entities
- sequences
- numbers
- important terms
- source attribution requirements

## Phase 3 — Director plan

Create:
- purpose statement
- audience model
- narrative structure
- scene list
- duration allocation

_Detail: [03-director-story-planner.md](03-director-story-planner.md)_

## Phase 4 — Script

Write and validate narration.

Do not exceed target duration unless explicitly allowed.

## Phase 5 — Audio

Generate scene-level TTS.

Create timing metadata.

_Detail: [08-audio-and-voiceover.md](08-audio-and-voiceover.md)_

## Phase 6 — Storyboard

Produce schema-valid JSON.

Validate before rendering.

_Detail: [04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md)_

## Phase 7 — Assets

Prepare:
- crops
- thumbnails
- metadata
- SVGs
- generated stills
- media references

_Detail: [07-asset-pipeline.md](07-asset-pipeline.md)_

## Phase 8 — Render preview

Render at reduced resolution.

_Detail: [09-remotion-implementation.md](09-remotion-implementation.md)_

## Phase 9 — QA

Perform:
- structural validation
- visual inspection
- audio validation

_Detail: [11-qa-and-validation.md](11-qa-and-validation.md)_

## Phase 10 — Repair

Make minimal targeted fixes.

_Detail: [10-ai-orchestrator-agents.md](10-ai-orchestrator-agents.md) (Repair loop), [12-prompts-and-guardrails.md](12-prompts-and-guardrails.md) (Repair instruction)_

## Phase 11 — Final render

Render exactly to requested output specification.

## Phase 12 — Final verification

Verify the output file:
- exists
- decodes
- correct dimensions
- correct frame rate
- correct duration
- includes audio when required

## Final deliverables

```text
final.mp4
storyboard.json
final_script.md
asset_manifest.json
qa_report.json
render_log.txt
```

**The intermediate files are part of the reproducible build record** — a run that only produces `final.mp4` is not a complete build (see [01-system-architecture.md](01-system-architecture.md) and [09-remotion-implementation.md](09-remotion-implementation.md)).
