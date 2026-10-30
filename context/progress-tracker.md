# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Complete: Phase 2 — Editor chrome (navbar, project sidebar, dialog pattern, editor layout)

## Current Goal

- Ready for the next feature unit specification.

## Completed

- **02-editor-layout**:
  - Wired [`EditorNavbar`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/editor/editor-navbar.tsx), [`ProjectSidebar`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/editor/project-sidebar.tsx), and [`DialogPattern`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/editor/dialog-pattern.tsx) through [`components/editor/editor-layout.tsx`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/editor/editor-layout.tsx).
  - Layout is a full-viewport column: `h-12` navbar on top, then a `relative` canvas frame so the sidebar overlays the canvas and does not push content.
  - [`app/page.tsx`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/app/page.tsx) mounts `EditorLayout` with an empty canvas surface.
  - Navbar toggle controls sidebar open state. Sidebar close button and New Project both stay in the layout: New Project opens the dialog shell (title + Close footer, no create form).

- **02-editor**:
  - Added [`components/editor/editor-navbar.tsx`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/editor/editor-navbar.tsx): fixed-height (`h-12`) top bar with left, center, and right sections. Left section toggles the sidebar with `PanelLeftClose` when open and `PanelLeftOpen` when closed. Center and right sections are empty. Surface background with a subtle bottom border (`border-border-subtle`).
  - Added [`components/editor/project-sidebar.tsx`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/editor/project-sidebar.tsx): absolute overlay (`w-80`) that slides in from the left and does not push canvas content. Controlled by `isOpen` and `onClose`. Header is "Projects" plus a close button. shadcn Tabs for "My Projects" and "Shared", each with an empty placeholder. Full-width "New Project" button with a `Plus` icon at the bottom.
  - Added [`components/editor/dialog-pattern.tsx`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/editor/dialog-pattern.tsx): reusable dialog shell with `title`, optional `description`, and optional `footer` actions. Styled with existing tokens (`bg-elevated`, `text-text-primary`, `text-text-muted`, `border-border-default`, `bg-subtle`, `rounded-3xl`).
  - Did not modify `components/ui/*`.

- **01-design-system**:
  - Installed and configured `shadcn/ui` with Next.js 16.4.2 & Tailwind CSS v4 support using the Base UI (`@base-ui/react`) and Nova/Lucide/Geist preset.
  - Installed `lucide-react` icon library.
  - Created [`lib/utils.ts`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/lib/utils.ts) with reusable `cn()` helper.
  - Added all 7 required shadcn UI primitive components in [`components/ui/`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/components/ui/).
  - Updated [`app/globals.css`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/app/globals.css) with dark theme design tokens from `system-ui-context.md`.
  - Configured [`app/layout.tsx`](file:///e:/Agentic%20Projects/ghost-ai-main-contxt/app/layout.tsx) with Geist font variables and `dark` root class.

## In Progress

- None (editor layout wiring complete).

## Next Up

- Next feature unit from feature-specs (canvas, project creation form, or auth).

## Open Questions

- None.

## Architecture Decisions

- Configured shadcn/ui to use `@base-ui/react` primitives and modern compiled `cn` merging compatible with Tailwind v4.
- Embedded color tokens directly into `:root` and `.dark` in `globals.css` to enforce a strict dark technical workspace with zero chance of light mode leakage.
- Maintained strict component isolation: did not modify generated `components/ui/*` primitives.
- Editor chrome stays in `components/editor/`. `EditorLayout` owns sidebar and dialog open state. `ProjectSidebar` stays `absolute` inside a `relative` canvas frame so opening it never shifts the canvas. `DialogPattern` is mounted from the layout as a shell only.

## Session Notes

- Next.js 16.4.2 + React 19.3.0 + Tailwind v4 + Base UI + Lucide React.
- Navbar, overlay sidebar, and New Project dialog shell are mounted on the home page via `EditorLayout`.
