# Project Structure

## Directory Organization

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Home page component
├── components/
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── textarea.tsx
│   └── video-caption-generator.tsx  # Main feature component
└── lib/
    ├── utils.ts           # Utility functions (cn helper)
    └── caption-generator.ts  # AI caption generation logic
```

## Architectural Patterns

### Component Structure
- **Feature components** in `src/components/` (kebab-case naming)
- **UI primitives** in `src/components/ui/` (shadcn/ui components)
- **Client components** use `'use client'` directive when needed
- **Server components** by default (App Router)

### State Management
- React hooks for local component state
- No external state management library
- File upload and processing state handled in main component

### File Naming Conventions
- **Components**: kebab-case (e.g., `video-caption-generator.tsx`)
- **Utilities**: kebab-case (e.g., `caption-generator.ts`)
- **Types**: Inline interfaces or types within components
- **App Router**: Next.js conventions (`page.tsx`, `layout.tsx`)

### Import Patterns
- Use path aliases: `@/components`, `@/lib`, `@/utils`
- Group imports: React, third-party, local components, utilities
- Destructure imports from UI libraries

### Code Organization
- Keep business logic in `src/lib/`
- UI components focus on presentation and user interaction
- Separate concerns: file handling, AI processing, UI state