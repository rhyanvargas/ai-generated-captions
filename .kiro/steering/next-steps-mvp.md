# Next Immediate Steps - MVP Implementation

**Updated**: 2025-10-11  
**Goal**: Get real transcription working with minimal code

---

## ✅ What's Already Done

1. **Mock System Working** - App runs and generates demo captions
2. **UI Complete** - Clean interface with progress indicators
3. **AI SDK v5 Installed** - `ai` and `@ai-sdk/openai` packages ready
4. **BYOM Messaging** - Core message updated in UI
5. **Feature Specs Updated** - Feature 02 now uses AI SDK v5 syntax

---

## 🚀 Next Steps (6-9 hours total with tests)

### Step 0: Setup Testing Framework (10 minutes) ⚠️ REQUIRED

**Following [Next.js Official Vitest Setup](https://nextjs.org/docs/app/guides/testing/vitest)**

✅ **Already Installed** (you have these):
- `vitest` ✅
- `@vitejs/plugin-react` ✅
- `jsdom` ✅
- `@testing-library/react` ✅
- `@testing-library/dom` ✅
- `vite-tsconfig-paths` ✅

✅ **Configuration Files Created**:
- `vitest.config.mts` ✅ (with tsconfigPaths plugin - `.mts` for ES modules)
- `vitest.setup.ts` ✅ (cleanup after each test)
- `tsconfig.json` ✅ (added `"types": ["vitest/globals"]`)
- `package.json` ✅ (test scripts added)

✅ **Example Test Created**:
- `src/app/__tests__/page.test.tsx` ✅

**Verify setup works**:
```bash
pnpm test:run
# Should pass with 2 passing tests from page.test.tsx
```

**If tests pass, you're ready for Feature 01!** 🎉

---

### Step 1: Install FFmpeg Dependencies (5 minutes)

```bash
# Install npm packages
pnpm add fluent-ffmpeg @types/fluent-ffmpeg

# Install FFmpeg binary (choose your OS)
# macOS:
brew install ffmpeg

# Ubuntu/Debian:
sudo apt-get install ffmpeg

# Windows:
# Download from https://ffmpeg.org/download.html
```

### Step 2: Feature 01 - Audio Extraction (3-4 hours including tests)

**Create**: `src/lib/audio-extractor.ts`

```typescript
import ffmpeg from 'fluent-ffmpeg'
import { tmpdir } from 'os'
import { join } from 'path'
import { unlink } from 'fs/promises'

export async function extractAudio(videoPath: string): Promise<string> {
  const outputPath = join(tmpdir(), `audio-${Date.now()}.wav`)
  
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .audioFrequency(16000) // Optimal for Whisper
      .audioChannels(1)       // Mono
      .format('wav')
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .save(outputPath)
  })
}

export async function cleanupAudioFile(audioPath: string): Promise<void> {
  try {
    await unlink(audioPath)
  } catch (error) {
    console.error('Failed to cleanup audio file:', error)
  }
}
```

**Write Tests** ⚠️ REQUIRED:

**Create**: `src/lib/__tests__/audio-extractor.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest'
import { extractAudio, cleanupAudioFile } from '../audio-extractor'
import { existsSync } from 'fs'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

describe('audio-extractor', () => {
  let testVideoPath: string

  beforeAll(async () => {
    // Create a minimal test MP4 file (you'll need a real sample video)
    // For now, you can skip this test until you have a sample video
    testVideoPath = join(tmpdir(), 'test-video.mp4')
  })

  it('should extract audio from video file', async () => {
    const audioPath = await extractAudio(testVideoPath)
    expect(existsSync(audioPath)).toBe(true)
    expect(audioPath).toMatch(/\.wav$/)
    await cleanupAudioFile(audioPath)
  })

  it('should cleanup audio file', async () => {
    const audioPath = await extractAudio(testVideoPath)
    await cleanupAudioFile(audioPath)
    expect(existsSync(audioPath)).toBe(false)
  })

  it('should reject invalid video file', async () => {
    await expect(extractAudio('/nonexistent.mp4')).rejects.toThrow()
  })
})
```

**Run tests**:
```bash
pnpm test audio-extractor
# Tests must pass before continuing!
```

---

### Step 3: Feature 02 - Whisper Transcription (2-3 hours including tests)

**Create**: `src/lib/transcription.ts`

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
        timestampGranularities: ['segment'], // Get timing for VTT
        language: 'en' // Optional: improves accuracy
      }
    }
  })
  
  return {
    text: result.text,
    segments: result.segments || [], // Array of {text, startSecond, endSecond}
    language: result.language,
    duration: result.durationInSeconds
  }
}
```

**Update**: `src/app/api/generate-captions/route.ts`

Replace the mock section with:

```typescript
import { extractAudio, cleanupAudioFile } from '@/lib/audio-extractor'
import { transcribeAudio } from '@/lib/transcription'

// Check if user has API key (BYOM)
const hasApiKey = !!process.env.OPENAI_API_KEY

