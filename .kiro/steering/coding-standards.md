# Coding Standards

**Status**: Active  
**Applies To**: All code contributions  
**Framework**: TypeScript + Next.js 15

---

## Core Principles

1. **JSDoc Everything**: All functions, classes, and complex logic must have JSDoc comments
2. **Type Safety**: Leverage TypeScript for compile-time safety
3. **Self-Documenting Code**: Clear names + JSDoc = minimal inline comments needed
4. **Consistency**: Follow established patterns throughout the codebase
5. **Testing**: All code must have corresponding Vitest tests

---

## JSDoc Documentation Requirements

### Why JSDoc?

- **IntelliSense**: Hover documentation in VSCode and other IDEs
- **Type Hints**: Parameter types and return values visible inline
- **Examples**: Show how to use functions without reading implementation
- **Onboarding**: New developers understand code faster
- **Maintenance**: Future you will thank present you

### Required for All:

✅ **Public Functions** (exported)  
✅ **Utility Functions** (in `lib/`)  
✅ **API Routes** (request handlers)  
✅ **React Components** (complex components)  
✅ **Type Definitions** (interfaces, types)  
✅ **Complex Logic** (algorithms, transformations)

### Optional for:

- Simple getters/setters
- One-liner helper functions
- Private implementation details

---

## JSDoc Standards

### 1. Function Documentation

**Template**:
```typescript
/**
 * Brief description of what the function does.
 * Can be multiple sentences for clarity.
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
```

**Real Example**:
```typescript
/**
 * Extracts audio from a video file using FFmpeg and saves as WAV.
 * Audio is converted to 16kHz mono for optimal Whisper transcription.
 * 
 * @param videoPath - Absolute path to the video file
 * @returns Promise resolving to path of extracted WAV audio file
 * @throws {Error} If FFmpeg fails or video format is unsupported
 * @example
 * ```typescript
 * const audioPath = await extractAudio('/tmp/video.mp4')
 * // audioPath: '/tmp/audio-1234567890.wav'
 * ```
 */
export async function extractAudio(videoPath: string): Promise<string> {
  // Implementation...
}
```

### 2. Component Documentation

```tsx
/**
 * Video caption generator component with file upload and URL input.
 * Handles transcription, progress tracking, and caption download.
 * 
 * @component
 * @example
 * ```tsx
 * <VideoCaptionGenerator />
 * ```
 */
export function VideoCaptionGenerator() {
  // Implementation...
}
```

### 3. Type Documentation

```typescript
/**
 * Transcription result from Whisper API.
 * Contains full text, timing segments, and metadata.
 */
export interface TranscriptionResult {
  /** Full transcript text */
  text: string
  
  /** Array of timed segments for VTT formatting */
  segments: Array<{
    text: string
    startSecond: number
    endSecond: number
  }>
  
  /** Detected language code (e.g., 'en', 'es') */
  language: string
  
  /** Total audio duration in seconds */
  duration: number
}
```

### 4. Constant Documentation

```typescript
/**
 * Maximum video file size in bytes (500MB).
 * Larger files will be rejected to prevent memory issues.
 */
export const MAX_VIDEO_SIZE = 500 * 1024 * 1024
```

### 5. Complex Logic Documentation

```typescript
/**
 * Formats seconds as VTT timestamp (HH:MM:SS.mmm).
 * Required format for WebVTT subtitle files.
 * 
 * @param seconds - Time in seconds (can be decimal)
 * @returns Formatted timestamp string
 * @example
 * ```typescript
 * formatTime(65.5)   // Returns: "00:01:05.500"
 * formatTime(3661)   // Returns: "01:01:01.000"
 * ```
 */
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
}
```

---

## JSDoc Tags Reference

### Common Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@param` | Describe parameters | `@param videoPath - Path to video` |
| `@returns` | Describe return value | `@returns Audio file path` |
| `@throws` | Document errors thrown | `@throws {Error} If file not found` |
| `@example` | Show usage example | See examples above |
| `@deprecated` | Mark deprecated code | `@deprecated Use newFunction() instead` |
| `@see` | Reference related items | `@see extractAudio` |
| `@async` | Indicate async function | Usually inferred from `async` |
| `@component` | Mark React component | `@component` |

