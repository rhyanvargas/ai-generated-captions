# Technology Stack

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
- **AI SDK** for AI integration
- **OpenAI SDK** for GPT-4 and future Whisper integration
- Mock transcription system (development phase)

## Development Tools
- **TypeScript 5** with strict mode
- **ESLint** with Next.js and TypeScript configs
- **pnpm** as package manager
- **Turbopack** for faster builds and development

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

## Project Configuration
- **Path aliases**: `@/*` maps to `./src/*`
- **Import resolution**: Bundler-based module resolution
- **CSS**: Global styles in `src/app/globals.css`
- **Components**: shadcn/ui components in `src/components/ui/`