let transcriptText: string
let transcriptSegments: Array<{text: string, startSecond: number, endSecond: number}> = []

if (hasApiKey && (file || videoUrl)) {
  try {
    // For now, skip this - we'll do it in Feature 03
    // const videoPath = ... // from uploaded file
    
    // Extract audio
    console.log('🎤 Extracting audio with FFmpeg...')
    const audioPath = await extractAudio(videoPath)
    
    // Transcribe with Whisper
    console.log('🤖 Transcribing with Whisper via AI SDK...')
    const result = await transcribeAudio(audioPath)
    
    transcriptText = result.text
    transcriptSegments = result.segments
    
    console.log('✨ Real transcription complete')
    
    // Cleanup
    await cleanupAudioFile(audioPath)
  } catch (error) {
    console.error('Transcription failed, falling back to mock:', error)
    transcriptText = generateMockTranscript(inputType, videoIdentifier)
  }
} else {
  console.log('🎭 [MOCK MODE] No API key or using mock mode')
  transcriptText = generateMockTranscript(inputType, videoIdentifier)
}
```

**Update**: VTT formatter to use real segments

```typescript
function formatAsVTT(transcript: string, segments?: Array<{text: string, startSecond: number, endSecond: number}>): string {
  let vtt = 'WEBVTT\n\n'
  
  if (segments && segments.length > 0) {
    // Use real Whisper timestamps
    segments.forEach((segment, index) => {
      vtt += `${index + 1}\n`
      vtt += `${formatTime(segment.startSecond)} --> ${formatTime(segment.endSecond)}\n`
      vtt += `${segment.text}\n\n`
    })
  } else {
    // Fallback to calculated timing (mock mode)
    const lines = transcript.split('\n').filter(line => line.trim())
    let currentTime = 0
    
    lines.forEach((line, index) => {
      const startTime = formatTime(currentTime)
      const duration = Math.max(3, Math.min(8, line.length / 10))
      currentTime += duration
      const endTime = formatTime(currentTime)
      
      vtt += `${index + 1}\n`
      vtt += `${startTime} --> ${endTime}\n`
      vtt += `${line}\n\n`
    })
  }
  
  return vtt
}
```

**Write Tests** ⚠️ REQUIRED:

**Create**: `src/lib/__tests__/transcription.test.ts`

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

  it('should transcribe audio successfully', async () => {
    // Mock file read
    vi.mocked(readFile).mockResolvedValue(Buffer.from('audio data'))
    
    // Mock AI SDK transcribe
    const mockTranscribe = vi.fn().mockResolvedValue({
      text: 'Hello world from Whisper',
      segments: [
        { text: 'Hello world', startSecond: 0, endSecond: 1.5 },
        { text: 'from Whisper', startSecond: 1.5, endSecond: 3 }
      ],
      language: 'en',
      durationInSeconds: 3
    })
    vi.mocked(ai.experimental_transcribe).mockImplementation(mockTranscribe)
    
    const result = await transcribeAudio('/test/audio.wav')
    
    expect(result.text).toBe('Hello world from Whisper')
    expect(result.segments).toHaveLength(2)
    expect(result.language).toBe('en')
    expect(result.duration).toBe(3)
  })

  it('should handle transcription errors', async () => {
    vi.mocked(readFile).mockResolvedValue(Buffer.from('audio'))
    vi.mocked(ai.experimental_transcribe).mockRejectedValue(
      new Error('API Error')
    )
    
    await expect(transcribeAudio('/test/audio.wav')).rejects.toThrow('API Error')
  })

  it('should handle missing file', async () => {
    vi.mocked(readFile).mockRejectedValue(new Error('ENOENT: File not found'))
    
    await expect(transcribeAudio('/missing.wav')).rejects.toThrow()
  })
})
```

**Run tests**:
```bash
pnpm test transcription
# Tests must pass before continuing!
```

---

### Step 4: Feature 03 - Binary File Upload (2-3 hours including tests)

**Update**: `src/components/video-caption-generator.tsx`

Change the API call from JSON to FormData:

```typescript
const processVideo = async () => {
  if (!file && !videoUrl) return

  setIsProcessing(true)

  try {
    setStage('processing')
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStage('transcribing')

    // Create FormData for file upload
    const formData = new FormData()
    formData.append('inputType', inputMode)
    
    if (inputMode === 'url') {
      formData.append('videoUrl', videoUrl)
    } else if (file) {
      formData.append('video', file) // Send actual file
    }

    const response = await fetch('/api/generate-captions', {
      method: 'POST',
      body: formData, // Not JSON anymore!
    })

    if (!response.ok) {
      throw new Error('Failed to generate captions')
    }

    const result = await response.json()
    
    setStage('formatting')
    await new Promise(resolve => setTimeout(resolve, 500))

    setCaptions(result)
    setStage('complete')
  } catch (error) {
    console.error('Error processing video:', error)
    setStage('upload')
  } finally {
    setIsProcessing(false)
  }
}
```

**Update**: `src/app/api/generate-captions/route.ts`

