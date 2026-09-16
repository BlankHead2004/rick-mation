# Component Library Specification

## Objective

Build a finite set of robust components and let AI compose them. The storyboard DSL's `elements[]` (see [04-storyboard-dsl-spec.md](04-storyboard-dsl-spec.md)) references these components by type — the LLM never authors bespoke component code as the normal workflow.

Components themselves are style/layout-agnostic building blocks. **Which components go where** is decided by the layout template chosen from [17-layout-template-gallery.md](17-layout-template-gallery.md) — that gallery is what keeps different projects from converging on one hardcoded recurring look while every project still composes from this same finite component set.

## Text components

```text
Title
SectionTitle
Subtitle
BodyText
Caption
KineticText
HighlightedText
Number
Label
Pill
```

## Media components

```text
ImageFrame
VideoFrame
DeviceFrame
BrowserFrame
MediaGrid
VideoCompare
ImageCompare
PanZoomMedia
MaskedMedia
```

## Structure components

```text
Card
Panel
Grid
Stack
SplitView
Timeline
Flow
Comparison
Callout
Quote
```

## Data components

```text
BarChart
LineChart
PieChart
Metric
Progress
Table
Heatmap
Axis
Legend
```

## Diagram components

```text
Node
Connector
Arrow
Graph
ProcessFlow
ArchitectureDiagram
Hierarchy
Pipeline
```

## Decorative components

Use sparingly:

```text
GridBackground
DotField
Noise
AccentLine
Glow
SoftGradient
```

## Component contract

Each component should accept:

- content props
- layout props
- theme
- animation preset
- timing
- accessibility/readability flags

**Components should not contain project-specific hardcoded text.** All copy comes from the storyboard DSL, never from the component implementation.

## Implementation rule

Prefer declarative composition:

```tsx
<Scene>
  <Title ... />
  <VideoFrame ... />
  <Flow ... />
</Scene>
```

Do not create bespoke animation code for every scene — compose from the registered component + motion-preset vocabulary instead (see [09-remotion-implementation.md](09-remotion-implementation.md) and [13-motion-presets.md](13-motion-presets.md)).

## Reuse threshold

If an effect appears twice, evaluate whether it should become a component or motion preset.

If it appears three or more times, it should generally be standardized.
