# Reference Video Analysis (Worked Example)

This file is a **worked example** of applying the "Reference analysis contract" from [02-creative-brief-intake.md](02-creative-brief-intake.md) to one real reference video. It is an example of a visual/motion vocabulary — **it is not the content template.** Any project's actual palette, fonts, labels, logos, subject matter, pacing and content must be derived from that project's own brief, not copied from here.

## Reference used

`Show-Harness-Main(1).mp4`

Technical observations:
- 1920×1080
- 30 fps
- approximately 110 seconds
- H.264 video with AAC audio

## Visual grammar observed

The reference relies heavily on deterministic composition rather than continuous AI-generated imagery.

Recurring characteristics:
- light neutral background
- dark high-contrast text
- restrained accent colors
- rounded white cards/panels
- thin borders/subtle shadows
- embedded real-world/robot footage
- image grids
- side-by-side comparisons
- typography used as major visual content
- diagrams/relationship graphics
- repeated UI framing
- substantial negative space
- controlled information density
- clean lower-detail/footer treatment
- occasional strong full-screen typography reset

## Scene language observed

Examples of repeated structural patterns (these are **composition families**, not mandatory sections):

- opening title + visual identity
- image/footage collage supporting a question or claim
- large media card with UI/context panel
- paired comparisons
- full-width typographic statement
- multi-card evidence grid
- real footage framed within a consistent container
- diagram/result slide
- concluding identity/title card

## Motion interpretation

The visual style appears to derive much of its sophistication from:

- controlled reveals
- layout transformation
- card movement
- subtle scale
- panel replacement
- structured text emphasis
- transitions that maintain continuity

The harness should reproduce these as reusable motion primitives (see [13-motion-presets.md](13-motion-presets.md)).

## Production implication

The reference strongly supports this architecture:

`storyboard DSL -> reusable layout components -> deterministic motion primitives -> Remotion render`

...rather than:

`AI video generation -> editing`

## Important design constraint

The harness should reproduce the **underlying visual grammar** while allowing a user to request a completely different subject, purpose and genre. The reference is not the content template. It is one example of a motion-design vocabulary — when a new project references its own inspiration video, redo this exact analysis against that video instead of reusing these conclusions.
