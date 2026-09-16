# AI Orchestrator — Agent Roles and Repair Loop

## Role

Coordinate specialist agents without allowing any single agent to silently change the project's constraints. If you (the agent working this skill) are running this pipeline end-to-end in one session, treat each role below as a distinct **mode/pass** you switch into deliberately — don't blend them into one undifferentiated pass.

## Recommended agent roles

| Agent | Responsibility |
|---|---|
| **A. Intake Agent** | Normalizes the user request. |
| **B. Source Agent** | Extracts facts/assets from user-provided material. |
| **C. Reference Analyst** | Converts reference media into explicit visual/motion rules ([02-creative-brief-intake.md](02-creative-brief-intake.md)). |
| **D. Director Agent** | Builds the narrative/communication plan ([03-director-story-planner.md](03-director-story-planner.md)). |
| **E. Script Agent** | Writes narration and on-screen copy. |
| **F. Storyboard Agent** | Converts the plan into DSL JSON ([04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md)). |
| **G. Asset Agent** | Maps assets to storyboard elements ([07-asset-pipeline.md](07-asset-pipeline.md)). |
| **H. Motion Agent** | Selects registered layouts/animations/transitions ([13-motion-presets.md](13-motion-presets.md)). |
| **I. Voice Agent** | Generates narration ([08-audio-and-voiceover.md](08-audio-and-voiceover.md)). |
| **J. Render Agent** | Invokes Remotion/FFmpeg ([09-remotion-implementation.md](09-remotion-implementation.md)). |
| **K. QA Agent** | Inspects render frames and machine-readable logs ([11-qa-and-validation.md](11-qa-and-validation.md)). |
| **L. Repair Agent** | Makes constrained corrections. |

## Agent communication contract

**Every agent must receive:**

- current project version
- immutable user brief
- applicable source facts
- current schema version
- known constraints
- previous validation failures

**Every agent must produce:**

- structured output
- explicit confidence/uncertainty where appropriate
- changes made
- unresolved issues

## Prohibited behavior

No agent, at any stage, may:

- silently change the purpose of the video;
- invent unsupported factual claims;
- introduce unregistered components;
- introduce arbitrary transitions;
- change the global style without authorization;
- overwrite source assets;
- remove required content without recording the decision;
- claim a QA check passed without performing it.

These map directly onto the non-goals in the skill's top-level philosophy (`SKILL.md`) — treat any violation as a hard stop, not a style preference.

## Tooling and skill gaps

No agent in this pipeline should silently improvise around a missing capability. When a step needs something the current environment doesn't provide — background removal/matting, speech-to-text alignment, a specific TTS voice, OCR, a particular image-generation model, etc. — follow this order:

1. **Check for an existing installed Cursor skill or MCP tool** that already provides the capability (e.g. an image-generation MCP server for stills, a document/PDF skill for source extraction). Use it if present.
2. **If nothing covers it**, tell the user exactly what's missing and what would resolve it — a package to install (e.g. `pip install rembg`, `npm install @imgly/background-removal`), an API key/credential for a hosted service (remove.bg, Photoroom, a TTS provider, etc.), or another Cursor skill to add. Ask whether to install/configure it now. For TTS specifically, there is no silent default — see [08-audio-and-voiceover.md](08-audio-and-voiceover.md); when the user has no provider preference, offer Google's Gemini API TTS as the suggested default (it has a free tier) but still require explicit confirmation before generating anything.
3. **If the user declines or it's unavailable**, use the best deterministic fallback this instruction set defines (e.g. FFmpeg colorkey for flat-background cutouts — see [07-asset-pipeline.md](07-asset-pipeline.md)) and record in the run's logs that a fallback was used instead of the ideal path, so it shows up as a QA note rather than a silent quality regression.
4. **Never fabricate a result** (e.g. claiming a background was removed, or narration was force-aligned, when it wasn't) — an honestly-reported gap is always preferable to a false success.

## Repair loop

```text
render
  |
  v
detect failure
  |
  v
classify:
  CONTENT
  TIMING
  LAYOUT
  ASSET
  AUDIO
  MOTION
  RENDER
  |
  v
apply minimal fix
  |
  v
rerender affected range
  |
  v
revalidate
```

**The repair agent must prefer the smallest change that resolves the failure.** See also [12-prompts-and-guardrails.md](12-prompts-and-guardrails.md) for the exact repair instruction, and [11-qa-and-validation.md](11-qa-and-validation.md) for how failures are detected and classified.