### Advanced Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@template` | Generic type params | `@template T` |
| `@typedef` | Define custom type | `@typedef {Object} Config` |
| `@internal` | Mark as internal API | `@internal` |
| `@public` | Mark as public API | `@public` |
| `@beta` | Experimental API | `@beta` |

---

## TypeScript + JSDoc Best Practices

### 1. Don't Duplicate Types

❌ **Bad** (duplicating TypeScript types in JSDoc):
```typescript
/**
 * @param {string} name
 * @returns {Promise<string>}
 */
async function greet(name: string): Promise<string> {
  return `Hello, ${name}`
}
```

✅ **Good** (TypeScript provides types, JSDoc provides context):
```typescript
/**
 * Generates a greeting message for the given name.
 * 
 * @param name - Person's name to greet
 * @returns Promise resolving to greeting message
 */
async function greet(name: string): Promise<string> {
  return `Hello, ${name}`
}
```

### 2. Provide Context, Not Just Types

❌ **Bad** (just repeating what code says):
```typescript
/**
 * Gets the user.
 * @param id - The ID
 * @returns The user
 */
function getUser(id: string): User {
  // ...
}
```

✅ **Good** (explains why and how):
```typescript
/**
 * Fetches user data from the database by ID.
 * Returns cached data if available to reduce DB queries.
 * 
 * @param id - Unique user identifier (UUID format)
 * @returns User object with profile data
 * @throws {NotFoundError} If user doesn't exist
 */
function getUser(id: string): User {
  // ...
}
```

### 3. Include Examples for Complex Functions

```typescript
/**
 * Converts transcript text to WebVTT format with timing.
 * Splits text into segments and calculates durations based on character count.
 * 
 * @param transcript - Raw transcript text (newline-separated)
 * @param segments - Optional timing segments from Whisper
 * @returns WebVTT formatted subtitle string
 * @example
 * ```typescript
 * const vtt = formatAsVTT('Line 1\n\nLine 2', [
 *   { text: 'Line 1', startSecond: 0, endSecond: 2 },
 *   { text: 'Line 2', startSecond: 2, endSecond: 4 }
 * ])
 * // Returns:
 * // WEBVTT
 * //
 * // 1
 * // 00:00:00.000 --> 00:00:02.000
 * // Line 1
 * // ...
 * ```
 */
function formatAsVTT(transcript: string, segments?: TranscriptSegment[]): string {
  // ...
}
```

---

## Code Organization Standards

### File Header Comments

```typescript
/**
 * Audio extraction utilities using FFmpeg.
 * Converts video files to 16kHz mono WAV for Whisper transcription.
 * 
 * @module lib/audio-extractor
 */

import ffmpeg from 'fluent-ffmpeg'
// ... rest of file
```

### Section Comments

```typescript
// ============================================================================
// Audio Extraction
// ============================================================================

/**
 * Extracts audio from video file.
 * ...
 */
export async function extractAudio(videoPath: string): Promise<string> {
  // ...
}

// ============================================================================
// File Cleanup
// ============================================================================

/**
 * Removes temporary audio file.
 * ...
 */
export async function cleanupAudioFile(audioPath: string): Promise<void> {
  // ...
}
```

---

## Inline Comment Guidelines

### When to Use Inline Comments

✅ **Good use cases**:
- Explaining complex algorithms
- Noting non-obvious business logic
- Documenting workarounds or edge cases
- Referencing external resources (API docs, Stack Overflow)

❌ **Avoid**:
- Restating what the code obviously does
- Outdated comments (worse than no comments)
- Commented-out code (use git history instead)

### Examples

✅ **Good**:
```typescript
// FFmpeg requires 16kHz mono for optimal Whisper accuracy
// See: https://platform.openai.com/docs/guides/speech-to-text
ffmpeg(videoPath)
  .audioFrequency(16000)
  .audioChannels(1)
```

❌ **Bad**:
```typescript
// Set frequency to 16000
ffmpeg(videoPath).audioFrequency(16000)
```

---

## Testing Documentation

### Test File JSDoc

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
   */
  it('should extract audio from video file', async () => {
    // ...
  })
})
```

---

## React Component Prop Documentation

```tsx
interface VideoCaptionGeneratorProps {
  /** Optional initial video URL to populate */
  initialUrl?: string
  
