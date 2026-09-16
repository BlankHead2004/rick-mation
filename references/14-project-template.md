# Suggested Project Template

This is the canonical directory layout for a project built with this harness. Use `scripts/scaffold-project.mjs` (in this skill) to generate it automatically instead of typing it out by hand.

```text
project/
├── input/
│   ├── brief.md
│   ├── user_assets/
│   └── source_docs/
│
├── references/
│   ├── videos/
│   ├── images/
│   └── analysis/
│
├── assets/
│   ├── source/
│   ├── generated/
│   ├── processed/
│   └── thumbnails/
│
├── scripts/
│   ├── source_script.md
│   ├── final_script.md
│   └── narration.json
│
├── storyboard/
│   ├── storyboard.json
│   ├── storyboard_review.md
│   └── versions/
│
├── audio/
│   ├── voice/
│   ├── music/
│   ├── sfx/
│   └── mix/
│
├── src/
│   ├── components/
│   ├── compositions/
│   ├── layouts/
│   ├── motion/
│   ├── transitions/
│   ├── themes/
│   ├── validators/
│   └── utils/
│
├── previews/
├── renders/
├── qa/
├── logs/
│
├── project.json
├── package.json
├── tsconfig.json
└── README.md
```

## Minimum persistent contract

Every project run must leave these files behind, valid and up to date, regardless of how far the pipeline got:

```text
creative_brief.json
reference_analysis.json
content_map.json
asset_manifest.json
audio_manifest.json
storyboard.json
render_config.json
qa_report.json
```

Machine-checkable JSON Schemas for the DSL-critical files in this list (`creative_brief.json`, `storyboard.json` scenes, `asset_manifest.json` entries, `audio_manifest.json`, `render_config.json`, `qa_report.json`) live in `schemas/` in this skill — validate against them before treating a stage as complete.
