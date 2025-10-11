# Project Structure & Coding Standards

**Purpose**: Code organization, architectural patterns, and quality standards for the codebase.

---

## Directory Organization

```
src/
├── app/                    # Next.js App Router
│   ├── __tests__/         # App-level tests
│   ├── api/               # API routes
│   │   └── generate-captions/
│   │       └── route.ts   # Caption generation endpoint
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Home page component
├── components/
│   ├── __tests__/         # Component tests
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   └── textarea.tsx
│   └── video-caption-generator.tsx  # Main feature component
└── lib/
    ├── __tests__/         # Library tests
    ├── utils.ts           # Utility functions (cn helper)
    ├── audio-extractor.ts # FFmpeg audio extraction
    └── transcription.ts   # Whisper transcription
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

---

## Coding Standards ⚠️

### JSDoc Documentation (MANDATORY)

All exported functions, components, and types **must** have JSDoc comments.

#### Required JSDoc Elements

**Functions**:
```typescript
/**
 * Brief description of what the function does.
 * Can span multiple sentences for clarity.
 * 
 * @param paramName - Description of parameter
 * @param optionalParam - Description (optional)
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 * @example
 * ```typescript
 * const result = functionName('value')
 * console.log(result) // Expected output
 * ```
 */
export async function functionName(paramName: string): Promise<ReturnType> {
  // Implementation
}
```

**React Components**:
```typescript
/**
 * Component description explaining purpose and behavior.
 * 
 * @component
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
export function ComponentName({ prop }: Props) {
  // Implementation
}
```

**Types/Interfaces**:
```typescript
/**
 * Description of what this type represents.
 */
export interface TypeName {
  /** Description of this property */
  propertyName: string
  
  /** Description with more context */
  optionalProperty?: number
}
```

#### JSDoc Best Practices

1. **Provide Context, Not Just Types**
   - ❌ Bad: `@param id - The ID`
   - ✅ Good: `@param id - Unique user identifier (UUID format)`

2. **Don't Duplicate TypeScript Types**
   - TypeScript provides the types
   - JSDoc provides the context and usage

3. **Include Examples for Complex Functions**
   - Show real-world usage
   - Demonstrate expected inputs/outputs

4. **Document Error Cases**
   - Use `@throws` for all possible errors
   - Explain when and why errors occur

### TypeScript Standards

- **Strict Mode**: Always enabled
- **Type Inference**: Prefer inference over explicit types when obvious
- **No `any`**: Use `unknown` or proper types
- **Interface vs Type**: Prefer `interface` for objects, `type` for unions/primitives
- **Exported Types**: All public API types must be exported

### Code Quality Rules

1. **Testing**: All features require ≥80% test coverage
2. **JSDoc**: All exported code must be documented
3. **Linting**: Code must pass ESLint before commit
4. **Type Safety**: No TypeScript errors allowed
5. **File Naming**: kebab-case for all files

### Testing Organization

```
src/lib/
├── audio-extractor.ts
├── __tests__/
│   ├── audio-extractor.test.ts    # Unit tests
│   └── transcription.test.ts      # Unit tests
└── transcription.ts
```

**Test File Patterns**:
- Unit tests: `*.test.ts` or `*.test.tsx`
- Located in `__tests__/` directory next to source
- One test file per source file
- Group related tests with `describe()` blocks