  /** Callback fired when captions are generated */
  onCaptionsGenerated?: (captions: Captions) => void
  
  /** Maximum file size in bytes (default: 500MB) */
  maxFileSize?: number
}

/**
 * Video caption generator with drag-and-drop upload.
 * Supports both file upload and YouTube URLs.
 * 
 * @component
 * @example
 * ```tsx
 * <VideoCaptionGenerator
 *   initialUrl="https://youtube.com/watch?v=..."
 *   onCaptionsGenerated={(caps) => console.log(caps)}
 *   maxFileSize={1024 * 1024 * 100} // 100MB
 * />
 * ```
 */
export function VideoCaptionGenerator(props: VideoCaptionGeneratorProps) {
  // ...
}
```

---

## API Route Documentation

```typescript
/**
 * POST /api/generate-captions
 * 
 * Generates captions from uploaded video or URL.
 * Extracts audio via FFmpeg, transcribes with Whisper, formats as VTT/TXT.
 * 
 * @route POST /api/generate-captions
 * @body {FormData} - multipart/form-data with video file or URL
 * @returns {Captions} - Generated captions in multiple formats
 * @throws {400} - Invalid input or missing video
 * @throws {500} - Processing error (FFmpeg or Whisper)
 * 
 * @example
 * ```typescript
 * const formData = new FormData()
 * formData.append('video', file)
 * formData.append('inputType', 'file')
 * 
 * const response = await fetch('/api/generate-captions', {
 *   method: 'POST',
 *   body: formData
 * })
 * const captions = await response.json()
 * ```
 */
export async function POST(request: NextRequest) {
  // ...
}
```

---

## VSCode Integration

### Enable JSDoc Suggestions

Add to `.vscode/settings.json`:
```json
{
  "typescript.suggest.completeJSDocs": true,
  "javascript.suggest.completeJSDocs": true,
  "editor.quickSuggestions": {
    "comments": "on"
  }
}
```

### JSDoc Snippet

Type `/**` above a function and press Enter - VSCode auto-generates template!

---

## Enforcement

### Pre-commit Checks

```json
// package.json
{
  "scripts": {
    "lint:jsdoc": "eslint --plugin jsdoc --rule 'jsdoc/require-jsdoc: error'",
    "check:docs": "typedoc --emit none --excludePrivate"
  }
}
```

### Code Review Checklist

- [ ] All exported functions have JSDoc
- [ ] JSDoc includes `@param` for all parameters
- [ ] JSDoc includes `@returns` for non-void functions
- [ ] JSDoc includes `@throws` for error cases
- [ ] Complex functions have `@example`
- [ ] Types documented with descriptions
- [ ] No duplicate type information (use TypeScript types)

---

## Benefits Summary

### For You (Developer)
✅ **Better IntelliSense** - See docs while coding  
✅ **Faster Debugging** - Understand code without diving deep  
✅ **Easier Refactoring** - Know what functions expect  
✅ **Self-Service** - Answer own questions without asking team

### For Team
✅ **Faster Onboarding** - New devs productive quickly  
✅ **Less Context Switching** - Docs in code, not external  
✅ **Better Reviews** - Reviewers understand intent  
✅ **Knowledge Sharing** - Code becomes documentation

### For Users
✅ **Fewer Bugs** - Better understanding = better code  
✅ **Faster Features** - Less time debugging  
✅ **Stable API** - Clear contracts between modules

---

## Quick Reference

### Minimal JSDoc (Small Functions)
```typescript
/**
 * Capitalizes first letter of string.
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

### Complete JSDoc (Public API)
```typescript
/**
 * Extracts audio from video using FFmpeg.
 * Converts to 16kHz mono WAV for Whisper.
 * 
 * @param videoPath - Absolute path to video file
 * @returns Promise resolving to audio file path
 * @throws {Error} If FFmpeg fails or format unsupported
 * @example
 * ```typescript
 * const audio = await extractAudio('/tmp/video.mp4')
 * ```
 */
export async function extractAudio(videoPath: string): Promise<string> {
  // ...
}
```

---

**Remember**: Good documentation is an investment in your future productivity. Write docs like you're explaining to yourself in 6 months! 📚
