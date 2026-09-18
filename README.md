# Rick-mation

Domain-neutral, AI-driven motion-graphics skill for Cursor and Claude Code.

It turns a creative brief plus source assets into a deterministic, editable video — without hand-keyframing, and without letting the model freely author arbitrary animation code.

## Briefing video

<video src="https://github.com/BlankHead2004/rick-mation/raw/main/docs/briefing.mp4" controls muted playsinline width="720">
  Your viewer can't play this inline — <a href="https://github.com/BlankHead2004/rick-mation/raw/main/docs/briefing.mp4">watch or download <code>docs/briefing.mp4</code></a>.
</video>

_A short walkthrough of what this skill does and how the pipeline fits together. Direct link: [`docs/briefing.mp4`](docs/briefing.mp4)._

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

**Claude has two different skill systems. Pick the one that matches where you actually work.**

| Where you use Claude | How skills load | Method |
|---|---|---|
| Claude Code CLI | Reads your filesystem | Clone into `~/.claude/skills/` |
| Claude Desktop → **Code** tab (Local/SSH session) | Reads your filesystem | Clone into `~/.claude/skills/` |
| Claude Desktop → **Chat** tab | Syncs from your claude.ai account | **Upload ZIP** |
| Claude Desktop → **Cowork** tab | Syncs from your claude.ai account | **Upload ZIP** |
| claude.ai in a browser | Syncs from your claude.ai account | **Upload ZIP** |
| Claude Code **cloud** sessions | Account skills + repo skills | Upload ZIP, or commit to repo `.claude/skills/` |
| Cursor | Reads your filesystem | Clone into `~/.cursor/skills/` |

The Chat and Cowork tabs **do not read `~/.claude/skills/`**, even though they are the same desktop app as the Code tab. Anthropic's docs are explicit: Cowork and cloud sessions source skills from the Customize configuration synced through your claude.ai account, not from the CLI's `~/.claude` directory. Dropping the folder on disk and seeing nothing happen is the expected result there, not a bug.

### Method 1 — Filesystem (Claude Code CLI, Desktop Code tab, Cursor)

The skill is a folder named `rick-mation` containing `SKILL.md`. The final path must be exactly:

```text
~/.claude/skills/rick-mation/SKILL.md
```

Not `~/.claude/skills/rick-mation/rick-mation/SKILL.md`. One extra wrapper folder is the most common install failure.

Windows:

```powershell
git clone https://github.com/BlankHead2004/rick-mation.git "$env:USERPROFILE\.claude\skills\rick-mation"
```

macOS / Linux:

```bash
git clone https://github.com/BlankHead2004/rick-mation.git ~/.claude/skills/rick-mation
```

Claude Code watches existing skill directories and picks up changes mid-session. If `~/.claude/skills/` did not exist before your session started, restart Claude Code. Verify by typing `/` and looking for `rick-mation`.

Do not use a symlink or Windows junction here. Use a real directory — scans frequently skip linked trees. If you already made one, remove it first (`rmdir` on Windows, `unlink` on Unix), then clone.

### Method 2 — ZIP upload (Desktop Chat/Cowork tabs, claude.ai, cloud sessions)

1. Download [`rick-mation.zip`](rick-mation.zip) from this repo (or zip the folder yourself — the archive must contain `rick-mation/SKILL.md` one level down from the root, not a bare `SKILL.md`).
2. Enable the runtime: **Settings → Capabilities → Code execution and file creation**. Skills require the code execution environment. On Team/Enterprise plans an owner enables this in **Organization settings → Skills** first.
3. Open **Customize → Skills** in the Desktop sidebar (or **Settings → Capabilities → Skills** on claude.ai).
4. Click **+**, choose **Create skill**, then **Upload a skill**, and select the ZIP.
5. Confirm `rick-mation` appears in the list and is toggled **on**.
6. Start a new conversation.

Skills do not sync between surfaces. A ZIP uploaded to claude.ai is not available to Claude Code, and vice versa. If you want it in both, install both ways.

### Method 3 — Commit to a repo (cloud sessions and teammates)

Cloud sessions additionally load project skills from the cloned repository:

```text
<your-repo>/.claude/skills/rick-mation/SKILL.md
```

### Cursor

```powershell
git clone https://github.com/BlankHead2004/rick-mation.git "$env:USERPROFILE\.cursor\skills\rick-mation"
```

macOS / Linux:

```bash
git clone https://github.com/BlankHead2004/rick-mation.git ~/.cursor/skills/rick-mation
```

Start a new Cursor agent chat after install.

### Update

```powershell
cd "$env:USERPROFILE\.claude\skills\rick-mation"   # or .cursor\skills\rick-mation
git pull
```

Copies are independent. Pull in each location you installed to. For a ZIP install, download the new ZIP and re-upload it through Customize → Skills.

### If the skill will not load

| Symptom | Cause |
|---|---|
| Nothing happens in Chat/Cowork after copying the folder | Those tabs never read `~/.claude/skills/`. Use the ZIP upload. |
| Not listed in Claude Code | Path must be `~/.claude/skills/rick-mation/SKILL.md` with no extra wrapper folder |
| Still not listed after creating the folder | `~/.claude/skills/` did not exist at session start — restart Claude Code |
| Installed as a symlink/junction | Replace with a real directory |
| ZIP upload rejected | Archive root must hold the `rick-mation/` folder, and `SKILL.md` must be spelled exactly |
| Loads but never triggers | Name it directly: type `/` and pick `rick-mation` |

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
