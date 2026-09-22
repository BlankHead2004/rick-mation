# Rick-mation

Domain-neutral, AI-driven motion-graphics skill for Cursor and Claude Code.

It turns a creative brief plus source assets into a deterministic, editable video — without hand-keyframing, and without letting the model freely author arbitrary animation code.

## Briefing video

<video src="https://github.com/user-attachments/assets/604bb9a4-b2da-48d5-8f54-642a0dc8fa0b" controls muted playsinline width="720"></video>

_A short walkthrough of what this skill does and how the pipeline fits together. The file also lives in the repo at [`docs/briefing.mp4`](docs/briefing.mp4)._

```text
user intent -> structured creative plan -> validated storyboard ->
deterministic motion components -> synchronized audio -> render ->
visual QA -> correction -> final
```

**AI decides what to show. Remotion/FFmpeg execute that plan.** The model emits schema-valid JSON/DSL. The renderer owns typography, spacing, animation primitives, transitions, timing, and export.

## What you get

A new user should be able to provide a brief and a folder of assets and receive:

- a script
- a scene plan
- a machine-readable storyboard
- a voiceover
- synchronized visuals
- a rendered preview
- automated QA findings
- a corrected final render

Human review is optional editorial approval or targeted revision — not babysitting every keyframe.

## Pipeline

| Phase | What happens |
|---|---|
| 0. Intake | Read the brief, register assets/references, lock output settings |
| 1. References | Convert reference video/images into implementation rules (only if requested) |
| 2. Content model | Extract facts, claims, entities from source documents |
| 3. Director plan | Purpose, structure, scene list, duration allocation |
| 4. Script | Narration that fits the duration |
| 5. Audio | Confirm TTS, generate scene-level voiceover, extract timing |
| 6. Storyboard | Schema-valid scene JSON using registered layouts/components |
| 7. Assets | Prepare only what each scene needs; clean unappealing backgrounds |
| 8. Preview | Low-res Remotion render |
| 9. QA | Structural + visual + audio checks |
| 10. Repair | Smallest possible fix, then re-render the affected range |
| 11. Final render | Exact requested output spec |
| 12. Verify | File exists, decodes, correct size/fps/duration/audio |

## Install

### Claude Code — marketplace (recommended)

Run these commands inside Claude Code:

```text
/plugin marketplace add BlankHead2004/rick-mation
/plugin install rick-mation@rick-mation-marketplace
/reload-plugins
```

The final command is only needed when Claude Code asks for it. Updates are available through the plugin manager after the marketplace refreshes.

### Claude Desktop Chat/Cowork and claude.ai

1. Download [`rick-mation.zip`](rick-mation.zip).
2. Open **Customize → Skills → + → Upload a skill**.
3. Upload the ZIP, enable `rick-mation`, and start a new chat.

Code execution must be enabled for skills. Chat/Cowork does not load skills from `~/.claude/skills/`.

### Cursor

```powershell
git clone https://github.com/BlankHead2004/rick-mation.git "$env:USERPROFILE\.cursor\skills\rick-mation"
```

macOS/Linux:

```bash
git clone https://github.com/BlankHead2004/rick-mation.git ~/.cursor/skills/rick-mation
```

Start a new agent chat after installation.

### Manual Claude Code install

If marketplace installation is unavailable, clone the repository into:

```text
~/.claude/skills/rick-mation
```

The final file must be `~/.claude/skills/rick-mation/SKILL.md`. Use a real directory, not a symlink or junction.

## Use it

Ask the agent something like:

- “Use rick-mation to make a 90-second explainer from this brief and this asset folder.”
- “Storyboard and render a product walkthrough at 1920×1080, 30 fps.”

With the Claude Code plugin, invoke it explicitly as `/rick-mation:rick-mation`, or describe a matching motion-graphics task and let Claude trigger it automatically.

The agent should:

1. Scaffold a project (`node scripts/scaffold-project.mjs ./my-project`).
2. Fill `creative_brief.json` from your request — and **ask** if style/tone/duration is underspecified.
3. Confirm TTS before generating audio. If you have no preference, it should **recommend Gemini API TTS** (free tier on Google AI Studio) and wait for confirmation.
4. Run phases 0–12, writing intermediate JSON, not just a final MP4.

A complete build includes `final.mp4`, `storyboard.json`, `final_script.md`, `asset_manifest.json`, `qa_report.json`, and `render_log.txt`.

## Layout of this skill

```text
rick-mation/
├── .claude-plugin/         # Claude plugin and marketplace manifests
├── SKILL.md                 # Entry point (keep this; agents read it first)
├── README.md                # You are here
├── references/              # Modular instruction set (01–17)
├── schemas/                 # JSON Schemas for briefs, storyboard, assets, audio, QA
└── scripts/
    └── scaffold-project.mjs # Creates the canonical project tree
```

Open `SKILL.md` for the philosophy, golden rules, and phase table. Open a `references/` file only when doing that phase.

## Runtime stack (for actually rendering)

The skill tells the agent how to plan and implement. Rendering still needs a local project with:

- Node.js (scaffold script needs 16+)
- TypeScript, React, Remotion
- FFmpeg
- A TTS provider (Gemini API TTS is the default recommendation; needs `GEMINI_API_KEY`)
- Optional: background-removal tooling (`rembg`, `@imgly/background-removal`, or a hosted matte API) for complex cutouts

## Non-goals

This is **not** `prompt → generative video model → final MP4`. It will not:

- assume a genre you did not request
- invent a brand voice
- use cinematic AI video as the compositor
- let the LLM write one-off animation code as the normal path
- replace source facts with fabricated visuals
- rasterize ordinary text or bake AI text into images

## License

Use and adapt as needed for your own video-generation work.
