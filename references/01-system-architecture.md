# System Architecture

Source of truth: this is the compiler-like pipeline the whole harness implements. Every other reference file describes one stage or one cross-cutting concern of this architecture.

## 1. Pipeline

```text
INPUTS
  +-- user brief
  +-- references
  +-- source documents
  +-- source images/videos
  +-- logos/fonts/brand assets
  +-- data
  |
  v
INGESTION
  |
  v
CONTENT MODEL
  |
  v
DIRECTOR / STORY PLANNER
  |
  v
SCRIPT + NARRATION PLAN
  |
  v
STORYBOARD DSL
  |
  +-------------------+
  |                   |
  v                   v
ASSET PLAN        AUDIO PLAN
  |                   |
  v                   v
ASSET PREP         TTS/STEM GENERATION
  |                   |
  +---------+---------+
            v
       TIMELINE BUILD
            |
            v
      MOTION RENDERER
            |
            v
       LOW-RES PREVIEW
            |
            v
      VISION + RULE QA
            |
       +----+----+
       |         |
      FAIL      PASS
       |         |
       v         v
    REPAIR     FINAL RENDER
       |
       +--> revalidate
```

## 2. Layer separation

- **Layer A — Intent.** Defines what the user wants.
- **Layer B — Content.** Defines what must be said/shown.
- **Layer C — Composition.** Defines where information appears.
- **Layer D — Motion.** Defines how composition changes over time.
- **Layer E — Rendering.** Executes all geometry and timing.
- **Layer F — QA.** Checks the output without changing creative intent unless explicitly instructed.

Never let a later layer silently overrule an earlier one. If Layer E (rendering) needs something Layer C (composition) didn't provide, that is a validation failure to bounce back up the chain, not a reason to invent content in the renderer.

## 3. Determinism

The following **must** be deterministic (same inputs -> same output, every run):

- layout algorithms
- typography
- component geometry
- transition implementation
- easing curves
- chart generation
- diagram generation
- cropping rules
- safe-area handling
- render settings
- asset identification
- scene timing after timing data is locked

Randomness may be used only for optional asset ideation (e.g. brainstorming multiple hero-image prompt variants) and should be seeded/versioned when possible so a run can be reproduced.

## 4. Re-render strategy

Every scene must be independently addressable. Design the render CLI/pipeline so these are all valid, cheap operations:

```bash
render --scene intro
render --scene 07
render --from 12 --to 19
render --preview
render --final
```

A one-line script edit must never force recreation of unrelated assets. If it does, the pipeline is architected wrong — fix caching/addressing before shipping more features.

## 5. State — persisted project artifacts

```text
project/
  input/
  references/
  assets/
  source/
  scripts/
  storyboard/
  audio/
  generated/
  previews/
  renders/
  qa/
  logs/
```

Recommended persistent project files (the "build record"):

```text
project.json
creative_brief.json
content_map.json
storyboard.json
asset_manifest.json
audio_manifest.json
render_config.json
qa_report.json
```

See [14-project-template.md](14-project-template.md) for the full directory tree and the minimum persistent contract, and `scripts/scaffold-project.mjs` in this skill to generate it automatically.

## 6. Versioning

Record, for every run, so it is fully reproducible:

- LLM/model IDs where relevant
- TTS voice/model ID
- prompt/instruction version
- storyboard version
- design-system version
- component-library version
- source asset hashes
- render settings
- timestamp

Treat this like a build manifest, not optional metadata — QA and repair loops depend on being able to diff two runs.
