---
name: rick-mation
description: >-
  Rick-mation plans and builds domain-neutral, AI-driven motion-graphics videos
  through a deterministic pipeline: creative brief -> director/story plan ->
  storyboard DSL -> design system & component library -> asset pipeline ->
  audio/TTS timing -> Remotion+FFmpeg render -> automated QA -> minimal repair
  -> final render. Use whenever the user asks for rick-mation, to generate,
  storyboard, script, animate, or render an explainer, product, research,
  tutorial, social, or any other motion-graphics/animated video
  programmatically (e.g. with Remotion, React, TypeScript, FFmpeg), asks to
  design a video-generation harness or multi-agent video pipeline, or mentions
  storyboard DSL, motion presets, scene JSON, narration timing/TTS alignment,
  or AI video orchestration/QA.
---

# Rick-mation

A reusable, domain-neutral harness for turning a creative brief + source
assets into a deterministic, editable, programmatic video — without hand
keyframing and without letting an LLM freely author arbitrary animation code.

## The soul of this skill — read this first

Do not solve "make me a video" as:

```text
prompt -> generative video model -> final video
```

Solve it as:

```text
user intent -> structured creative plan -> validated storyboard ->
deterministic motion components -> synchronized audio -> render ->
visual QA -> correction -> final
```

**AI makes editorial and compositional decisions. The rendering system executes those decisions deterministically.** Concretely:

```text
LLM -> schema -> validator -> renderer
```

The **renderer** owns: typography, spacing, animation primitives, transition implementations, safe areas, timing interpolation, asset loading, rendering, export settings.

The **planner** (LLM) owns: story, sequence, emphasis, scene purpose, content selection, asset choice, layout selection, transition selection, narration segmentation.

The LLM normally emits **structured JSON/DSL, never arbitrary production code.** This single rule is what keeps output consistent across scenes and across projects — do not bypass it "just this once" by writing bespoke per-scene animation code.

### This harness is domain-neutral — the biggest failure mode to avoid

The user supplies purpose, topic, audience, tone, duration, aspect ratio, references, assets, narration requirements, visual constraints, brand constraints, and factual/source requirements. **Do not assume** the output is an advertisement, product showcase, research presentation, explainer, social video, launch film, tutorial, or documentary unless the user said so. Concretely, never:

- assume a specific video genre;
- force every project into an advertisement/presentation/showcase format;
- invent a brand voice unless the user asks for one;
- use cinematic AI video generation as the primary compositor;
- let an LLM freely author arbitrary animation code as the normal workflow;
- replace factual source material with fabricated visuals;
- generate technical diagrams as raster images when they can be rendered as vectors/UI;
- optimize only for visual spectacle.

### Primary goals (what "good" looks like)

1. High consistency across scenes and across separate projects.
2. Minimal human intervention.
3. Deterministic and repeatable rendering.
4. Easy scene-level revisions.
5. Accurate text, diagrams, charts, UI and labels.
6. Reuse of real user-provided footage whenever appropriate.
7. AI generation only where it adds value.
8. Strong synchronization between narration, visual emphasis and motion.
9. Automated validation before final export.
10. Separation of content decisions from implementation details.

### Definition of success

A user provides a brief and a folder of assets and receives: a script, a scene plan, a machine-readable storyboard, a voiceover, synchronized visuals, a rendered preview, automated QA findings, and a corrected final render — **without manually keyframing scenes.** Human review should primarily be optional editorial approval or targeted revision, not required babysitting.

## Recommended stack

- **Core:** TypeScript, React, Remotion, FFmpeg
- **Supporting:** SVG/HTML/CSS for diagrams and UI; an API-based TTS provider for narration; an LLM for planning and validation; an image generation model for isolated visual assets when needed; optional Rive for complex reusable vector animation; optional speech-to-text/alignment tooling for timing analysis.

## Reference style principle

**References are optional. Never ask the user for a reference video** — if none was supplied, set `references: []`, skip Phase 1, and derive the visual language from the design system ([05](references/05-design-system-and-motion.md)) and template gallery ([17](references/17-layout-template-gallery.md)) instead. Most projects run with no reference at all.

When the user *does* supply one, a reference video is a **visual grammar reference, not a literal template.** Useful characteristics to extract: restrained composition, abundant negative space, typography-led communication, modular cards/panels, embedded video/media, diagrams built from simple geometry, limited accent colors, coherent motion language, progressive disclosure, strong narration-to-visual synchronization, reusable layout families. The exact palette, fonts, labels, logos, subject matter, pacing and content must always be derived from the user's own project — never blindly copied. See [16-reference-video-analysis.md](references/16-reference-video-analysis.md) for a worked example of turning a reference into implementation rules.

## Reference map

Everything below is progressive disclosure — read the specific file when you're doing that piece of work, not all of them up front.

