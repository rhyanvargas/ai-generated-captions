# Testing Guidelines

**Status**: Active  
**Applies To**: All features  
**Framework**: Vitest + React Testing Library

**Official Documentation**:
- 📘 [Next.js Testing with Vitest](https://nextjs.org/docs/app/guides/testing/vitest)
- 📘 [Vitest Configuration](https://vitest.dev/config/)
- 📘 [React Testing Library](https://testing-library.com/react)

---

## Testing Rule

**Every feature MUST include Vitest tests that pass before the feature is marked complete.**

This ensures:
- Code quality and reliability
- Regression prevention
- Documentation of expected behavior
- Confidence in deployments

**No exceptions** - this is grounded in industry best practices and Next.js recommendations.

---

## Test Requirements by Feature Type

### Backend/API Features
1. **Unit Tests** - Core logic functions
2. **Integration Tests** - API route end-to-end
3. **Error Handling** - All error paths tested
4. **Edge Cases** - Boundary conditions

**Example**: Feature 01 (FFmpeg Audio Extraction)

**Test File JSDoc (Recommended)**

Document your test files and complex test cases with JSDoc for better maintainability:

```typescript
/**
 * Tests for audio extraction functionality.
 * Requires FFmpeg to be installed on the system.
 * 
 * @group unit
 * @requires ffmpeg
 */

describe('audio-extractor', () => {
  /**
   * Verifies audio is extracted in correct format (16kHz mono WAV).
   * This ensures compatibility with Whisper's audio requirements.
   */
  it('should extract audio from video file', async () => {
    // ...
  })
  
  /**
   * Tests cleanup function removes temporary files.
   * Prevents disk space issues from accumulated temp files.
   */
  it('should handle invalid video file', async () => {
    await expect(extractAudio('invalid.mp4')).rejects.toThrow()
  })

  it('should cleanup audio file after processing', async () => {
    const audioPath = await extractAudio('test/fixtures/sample.mp4')
    await cleanupAudioFile(audioPath)
    expect(existsSync(audioPath)).toBe(false)
  })
})
```

### Frontend/Component Features
**Required Tests**:
1. **Rendering** - Component renders correctly
2. **User Interactions** - Click handlers, form submissions
3. **State Management** - State updates properly
4. **Error States** - Error UI displays correctly

**Example**: Feature 03 (File Upload)
```typescript
// src/components/__tests__/video-caption-generator.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VideoCaptionGenerator } from '../video-caption-generator'

describe('VideoCaptionGenerator', () => {
  it('should upload file and trigger processing', async () => {
    render(<VideoCaptionGenerator />)
    
    const file = new File(['video'], 'test.mp4', { type: 'video/mp4' })
    const input = screen.getByLabelText(/upload video/i)
    
    fireEvent.change(input, { target: { files: [file] } })
    
    expect(screen.getByText(/test.mp4/)).toBeInTheDocument()
  })

  it('should show processing stages', async () => {
    render(<VideoCaptionGenerator />)
    // ... trigger processing
    await waitFor(() => {
      expect(screen.getByText(/transcribing/i)).toBeInTheDocument()
    })
  })
})
```

### Utility/Library Features
**Required Tests**:
1. **Happy Path** - Standard usage works
2. **Input Validation** - Invalid inputs rejected
3. **Output Format** - Returns expected structure
4. **Performance** - Completes within time limits (if critical)

---

## Test Coverage Requirements

### Minimum Coverage
- **Unit Tests**: 80% coverage of business logic
- **Integration Tests**: All API routes tested
- **Critical Paths**: 100% coverage

### What to Skip (For MVP)
- E2E tests (add post-MVP)
- Visual regression tests
- Performance benchmarks (unless feature-critical)
- Browser compatibility tests

---

## Test Setup

### Install Vitest (Official Next.js Approach)

Following [Next.js official documentation](https://nextjs.org/docs/app/guides/testing/vitest):

```bash
# Official Next.js recommended packages
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

### Configuration

**Create**: `vitest.config.mts` (using `.mts` for ES modules)
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Resolves TypeScript path aliases
    react(),
  ],
  test: {
    environment: 'jsdom', // Browser-like environment for React
    globals: true, // Use global APIs (describe, it, expect)
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        '*.config.*',
        'src/app/layout.tsx',
        'src/app/page.tsx',
      ],
    },
  },
})
```

**Create**: `vitest.setup.ts` (optional but recommended)
```typescript
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})
```

**Update**: `tsconfig.json` (add types for global APIs)
```json
{
  "compilerOptions": {
    // ... other options
    "types": ["vitest/globals"]
  }
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

**Note**: With `globals: true`, you don't need to import `describe`, `it`, `expect` in test files.

---

## Test Organization

### Directory Structure
```
src/
├── lib/
│   ├── audio-extractor.ts
│   └── __tests__/
│       └── audio-extractor.test.ts
├── components/
│   ├── video-caption-generator.tsx
│   └── __tests__/
│       └── video-caption-generator.test.tsx
└── app/
    └── api/
        └── generate-captions/
            ├── route.ts
            └── route.test.ts
```

### Naming Convention
- Test files: `*.test.ts` or `*.test.tsx`
- Test directory: `__tests__/` in same folder as source
- Describe blocks: Match function/component name
- Test names: Descriptive, behavior-focused

---

## Feature Completion Checklist

Before marking a feature as complete:

- [ ] All functions have unit tests
- [ ] All API routes have integration tests
- [ ] Error cases are tested
- [ ] Edge cases are covered
- [ ] Tests pass locally: `pnpm test:run`
- [ ] Coverage meets minimums: `pnpm test:coverage`
- [ ] No console errors or warnings in tests
- [ ] Tests are deterministic (no flaky tests)

---

## CI/CD Integration

### GitHub Actions (Future)
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:run
      - run: pnpm test:coverage
```

---

## Testing Antipatterns to Avoid

### ❌ Don't
- Write tests that depend on external services (mock them)
- Test implementation details (test behavior)
- Have flaky/intermittent tests
- Skip error case testing
- Write tests that are slower than the code

### ✅ Do
- Mock external dependencies (APIs, file system when practical)
- Test user-facing behavior
- Make tests fast and deterministic
- Test happy path and error paths
- Keep tests simple and readable

---

## Example: Complete Feature with Tests

### Feature 02: Whisper Transcription

**Source**: `src/lib/transcription.ts`
```typescript
import { experimental_transcribe as transcribe } from 'ai'
import { openai } from '@ai-sdk/openai'
import { readFile } from 'fs/promises'

export async function transcribeAudio(audioPath: string) {
  const audioBuffer = await readFile(audioPath)
  
  const result = await transcribe({
    model: openai.transcription('whisper-1'),
    audio: audioBuffer,
    providerOptions: {
      openai: {
        timestampGranularities: ['segment'],
        language: 'en'
      }
    }
  })
  
  return {
    text: result.text,
    segments: result.segments || [],
    language: result.language,
    duration: result.durationInSeconds
  }
}
```

**Tests**: `src/lib/__tests__/transcription.test.ts`
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { transcribeAudio } from '../transcription'
import * as ai from 'ai'
import { readFile } from 'fs/promises'

vi.mock('ai')
vi.mock('fs/promises')

describe('transcription', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should transcribe audio file successfully', async () => {
    // Mock file read
    vi.mocked(readFile).mockResolvedValue(Buffer.from('audio data'))
    
    // Mock AI SDK
    const mockTranscribe = vi.fn().mockResolvedValue({
      text: 'Hello world',
      segments: [
        { text: 'Hello', startSecond: 0, endSecond: 1 },
        { text: 'world', startSecond: 1, endSecond: 2 }
      ],
      language: 'en',
      durationInSeconds: 2
    })
    vi.mocked(ai.experimental_transcribe).mockImplementation(mockTranscribe)
    
    const result = await transcribeAudio('/path/to/audio.wav')
    
    expect(result.text).toBe('Hello world')
    expect(result.segments).toHaveLength(2)
    expect(result.language).toBe('en')
    expect(result.duration).toBe(2)
  })

  it('should handle transcription errors', async () => {
    vi.mocked(readFile).mockResolvedValue(Buffer.from('audio data'))
    vi.mocked(ai.experimental_transcribe).mockRejectedValue(
      new Error('API Error')
    )
    
    await expect(transcribeAudio('/path/to/audio.wav')).rejects.toThrow('API Error')
  })

  it('should handle missing audio file', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('File not found'))
    
    await expect(transcribeAudio('/nonexistent.wav')).rejects.toThrow()
  })
})
```

---

## Quick Reference

### Run Tests
```bash
# Watch mode (during development)
pnpm test

# Run once
pnpm test:run

# With coverage
pnpm test:coverage

# With UI
pnpm test:ui

# Specific file
pnpm test audio-extractor

# Update snapshots (if using)
pnpm test -u
```

### Common Matchers
```typescript
expect(value).toBe(expected)           // Strict equality
expect(value).toEqual(expected)        // Deep equality
expect(value).toBeTruthy()             // Truthy check
expect(value).toBeUndefined()          // Undefined check
expect(value).toMatch(/regex/)         // String match
expect(array).toContain(item)          // Array contains
expect(array).toHaveLength(n)          // Array length
expect(fn).toThrow()                   // Function throws
expect(fn).toHaveBeenCalled()          // Mock called
expect(fn).toHaveBeenCalledWith(args)  // Mock called with
```

---

## Summary

**Rule**: No feature is complete without passing tests.

**Setup**: Vitest + React Testing Library + 80% coverage minimum

**Run Before Commit**: `pnpm test:run && pnpm test:coverage`

**Benefits**: 
- Catch bugs early
- Confident refactoring
- Document expected behavior
- Faster debugging

This ensures every feature is production-ready and maintainable.
