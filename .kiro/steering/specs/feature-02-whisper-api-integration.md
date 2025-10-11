# Feature 02: Whisper Transcription via AI SDK (BYOM)

**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 1-2 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Integrate OpenAI Whisper transcription using AI SDK v5, enabling users to bring their own API keys (BYOM) for real speech-to-text transcription.

## Objectives
- Use AI SDK v5 `experimental_transcribe` function
- Support BYOM (Bring Your Own Model) philosophy
- Extract timestamp segments for VTT formatting
- Fallback to mock mode when no API key present
- Minimal code implementation

## Tasks

### 1. Install AI SDK Dependencies
- Verify `ai` and `@ai-sdk/openai` packages installed
- Add `OPENAI_API_KEY` to `.env.local` (optional - BYOM)
- No additional SDK configuration needed

### 2. Create Transcription Utility (src/lib/transcription.ts)
```typescript
import { experimental_transcribe as transcribe } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function transcribeAudio(audioPath: string) {
  const audioBuffer = await readFile(audioPath)
  
  const result = await transcribe({
    model: openai.transcription('whisper-1'),
    audio: audioBuffer,
    providerOptions: {
      openai: {
        timestampGranularities: ['segment'],
        language: 'en' // optional hint for better accuracy
      }
    }
  })
  
  return {
    text: result.text,
    segments: result.segments, // for VTT timing
    language: result.language,
    duration: result.durationInSeconds
  }
}
```

### 3. Update API Route Integration
- Import `transcribeAudio()` from `src/lib/transcription.ts`
- Replace `generateMockTranscript()` call
- Check for `OPENAI_API_KEY` env var, fallback to mock if missing
- Use `result.segments` for accurate VTT timestamp generation

### 4. Handle Errors Gracefully
- Wrap transcribe call in try-catch
- On error, log and fallback to mock mode
- Return user-friendly error messages
- No retry logic needed (keep simple for MVP)

### 5. Write Vitest Tests (REQUIRED)
- Create `src/lib/__tests__/transcription.test.ts`
- Mock AI SDK `experimental_transcribe` function
- Test successful transcription with mocked response
- Test error handling and fallback to mock
- Test missing API key scenario
- **All tests must pass before feature is complete**

## Success Criteria
- ✅ Audio successfully transcribed via Whisper API
- ✅ Timestamps accurate for VTT format generation
- ✅ Graceful fallback to mock mode without API key
- ✅ **Vitest tests written and passing** (see `testing-guidelines.md`)
- ✅ Test coverage ≥ 80% for transcription module
- ✅ VTT formatter uses real segments from Whisper

## Technical Notes
- **AI SDK v5**: Use `experimental_transcribe` from `ai` package
- **Model**: `openai.transcription('whisper-1')` via `@ai-sdk/openai`
- **Audio Input**: Accepts Buffer, Uint8Array, ArrayBuffer, base64 string, or URL
- **Timestamps**: Use `timestampGranularities: ['segment']` for VTT (no extra latency)
- **Language Hint**: Optional `language: 'en'` improves accuracy and speed
- **Response**: Contains `text`, `segments[]`, `language`, `durationInSeconds`
- **Max File Size**: 25MB per OpenAI Whisper API limit
- **Cost**: ~$0.006 per minute of audio (user's own API key - BYOM)

## Dependencies
- Feature 01: FFmpeg Audio Extraction (provides audio files)

## Follows Features
- Feature 03: File Upload with Binary Handling (can work without, using URLs)

## Example Implementation
```typescript
// In /src/app/api/generate-captions/route.ts
import { experimental_transcribe as transcribe } from 'ai'
import { openai } from '@ai-sdk/openai'
import { readFile } from 'fs/promises'

const hasApiKey = !!process.env.OPENAI_API_KEY

if (hasApiKey) {
  const audioBuffer = await readFile(extractedAudioPath)
  const result = await transcribe({
    model: openai.transcription('whisper-1'),
    audio: audioBuffer,
    providerOptions: {
      openai: { timestampGranularities: ['segment'] }
    }
  })
  // Use result.text and result.segments
} else {
  // Fallback to generateMockTranscript()
}
```