| # | File | Read this when you're... |
|---|---|---|
| 01 | [references/01-system-architecture.md](references/01-system-architecture.md) | designing/recalling the overall pipeline, layer separation, determinism rules, re-render addressing, persisted state, versioning |
| 02 | [references/02-creative-brief-intake.md](references/02-creative-brief-intake.md) | taking in the user's brief and analyzing reference media |
| 03 | [references/03-director-story-planner.md](references/03-director-story-planner.md) | acting as Director: building the narrative/scene plan |
| 04 | [references/04-storyboard-dsl-spec.md](references/04-storyboard-dsl-spec.md) | authoring or validating `storyboard.json` (scenes, elements, transitions, beats) |
| 05 | [references/05-design-system-and-motion.md](references/05-design-system-and-motion.md) | defining/using design tokens, typography, cards, color, motion hierarchy & timing |
| 06 | [references/06-component-library.md](references/06-component-library.md) | choosing or building the finite component set the storyboard composes |
| 07 | [references/07-asset-pipeline.md](references/07-asset-pipeline.md) | ingesting, selecting, treating, or generating visual assets |
| 08 | [references/08-audio-and-voiceover.md](references/08-audio-and-voiceover.md) | scripting narration, generating TTS, timing, music/SFX/mix |
| 09 | [references/09-remotion-implementation.md](references/09-remotion-implementation.md) | writing the actual Remotion/React implementation |
| 10 | [references/10-ai-orchestrator-agents.md](references/10-ai-orchestrator-agents.md) | coordinating multiple agent roles and running the repair loop |
| 11 | [references/11-qa-and-validation.md](references/11-qa-and-validation.md) | running structural/visual/audio QA and the final checklist |
| 12 | [references/12-prompts-and-guardrails.md](references/12-prompts-and-guardrails.md) | you need the exact system instruction text for whichever agent role you're playing right now |
| 13 | [references/13-motion-presets.md](references/13-motion-presets.md) | picking an enter/transform/exit/ambient preset or a transition |
| 14 | [references/14-project-template.md](references/14-project-template.md) | setting up a new project's folder structure |
| 15 | [references/15-end-to-end-runbook.md](references/15-end-to-end-runbook.md) | you want the detailed phase-by-phase checklist (the condensed version is below) |
| 16 | [references/16-reference-video-analysis.md](references/16-reference-video-analysis.md) | you want a worked example of the reference-analysis contract |
| 17 | [references/17-layout-template-gallery.md](references/17-layout-template-gallery.md) | picking a layout variant for a scene — the modularity fix that keeps projects from converging on one hardcoded recurring look |

**Also available, not just markdown:**

- `schemas/*.schema.json` — machine-checkable JSON Schemas for `creative_brief.json`, a `storyboard.json` scene, an `asset_manifest.json` entry, `audio_manifest.json`, `render_config.json`, and `qa_report.json`. Validate artifacts against these before treating a phase as complete.
- `scripts/scaffold-project.mjs` — Node.js (no dependencies) script that generates the full project directory tree from [14-project-template.md](references/14-project-template.md) plus schema-shaped stub JSON files. Run: `node <skill-dir>/scripts/scaffold-project.mjs <target-dir>`.

## Workflow — run these phases in order

This is the condensed runbook; see [15-end-to-end-runbook.md](references/15-end-to-end-runbook.md) for full detail on every phase.

| Phase | Do | Produces |
|---|---|---|
| 0. Intake | Read brief, register whatever references/assets were supplied (never solicit more), determine output settings & hard constraints, decide if voiceover is required | `creative_brief.json`, `asset_manifest.json` (registered, not yet processed) |
| 1. Analyze references | **Skip unless the user supplied reference media.** If they did, extract composition/typography/color/motion/transitions/audio/media-framing/density into rules | `reference_analysis.json` (`[]` when skipped) |
| 2. Content model | Extract claims, facts, entities, sequences, numbers, key terms, attribution requirements from source docs | `content_map.json` |
| 3. Director plan | Purpose statement, audience model, narrative structure, scene list, duration allocation ([03](references/03-director-story-planner.md)) | scene plan |
| 4. Script | Write & validate narration; do not exceed target duration unless explicitly allowed | `final_script.md` |
| 5. Audio | Confirm TTS provider/voice with the user (suggest Gemini API TTS if no preference); generate scene-level TTS; extract timing metadata ([08](references/08-audio-and-voiceover.md)) | `audio_manifest.json`, `audio/voice/scene_NN.wav` |
| 6. Storyboard | Produce schema-valid JSON; pick each scene's layout variant from the gallery ([17](references/17-layout-template-gallery.md)); place every element on a grid zone, never floating; validate before rendering ([04](references/04-storyboard-dsl-spec.md)) | `storyboard.json` |
| 7. Assets | Resolve only what each scene needs (no speculative bulk pull); prepare crops/thumbnails/metadata/SVGs/generated stills; clean up unappealing backgrounds ([07](references/07-asset-pipeline.md)) | processed `assets/` |
| 8. Render preview | Render at reduced resolution ([09](references/09-remotion-implementation.md)) | `previews/*.mp4` |
| 9. QA | Structural + visual + audio validation ([11](references/11-qa-and-validation.md)) | `qa_report.json` |
| 10. Repair | Minimal targeted fixes only, then re-render the affected range and revalidate ([10](references/10-ai-orchestrator-agents.md), [12](references/12-prompts-and-guardrails.md)) | patched artifacts |
| 11. Final render | Render exactly to requested output spec | `renders/final.mp4` |
| 12. Final verification | Confirm the file exists, decodes, and matches dimensions/fps/duration/audio requirements | verified deliverable |

