# Audio and Voiceover

## Principle

**Audio is a timeline driver, not a finishing layer.** Narration timing determines visual beats — do not treat voiceover as something bolted on after the visuals are locked.

## TTS provider selection — always confirm, never silently default

**There is no default TTS provider baked into this harness, and none may be silently assumed.** Unlike background cleanup ([07-asset-pipeline.md](07-asset-pipeline.md)), which has a deterministic no-ask fallback (FFmpeg colorkey), audio generation has **no safe silent fallback** — a wrong or unconfirmed voice is a much more visible/expensive mistake to redo than a re-run of a color-key filter.

Before Phase 5 (Audio) generation begins:

1. Check the creative brief (`creative_brief.json` → `voiceover`) for an already-specified provider/voice. If present, use it — no need to re-ask.
2. If unspecified, **ask the user which TTS provider and voice to use.** When they have no preference, recommend **Google's Gemini API TTS** (`gemini-2.5-flash-preview-tts`, or the newer `gemini-3.1-flash-tts-preview` where available) as the default suggestion: it has a genuinely free tier on Google AI Studio (free input/output tokens, rate-limited, and Google may use the traffic to improve its products) and inexpensive paid-tier pricing beyond that — a reasonable no-cost-to-start default for users without an existing TTS subscription. Recommending it is not the same as silently choosing it — still get explicit confirmation.
3. Check whether a Gemini/Google MCP tool or an installed skill already exposes TTS in the current environment (see [10-ai-orchestrator-agents.md](10-ai-orchestrator-agents.md), Tooling and skill gaps). If not, tell the user it requires a `GEMINI_API_KEY` and the `google-genai` SDK (Python/JS), and ask whether to proceed with that or use a different provider instead.
4. Record the confirmed choice in `audio_manifest.json`'s `voice_profile` (`schemas/audio-manifest.schema.json`) and hold it stable for the whole project, per Voiceover generation below.

## Audio pipeline

```text
brief
  -> script
  -> scene narration
  -> TTS generation
  -> timing extraction/alignment
  -> scene timing
  -> visual beat mapping
  -> music/SFX
  -> mix
```

## Voiceover generation

Generate narration in scene-sized units, not one giant file:

```text
scene_01.wav
scene_02.wav
scene_03.wav
...
```

Maintain a stable voice profile within the project (same voice ID/reference across all scenes unless the project specifically requires multiple voices).

## Voiceover rules

- Natural sentence lengths.
- Avoid unnecessary filler.
- Match requested tone.
- Pronounce technical terms intentionally (verify TTS output for jargon, acronyms, names).
- Separate emphasis from visual decoration.
- Do not overload narration with information that should be visual (charts, exact numbers, spatial relationships — show, don't just tell).
- Preserve user/source terminology.

## Timing

Store, per scene/phrase (a machine-checkable version lives at `schemas/audio-manifest.schema.json` in this skill):

- word/phrase timestamps when available
- sentence timestamps
- scene duration
- emphasis cues

```json
{
  "phrase": "multiple robots",
  "start": 1.83,
  "end": 2.71
}
```

## Visual synchronization

Use speech beats to:

- reveal keywords
- introduce cards
- draw diagrams
- highlight data
- switch media
- change state

**Do not animate every spoken word** — that reads as visual noise, not synchronization. See `timing.beats` in the storyboard scene schema, [04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md).

## Music

Music is subordinate to narration and important visuals.

Implement automatic ducking:

- narration starts -> lower music
- narration ends -> restore gradually

## SFX

Use a limited vocabulary:

- soft click
- UI tick
- subtle whoosh
- soft impact
- reveal tone

Avoid repetitive or exaggerated sound effects.

## Mix checks

Validate before final render (see also [11-qa-and-validation.md](11-qa-and-validation.md)):

- no clipping
- speech intelligibility
- no sudden level jumps
- correct channel layout
- silence/gap handling
- consistent loudness target
