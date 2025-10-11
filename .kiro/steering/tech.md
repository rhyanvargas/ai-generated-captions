# Technology Stack

**Purpose**: Complete reference for all technologies, frameworks, and tools used in the project.

---

## Framework & Runtime
- **Next.js 15** with App Router and React Server Components
- **React 19** with TypeScript
- **Node.js** runtime environment

## UI & Styling
- **shadcn/ui** component library (New York style)
- **Tailwind CSS 4** for styling with CSS variables
- **Radix UI** primitives for accessible components
- **Lucide React** for icons
- **Geist fonts** (Sans and Mono variants)

## AI & Processing
- **AI SDK v5** - Unified AI integration with `experimental_transcribe`
- **@ai-sdk/openai** - OpenAI provider for Whisper transcription
- **OpenAI Whisper API** - Speech-to-text transcription (~$0.006/min)
- **FFmpeg** - Audio extraction from video files
- **fluent-ffmpeg** - Node.js wrapper for FFmpeg

## Testing Framework ⚠️
- **Vitest 3.x** - Fast unit test framework (officially recommended by Next.js)
- **@vitejs/plugin-react** - React component support for Vitest
- **jsdom** - Browser environment for component testing
- **@testing-library/react** - React component testing utilities
- **@testing-library/dom** - DOM testing utilities
- **vite-tsconfig-paths** - TypeScript path alias resolution

### Testing Configuration
- Config file: `vitest.config.mts` (ES module format)
- Setup file: `vitest.setup.ts` (cleanup after each test)
- Coverage: `v8` provider with ≥80% requirement
- Environment: `jsdom` for React components
- Globals: Enabled (`describe`, `it`, `expect` auto-imported)

**Official Docs**: 
- [Next.js Testing with Vitest](https://nextjs.org/docs/app/guides/testing/vitest)
- [Vitest Configuration](https://vitest.dev/config/)

## Development Tools
- **TypeScript 5** with strict mode
- **ESLint** with Next.js and TypeScript configs
- **pnpm** as package manager
- **Turbopack** for faster builds and development

## Data Validation
- **Zod** - Schema validation and type inference

## Build System & Commands

### Development
```bash
pnpm dev          # Start development server with Turbopack
```

### Production
```bash
pnpm build        # Build for production with Turbopack
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint         # Run ESLint checks
```

### Testing
```bash
pnpm test              # Run tests in watch mode
pnpm test:run          # Run tests once (CI/pre-commit)
pnpm test:ui           # Open Vitest UI
pnpm test:coverage     # Generate coverage report
```

**Rule**: All tests must pass (`pnpm test:run`) before committing features.

## Project Configuration
- **Path aliases**: `@/*` maps to `./src/*`
- **Import resolution**: Bundler-based module resolution
- **CSS**: Global styles in `src/app/globals.css`
- **Components**: shadcn/ui components in `src/components/ui/`
## 
Performance Optimization

### AI Token Usage
- **Default output format**: Plain text (.txt) to minimize AI processing
- **Optional formats**: Users can select WebVTT (.vtt) when needed
- **Format selection UI**: Checkbox or radio buttons for output preferences
- **Token efficiency**: Generate only requested formats to reduce API costs