**Final deliverables** are the whole set, not just the video: `final.mp4`, `storyboard.json`, `final_script.md`, `asset_manifest.json`, `qa_report.json`, `render_log.txt`. A run that only produces the MP4 is not a complete build.

## Agent roles (if orchestrating this as multiple passes/agents)

Intake -> Source -> Reference Analyst -> Director -> Script -> Storyboard -> Asset -> Motion -> Voice -> Render -> QA -> Repair. Full responsibilities and the exact system instructions for each role are in [10-ai-orchestrator-agents.md](references/10-ai-orchestrator-agents.md) and [12-prompts-and-guardrails.md](references/12-prompts-and-guardrails.md). Even running solo, switch modes deliberately between these roles rather than blending them.

## Golden rules (the non-negotiables — internalize these)

- The user owns the creative objective; never infer an unrequested genre, brand voice, or sales/marketing/presenter convention.
- Never invent facts/claims to fill visual space; extract facts from sources first, apply creative treatment second.
- Duration is a constraint, not a license to add filler.
- **No floating/random placement.** Every element must resolve to a position on its layout template's declared grid/zones; empty space is deliberate negative space, not a gap to fill with a stray element ([04](references/04-storyboard-dsl-spec.md), [05](references/05-design-system-and-motion.md)).
- **Pull assets on demand, never speculatively.** An asset is only included because the scene's stated purpose needs it — resolve assets scene-by-scene against the storyboard, not as a bulk up-front dump ([07-asset-pipeline.md](references/07-asset-pipeline.md)).
- **Clean up unappealing backgrounds before compositing.** Plain/white/busy/inconsistent backgrounds get deterministic color-keying first, AI matting as a fallback — never composited as-is ([07-asset-pipeline.md](references/07-asset-pipeline.md)).
- **Don't hardcode one recurring template/style.** Pick per-scene layout variants from a registered gallery ([17-layout-template-gallery.md](references/17-layout-template-gallery.md)); re-instantiate design tokens per project rather than carrying forward a fixed "house style" unless the user asked for brand consistency.
- Every animation needs a reason (introduce, connect, focus, show change, establish continuity, resolve) — if you can't name one, remove the animation.
- The LLM chooses only from **registered** components, transitions, and motion presets — it never invents new rendering primitives or writes ad hoc animation code.
- Never rasterize ordinary text; never bake AI-generated text into an image; never generate diagrams/charts as raster images when they can be vector/SVG.
- Never regenerate a user's real footage/objects with AI merely because generation is easier; prefer authoritative user assets > source-document figures > generated vectors > generated stills > licensed assets > synthetic filler.
- No agent may silently change the video's purpose, introduce unregistered components/transitions, alter global style without authorization, overwrite source assets, or claim a QA check passed without performing it.
- QA must report the observable issue, exact timestamp, and target element ID, and propose the minimal correction — never "looks good" / "needs polish".
- A repair changes the smallest possible surface: it must not rewrite unrelated scenes, change the theme, alter approved narration, or replace source assets unless the failure specifically requires it.
- Everything that should be deterministic (layout, typography, geometry, transitions, easing, charts, diagrams, cropping, safe areas, render settings, scene timing after lock) must actually be deterministic — reserve randomness for seeded/versioned asset ideation only.
- **When a needed capability isn't available** (background removal, alignment tooling, a TTS voice, etc.), check for an existing skill/MCP tool, then ask the user to install/configure one — never silently skip the step or fake the result ([10-ai-orchestrator-agents.md](references/10-ai-orchestrator-agents.md)).
- **Never silently default the TTS provider/voice.** Always confirm with the user before Phase 5 generation; if they have no preference, suggest Gemini API TTS (free tier) as the default recommendation — but still require explicit confirmation, not silent selection ([08-audio-and-voiceover.md](references/08-audio-and-voiceover.md)).

## Quick start for a new project

1. Scaffold: `node <skill-dir>/scripts/scaffold-project.mjs ./my-project`
2. Fill in `input/brief.md` and `creative_brief.json` from the actual user request — validate against `schemas/creative-brief.schema.json`.
3. Work Phases 0–12 above in order, reading the linked reference file for each phase as you reach it.
4. Never skip the structural-validation gate before rendering (Phase 6/9) and never ship a final render with unresolved BLOCKER/ERROR QA findings (Phase 9, [11-qa-and-validation.md](references/11-qa-and-validation.md)).
