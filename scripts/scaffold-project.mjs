#!/usr/bin/env node
/**
 * scaffold-project.mjs
 *
 * Generates the canonical Rick-mation project directory tree
 * (see references/14-project-template.md) plus stub JSON files for the
 * minimum persistent contract, pre-filled with the required top-level shape
 * so downstream agents/validators have something schema-shaped to fill in.
 *
 * Usage:
 *   node scripts/scaffold-project.mjs <target-dir> [--force]
 *
 * Examples:
 *   node scripts/scaffold-project.mjs ./my-video-project
 *   node scripts/scaffold-project.mjs C:\Users\me\Projects\explainer-video
 *
 * Node.js >= 16, no dependencies (uses only 'node:fs' and 'node:path').
 */

import fs from "node:fs";
import path from "node:path";

const DIRS = [
  "input/user_assets",
  "input/source_docs",
  "references/videos",
  "references/images",
  "references/analysis",
  "assets/source",
  "assets/generated",
  "assets/processed",
  "assets/thumbnails",
  "scripts",
  "storyboard/versions",
  "audio/voice",
  "audio/music",
  "audio/sfx",
  "audio/mix",
  "src/components",
  "src/compositions",
  "src/layouts",
  "src/motion",
  "src/transitions",
  "src/themes",
  "src/validators",
  "src/utils",
  "previews",
  "renders",
  "qa",
  "logs",
];

const STUB_FILES = {
  "input/brief.md":
    "# Creative Brief\n\n" +
    "Fill this in from the user's actual request. Do not invent purpose, genre, or tone.\n" +
    "See the rick-mation skill: references/02-creative-brief-intake.md\n",

  "project.json": (name) =>
    JSON.stringify(
      {
        name,
        created_at: new Date().toISOString(),
        schema_version: "1.0.0",
        stack: ["typescript", "react", "remotion", "ffmpeg"],
      },
      null,
      2
    ) + "\n",

  "creative_brief.json": () =>
    JSON.stringify(
      {
        purpose: "",
        topic: "",
        audience: "",
        tone: "",
        duration_seconds: null,
        aspect_ratio: "16:9",
        resolution: "1920x1080",
        language: "English",
        voiceover: { required: true, voice_reference: null },
        references: [],
        assets: [],
        content_sources: [],
        visual_preferences: [],
        visual_restrictions: [],
        must_include: [],
        must_avoid: [],
        cta: null,
      },
      null,
      2
    ) + "\n",

  "reference_analysis.json": () => JSON.stringify([], null, 2) + "\n",

  "content_map.json": () =>
    JSON.stringify(
      { claims: [], facts: [], entities: [], sequences: [], numbers: [], key_terms: [], attribution_requirements: [] },
      null,
      2
    ) + "\n",

  "storyboard/storyboard.json": () =>
    JSON.stringify({ schema_version: "1.0.0", total_duration: null, scenes: [] }, null, 2) + "\n",

  "asset_manifest.json": () => JSON.stringify({ assets: [] }, null, 2) + "\n",

  "audio_manifest.json": () =>
    JSON.stringify(
      {
        voice_profile: {
          provider: "",
          voice_id: "",
          confirmed_by_user: false,
          _note:
            "Do not fill provider/voice_id without asking the user first. If they have no preference, suggest Gemini API TTS (free tier) as the default recommendation, then set confirmed_by_user=true once they agree. See references/08-audio-and-voiceover.md.",
        },
        scenes: [],
        sfx_vocabulary: [],
      },
      null,
      2
    ) + "\n",

  "render_config.json": () =>
    JSON.stringify(
      { mode: "preview", fps: 30, width: 1920, height: 1080, output: "renders/preview.mp4", versioning: {} },
      null,
      2
    ) + "\n",

  "qa_report.json": () =>
    JSON.stringify(
      {
        structural: { passed: false },
        visual: { passed: false, sampled_frames: [] },
        audio: { passed: false },
        findings: [],
        final_checklist: {},
      },
      null,
      2
    ) + "\n",

  "README.md": (name) =>
    `# ${name}\n\n` +
    "Built with the rick-mation skill.\n\n" +
    "Run the pipeline phases in order (see the skill's SKILL.md / references/15-end-to-end-runbook.md):\n" +
    "intake -> reference analysis -> content model -> director plan -> script -> audio -> " +
    "storyboard -> assets -> preview render -> QA -> repair -> final render -> verification.\n",
};

function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const targetArg = args.find((a) => !a.startsWith("--"));

  if (!targetArg) {
    console.error("Usage: node scaffold-project.mjs <target-dir> [--force]");
    process.exit(1);
  }

  const targetDir = path.resolve(targetArg);
  const projectName = path.basename(targetDir);

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0 && !force) {
    console.error(
      `Refusing to scaffold into non-empty directory: ${targetDir}\n` +
        "Pass --force to scaffold anyway (existing files are left untouched, only missing ones are added)."
    );
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  for (const dir of DIRS) {
    fs.mkdirSync(path.join(targetDir, dir), { recursive: true });
  }

  for (const [relPath, content] of Object.entries(STUB_FILES)) {
    const fullPath = path.join(targetDir, relPath);
    if (fs.existsSync(fullPath)) continue; // never clobber existing work
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    const body = typeof content === "function" ? content(projectName) : content;
    fs.writeFileSync(fullPath, body, "utf8");
  }

  console.log(`Scaffolded Rick-mation project at: ${targetDir}`);
  console.log("Next: fill in input/brief.md and creative_brief.json, then run Phase 0 (Intake).");
}

main();
