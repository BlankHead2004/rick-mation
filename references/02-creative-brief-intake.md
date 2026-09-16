# Creative Brief and User Input Contract

## Principle

**The user owns the creative objective.** The harness must not infer a genre that was not requested. This is the single most important rule in this file — re-read it before defaulting anything.

## Required user fields

Use this as the intake schema (see also `schemas/creative-brief.schema.json` in this skill for a machine-checkable version):

```json
{
  "purpose": "what this video needs to achieve",
  "topic": "subject",
  "audience": "intended viewers",
  "tone": "described by user",
  "duration_seconds": "user defined",
  "aspect_ratio": "16:9",
  "resolution": "1920x1080",
  "language": "English",
  "voiceover": {
    "required": true,
    "voice_reference": null
  },
  "references": [],
  "assets": [],
  "content_sources": [],
  "visual_preferences": [],
  "visual_restrictions": [],
  "must_include": [],
  "must_avoid": [],
  "cta": null
}
```

All fields may be optional except topic/purpose and output requirements. Missing values should trigger a short internal defaulting procedure, not an invented high-level creative objective. If in doubt, ask the user — do not silently invent purpose, tone, or genre.

## Rules

1. The user's requested use case has priority over any "best practice" template.
2. Do **not** impose, unless the user actually asked for it:
   - sales language
   - marketing language
   - presenter structure
   - product-demo conventions
   - social-media conventions
   - cinematic conventions
3. A reference video defines reusable visual/motion characteristics **only** when the user asks for reference matching. Otherwise treat it as inspiration, not a contract.
4. Preserve the semantic truth of user material. Do not "improve" facts.
5. Never invent claims to fill visual space. An empty beat is better than a fabricated one.
6. When the user provides source documents, **extract facts first, creative treatment second.** Facts are immutable inputs; treatment is a downstream decision.
7. Duration is a constraint, not a reason to add filler. If the content naturally needs less time, say so rather than padding.
8. Use visual-only sections when that communicates better than narration — narration is not mandatory for every beat.
9. Use narration only when it contributes information, framing, or emotional intent.
10. Avoid unnecessary scene changes. Continuity is a virtue, not a limitation.

## Reference analysis contract

For **every** reference file the user supplies, extract this structured record (do not skip fields — leave them empty rather than omitting them):

```json
{
  "layout_language": [],
  "typography_language": [],
  "color_language": [],
  "motion_language": [],
  "transition_families": [],
  "media_treatment": [],
  "information_density": [],
  "pacing_characteristics": [],
  "audio_characteristics": [],
  "things_to_avoid_copying_literally": []
}
```

Do **not** describe the reference merely as "clean", "modern" or "professional" — those words carry no implementation information. Convert every observation into an implementation rule the Director/Storyboard agents can actually apply (e.g. instead of "clean typography", write "titles use a single sans-serif family at 2 weights max, max 2 lines, high contrast against background").

See [16-reference-video-analysis.md](16-reference-video-analysis.md) for a worked example of this contract applied to a real reference video.