Handle multipart/form-data:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const inputType = formData.get('inputType') as string
    const videoFile = formData.get('video') as File | null
    const videoUrl = formData.get('videoUrl') as string | null

    console.log('📥 Caption generation request:', { inputType, hasFile: !!videoFile, videoUrl })

    let videoPath: string | null = null

    if (inputType === 'file' && videoFile) {
      // Save uploaded file to temp directory
      const bytes = await videoFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      videoPath = join(tmpdir(), `video-${Date.now()}.${videoFile.name.split('.').pop()}`)
      await writeFile(videoPath, buffer)
      console.log('📁 Video saved to:', videoPath)
    } else if (inputType === 'url' && videoUrl) {
      // For now, log that we'd download it
      console.log('🔗 Video URL provided:', videoUrl)
      // TODO Feature 04: Download video from URL
      videoPath = null // Skip for now
    }

    // Now use videoPath with FFmpeg and Whisper (from Step 3)
    // ... rest of transcription logic ...

    // Cleanup uploaded video file
    if (videoPath) {
      await unlink(videoPath).catch(err => 
        console.error('Failed to cleanup video:', err)
      )
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Error generating captions:', error)
    return NextResponse.json(
      { error: `Failed to generate captions: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
```

---

## Environment Setup

**Create**: `.env.local` (BYOM - Bring Your Own Model)

```bash
# Required for real transcription
# Get your key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-...

# Optional: Specify FFmpeg path if not in PATH
# FFMPEG_PATH=/usr/local/bin/ffmpeg
```

**Add to**: `.gitignore` (should already be there)

```
.env*.local
```

---

## Testing Checklist

### Automated Tests (REQUIRED) ⚠️
- [ ] Run `pnpm test:run` - all tests pass
- [ ] Run `pnpm test:coverage` - ≥80% coverage
- [ ] Feature 01: `audio-extractor.test.ts` passes
- [ ] Feature 02: `transcription.test.ts` passes
- [ ] Feature 03: `video-caption-generator.test.tsx` passes
- [ ] No console errors or warnings in tests
- [ ] Tests are deterministic (not flaky)

### Manual Testing: Without API Key (Mock Mode)
- [ ] Upload video file → generates mock captions
- [ ] Enter video URL → generates mock captions
- [ ] Download TXT and VTT files
- [ ] Console shows "[MOCK MODE]" messages

### Manual Testing: With API Key (Real Transcription)
- [ ] Add `OPENAI_API_KEY` to `.env.local`
- [ ] Restart dev server
- [ ] Upload small test video (< 1 min)
- [ ] Check console for FFmpeg and Whisper logs
- [ ] Verify captions match audio content
- [ ] Check VTT timestamps are accurate
- [ ] Confirm temp files are cleaned up
- [ ] Test with no API key → falls back to mock

---

## Troubleshooting

### FFmpeg not found
```bash
# Verify FFmpeg installed
ffmpeg -version

# If not found, install:
brew install ffmpeg  # macOS
```

### API Key errors
```bash
# Verify key is loaded
# In route.ts, add:
console.log('API Key present:', !!process.env.OPENAI_API_KEY)

# Restart dev server after changing .env.local
```

### File upload fails
- Check file size limit (Next.js default is 4MB)
- Verify FormData is sent (not JSON)
- Check browser console for errors

---

## Estimated Timeline

| Step | Time | Status |
|------|------|--------|
| Setup testing framework | 10 min | ⏳ Pending |
| Install FFmpeg dependencies | 5 min | ⏳ Pending |
| Feature 01: Audio extraction + tests | 3-4 hours | ⏳ Pending |
| Feature 02: Whisper integration + tests | 2-3 hours | ⏳ Pending |
| Feature 03: File upload + tests | 2-3 hours | ⏳ Pending |
| Integration testing & debugging | 30 min | ⏳ Pending |
| **Total** | **6-9 hours** | |

*Note: Timeline includes test writing. Tests are not optional.*

---

## Success Criteria

### MVP is Complete When:
- ✅ **All Vitest tests pass** (`pnpm test:run`)
- ✅ **Test coverage ≥80%** (`pnpm test:coverage`)
- ✅ User uploads a video file
- ✅ FFmpeg extracts audio
- ✅ Whisper transcribes via AI SDK
- ✅ Captions download with accurate timestamps
- ✅ Mock mode still works without API key
- ✅ Temp files are cleaned up
- ✅ No memory leaks
- ✅ Clear error messages

---

## After MVP

Once these 3 features work:

1. **Document everything** in README
2. **Create demo video** showing it working
3. **Get feedback** from 3-5 users
4. **Docker containerization** (before cloud version)
5. **Then consider**: Cloud hosted service

---

## Notes

- **BYOM** = Users bring their own OpenAI API key
- **Self-hosted** = Runs on user's infrastructure
- **Minimal code** = Keep it simple, no over-engineering
- **Future**: Containerization → Cloud hosted version with managed service

See `mvp-roadmap.md` for full context and future plans.
