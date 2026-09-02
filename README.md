# Claim Status App

A React + TypeScript implementation of the **Claim Status assignment**, built from the provided reference design.

The application is structured around two independent UI boundaries:

* **Contextual Panel** — claim information, activity, documents, users, calls, and supporting actions.
* **Workflow Panel** — a four-step claim status workflow where each step owns its content, form state, actions, and footer.

Both panels maintain **independent scroll regions**, allowing users to interact with contextual information without affecting the workflow and vice versa.

## Links

* **Live Demo:** [Claim Status App](https://claim-status-app.vercel.app)
* **GitHub Repository:** [claim-status-react](https://github.com/sajid-awan/claim-status-react)

---

## Features

### Contextual Panel

The contextual panel provides supporting information related to the claim.

It includes six sections:

* Claim Action
* Submission
* Fax
* Documents
* Users
* Calls

Icon navigation selects the active section. The first three sections also expose text tabs (Claim Action, Submission, Fax).

Section components live under `src/components/claim-status/contextual/` and are routed through `ContextualContent`.

### Claim Action

The Claim Action section supports nested tabs:

* Activity
* Details
* History

The Activity tab contains a claim activity timeline with:

* User information
* Timestamps
* Activity source
* Status changes
* Previous/new status
* Assignee information
* Follow-up information

### Workflow Panel

The workflow contains four independent steps:

1. **Pre Claim Status**
2. **Gather Info**
3. **Verify**
4. **Additional Detail**

Each step is implemented as an independent component.

Each step controls its own:

* Content
* Form state (where applicable)
* Footer
* Navigation actions

### Independent Scrolling

The contextual and workflow panels have independent scroll regions.

```text
┌──────────────────────┬───────────────────────────────────┐
│                      │                                   │
│    Contextual        │             Workflow              │
│                      │                                   │
│    ↕ Scroll          │             ↕ Scroll              │
│                      │                                   │
│                      │                                   │
└──────────────────────┴───────────────────────────────────┘
```

Scrolling one panel does not affect the other.

---

## Architecture

The application follows a component ownership model.

```text
ClaimStatusPage
│
└── ClaimStatusLayout
    │
    ├── ContextualPanel
    │   ├── ContextualNavigation
    │   └── ContextualContent
    │       └── Active Section
    │
    └── WorkflowPanel
        ├── WorkflowHeader
        ├── WorkflowProgress
        └── Active Workflow Step
            ├── Step Content
            └── Step Footer
```

### Contextual Ownership

The contextual system owns:

* Icon navigation
* Contextual sections
* Text tabs
* Nested tabs (Claim Action)
* Section state
* Contextual scrolling

### Workflow Ownership

The workflow system owns:

* Workflow progress
* Current step
* Step content
* Step state
* Step-specific actions
* Step footer
* Workflow scrolling

### Parent Ownership

The parent is intentionally kept lightweight and manages only high-level state such as:

* Active contextual section
* Current workflow step
* Completed workflow steps
* Shared claim / gather-info data

This prevents the main page component from becoming tightly coupled to individual features.

---

## Component Structure

```text
src/
│
├── App.tsx
│
├── components/
│   │
│   ├── claim-status/
│   │   │
│   │   ├── ClaimStatusLayout.tsx
│   │   ├── ClaimStatusPage.tsx
│   │   │
│   │   ├── contextual/
│   │   │   ├── ContextualPanel.tsx
│   │   │   ├── ContextualNavigation.tsx
│   │   │   ├── ContextualContent.tsx
│   │   │   ├── ContextualSectionShell.tsx
│   │   │   │
│   │   │   ├── claim-action/
│   │   │   │   ├── ClaimAction.tsx
│   │   │   │   ├── ClaimTimeline.tsx
│   │   │   │   └── ClaimActivityItem.tsx
│   │   │   │
│   │   │   ├── submission/
│   │   │   │   └── Submission.tsx
│   │   │   │
│   │   │   ├── fax/
│   │   │   │   └── Fax.tsx
│   │   │   │
│   │   │   ├── documents/
│   │   │   │   └── Documents.tsx
│   │   │   │
│   │   │   ├── users/
│   │   │   │   └── Users.tsx
│   │   │   │
│   │   │   └── calls/
│   │   │       └── Calls.tsx
│   │   │
│   │   └── workflow/
│   │       ├── WorkflowPanel.tsx
│   │       ├── WorkflowHeader.tsx
│   │       ├── WorkflowProgress.tsx
│   │       ├── WorkflowContent.tsx
│   │       ├── WorkflowFooter.tsx
│   │       │
│   │       └── steps/
│   │           │
│   │           ├── pre-claim-status/
│   │           │   ├── PreClaimStatus.tsx
│   │           │   ├── ClaimLevelInfo.tsx
│   │           │   ├── PatientLevelInfo.tsx
│   │           │   └── PreClaimStatusFooter.tsx
│   │           │
│   │           ├── gather-info/
│   │           │   ├── GatherInfo.tsx
│   │           │   └── GatherInfoFooter.tsx
│   │           │
│   │           ├── verify/
│   │           │   ├── Verify.tsx
│   │           │   └── VerifyFooter.tsx
│   │           │
│   │           └── additional-detail/
│   │               ├── AdditionalDetail.tsx
│   │               └── AdditionalDetailFooter.tsx
│   │
│   ├── layout/
│   │   ├── AppHeader.tsx
│   │   └── AppSidebar.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Tabs.tsx
│       ├── Chip.tsx
│       ├── Breadcrumb.tsx
│       ├── Timeline.tsx
│       ├── IconNav.tsx
│       ├── IconButton.tsx
│       ├── FormField.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Radio.tsx
│       ├── Textarea.tsx
│       ├── DatePicker.tsx
│       ├── InfoCard.tsx
│       ├── InfoRow.tsx
│       ├── StatusBadge.tsx
│       ├── ContextualCard.tsx
│       ├── ContextualPanelShell.tsx
│       ├── WorkflowStepShell.tsx
│       └── ...
│
├── data/
│   ├── claims.ts
│   ├── activities.ts
│   ├── workflow.ts
│   ├── gatherInfo.ts
│   └── contextual.ts
│
├── hooks/
│   └── useClaimStatus.ts
│
├── types/
│   ├── claim.ts
│   ├── gatherInfo.ts
│   └── workflow.ts
│
├── styles/
│   ├── main.css                 # Tailwind entry (@theme, tokens, base, components)
│   ├── main.scss                # PrimeReact override sidecar
│   ├── abstracts/tokens.css     # Design tokens (@theme static + :root bridge)
│   ├── base/global.css          # Base resets only
│   ├── components/              # CSS-first semantic classes (@layer components)
│   │   ├── index.css
│   │   ├── ui.css               # btn, chip, tabs, form-field, radio, breadcrumb
│   │   ├── cards.css            # contextual-card, info-card, info-row
│   │   ├── layout.css           # app-scroll, app-header, icon-nav, shells
│   │   ├── navigation.css       # app-sidebar
│   │   ├── workflow.css         # workflow progress, header/footer
│   │   ├── timeline.css
│   │   ├── activity.css
│   │   └── claim-status.css     # page/layout shells
│   └── primereact-override.scss
│
└── main.tsx
```

---

## Tech Stack

| Technology            | Purpose                           |
| --------------------- | --------------------------------- |
| **React 19**          | UI framework                      |
| **TypeScript**        | Type safety                       |
| **Vite**              | Development server and build tool |
| **Tailwind CSS v4**   | Token utilities via `@apply` in component CSS |
| **PrimeReact 10.9.2** | UI components                     |
| **Phosphor Icons**    | Interface icons                   |
| **Oxlint**            | Linting                           |
| **Vercel**            | Deployment                        |

---

## UI Components

PrimeReact is used selectively rather than forcing the entire UI to use a third-party theme.

### PrimeReact

Version:

```json
"primereact": "^10.9.2"
```

Used for components such as:

* Button
* InputText
* Dropdown
* RadioButton
* Checkbox
* InputTextarea
* SelectButton

PrimeReact components are wrapped or customized where necessary to maintain the visual style of the reference design.

### Custom Components

Domain-specific UI uses semantic CSS classes scoped under `.claim-status-app`. Shared UI primitives live in `src/components/ui/` and reference classes from `src/styles/components/`.

**Shared UI primitives**

* `Button`, `Tabs`, `Chip`, `Breadcrumb`, `Timeline`, `IconNav`, `IconButton`
* Form controls: `FormField`, `Input`, `Select`, `Radio`, `Textarea`, `DatePicker`
* Layout shells: `ContextualPanelShell`, `WorkflowStepShell`, `ContextualCard`
* Data display: `InfoCard`, `InfoRow`, `StatusBadge`, `SectionTitle`

**Claim-status domain**

* `ClaimTimeline`, `ClaimActivityItem`, `ClaimAction`
* `ContextualNavigation`, `ContextualSectionShell`, `WorkflowProgress`

This avoids making the application look like a default PrimeReact application.

---

## Design Tokens

Design tokens live in [`src/styles/abstracts/tokens.css`](src/styles/abstracts/tokens.css) and are imported through the Tailwind entry [`src/styles/main.css`](src/styles/main.css). Semantic component styles live in [`src/styles/components/`](src/styles/components/) and use `@layer components` with `@apply` for token-backed utilities. PrimeReact overrides are in [`src/styles/primereact-override.scss`](src/styles/primereact-override.scss).

**Styling architecture:** CSS/SCSS-first — components reference BEM-style classes (e.g. `btn`, `app-sidebar__item-btn`, `activity-item__header`); Tailwind is used inside the stylesheet layer via `@apply`, not inline in TSX.

| Token | CSS variable | Usage |
| ----- | ------------ | ----- |
| Brand Orange | `--color-brand-500` | Primary actions and active states |
| Ink | `--color-ink` | Primary text |
| Ink Muted | `--color-ink-muted` | Secondary text |
| Placeholder | `--color-placeholder` | Input placeholders |
| Field Height | `--height-field` (44px) | Inputs and dropdowns |
| Card Radius | `--radius-card` (18px) | Cards and information panels |
| Nav Row Height | `--height-nav` (34px) | Sidebar navigation rows |
| Contextual Width | `--width-contextual` (598px) | Contextual panel width at `lg+` |

Tailwind utilities such as `text-ink-muted`, `bg-brand-500`, `h-nav`, and `rounded-card` map to these tokens via `@theme static`.

The PrimeReact CSS variables in `:root` are bridged to the application design tokens where required.

---

## Responsive Design

The application supports desktop, tablet, and mobile layouts.

### Desktop (`lg+`)

The contextual and workflow panels are displayed side by side.

```text
┌──────────────────┬────────────────────────────────┐
│                  │                                │
│    Contextual    │           Workflow             │
│                  │                                │
└──────────────────┴────────────────────────────────┘
```

### Tablet (`md`–`lg`)

Panels stack vertically — workflow on top, contextual below — with page-level scrolling.

### Mobile

The contextual panel opens as an overlay drawer. The sidebar uses a slide-out drawer. Workflow remains the primary visible panel.

---

## State Management

The Claim Status state is handled by:

```text
src/hooks/useClaimStatus.ts
```

The hook manages:

```text
activeContext
currentStep
completedSteps
gatherInfoData
```

The application intentionally avoids unnecessary global state management. No Redux is required for the current implementation.

---

## Mock Data

The application currently uses local mock data.

Mock data is separated from UI components:

```text
src/data/
├── claims.ts
├── activities.ts
├── workflow.ts
├── gatherInfo.ts
└── contextual.ts
```

This keeps the UI ready for future API integration.

---

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

Check your versions:

```bash
node -v
npm -v
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Available Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm install`     | Install dependencies          |
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Create production build       |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Run Oxlint                    |

---

## Production Build

Create the production build:

```bash
npm run build
```

Vite generates the production files inside:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

## Verification Checklist

### Contextual Panel

* [ ] Claim Action icon renders Claim Action.
* [ ] Submission icon renders Submission.
* [ ] Fax icon renders Fax.
* [ ] Documents icon renders Documents.
* [ ] Users icon renders Users.
* [ ] Calls icon renders Calls.
* [ ] Claim Action, Submission, and Fax text tabs work for the first three sections.
* [ ] Claim Action nested tabs work.
* [ ] Activity tab displays the timeline.
* [ ] Details tab works.
* [ ] History tab works.
* [ ] Contextual content scrolls independently.
* [ ] Contextual scrolling does not affect workflow scrolling.

### Workflow

* [ ] Pre Claim Status renders correctly.
* [ ] Gather Info renders correctly.
* [ ] Verify renders correctly.
* [ ] Additional Detail renders correctly.
* [ ] Workflow progress displays all four steps.
* [ ] Active step is visually highlighted.
* [ ] Completed steps are visually distinguished.
* [ ] Pending steps are visually distinguished.
* [ ] Next navigation works.
* [ ] Back navigation works.
* [ ] Completed-step state updates correctly.
* [ ] Every workflow step owns its own footer.
* [ ] Workflow content scrolls independently.
* [ ] Workflow footer remains visible.

### Visual

* [ ] Brand orange is `#ff851f`.
* [ ] Form fields use approximately `44px` height.
* [ ] Cards use approximately `18px` radius.
* [ ] Typography matches the reference design.
* [ ] Spacing matches the reference design.
* [ ] Borders and shadows remain subtle.
* [ ] Phosphor icons are used consistently.
* [ ] PrimeReact controls are styled to match the design.
* [ ] No unwanted PrimeReact theme styling overrides the design.

### Technical

* [ ] TypeScript builds without errors.
* [ ] No unnecessary `any`.
* [ ] No broken imports.
* [ ] No React key warnings.
* [ ] No console errors.
* [ ] `npm run lint` passes.
* [ ] `npm run build` passes.
* [ ] Production preview works.
* [ ] Desktop layout has no unwanted page-level scrolling.
* [ ] Tablet layout works correctly.
* [ ] Mobile layout works correctly.

---

## Deployment

The application is configured for deployment to Vercel.

Configuration:

```text
vercel.json
```

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

### Deployment Flow

```text
GitHub
   │
   ▼
Vercel
   │
   ├── Install Dependencies
   │
   ├── npm run build
   │
   ▼
dist/
   │
   ▼
Production
```

---

## Future API Integration

The current application uses mock data, but the component architecture is designed to support API integration.

The future data flow can be:

```text
API
 │
 ▼
Claim Data
 │
 ▼
ClaimStatusPage
 │
 ├───────────────┐
 ▼               ▼
Contextual     Workflow
 │               │
 ▼               ▼
Sections        Steps
```

API integration should replace the mock data layer without requiring major changes to the UI components.

Domain components should continue to receive typed data through props rather than becoming tightly coupled to API implementation details.

---

## Architectural Philosophy

The main architectural rule of this project is:

> **Every meaningful UI boundary owns itself.**

### Contextual UI owns

* Contextual navigation
* Contextual sections
* Nested tabs
* Contextual state
* Contextual scrolling

### Workflow UI owns

* Workflow progress
* Active step
* Step content
* Step state
* Step actions
* Step-specific footer
* Workflow scrolling

### Parent owns

* Overall layout
* Shared claim data
* Active contextual section
* Current workflow step
* High-level communication

This makes it possible to add a new contextual section without modifying workflow components, and add a new workflow step without modifying the contextual system.

---

## License

This project was created as a **Claim Status UI assignment/demo implementation** based on the provided design reference.
