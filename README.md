# Rick-mation

Domain-neutral, AI-driven motion-graphics skill for Cursor and Claude Code.

It turns a creative brief plus source assets into a deterministic, editable video — without hand-keyframing, and without letting the model freely author arbitrary animation code.

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

The skill is a folder named `rick-mation` that contains `SKILL.md`. Put that folder in the **user skills** directory for the tool you use. Do not nest it extra (`skills/rick-mation/rick-mation` will not load).

### Claude Code (native)

```powershell
git clone https://github.com/BlankHead/rick-mation.git "$env:USERPROFILE\.claude\skills\rick-mation"
```

macOS / Linux:

```bash
git clone https://github.com/BlankHead/rick-mation.git ~/.claude/skills/rick-mation
```

Restart Claude Code or start a new session. Confirm with `/skills`. Trigger by asking for a motion-graphics video, or by naming **rick-mation**.

If Claude Code was previously given a symlink at that path, remove it first (`rmdir` on Windows, `unlink` on Unix) and clone into a real directory. Staging scans often skip junction/symlink trees.

### Cursor

```powershell
git clone https://github.com/BlankHead/rick-mation.git "$env:USERPROFILE\.cursor\skills\rick-mation"
```

macOS / Linux:

```bash
git clone https://github.com/BlankHead/rick-mation.git ~/.cursor/skills/rick-mation
```

Start a new Cursor agent chat after install.

### Project-local (optional)

To share the skill with a single repo instead of all projects:

```text
<your-repo>/.claude/skills/rick-mation/     # Claude Code
<your-repo>/.cursor/skills/rick-mation/     # Cursor
```

Clone or copy the same tree into that path.

### Update

```powershell
cd "$env:USERPROFILE\.claude\skills\rick-mation"   # or .cursor\skills\rick-mation
git pull
```

If you keep copies in both Claude Code and Cursor, they are independent. Pull in each place (or copy after editing).

## Use it

Ask the agent something like:

- “Use rick-mation to make a 90-second explainer from this brief and this asset folder.”
- “Storyboard and render a product walkthrough at 1920×1080, 30 fps.”

The agent should:

1. Scaffold a project (`node scripts/scaffold-project.mjs ./my-project`).
2. Fill `creative_brief.json` from your request — and **ask** if style/tone/duration is underspecified.
3. Confirm TTS before generating audio. If you have no preference, it should **recommend Gemini API TTS** (free tier on Google AI Studio) and wait for confirmation.
4. Run phases 0–12, writing intermediate JSON, not just a final MP4.

A complete build includes `final.mp4`, `storyboard.json`, `final_script.md`, `asset_manifest.json`, `qa_report.json`, and `render_log.txt`.

## Layout of this skill

```text
rick-mation/
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
