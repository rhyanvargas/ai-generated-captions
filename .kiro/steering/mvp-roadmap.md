# MVP Roadmap - Minimal Working Product

**Goal**: Get a working self-hosted caption generator with BYOM (Bring Your Own Model) support in minimal time.

**Core Message**: "The Simple, Open-Source Caption Generator for Developers and Creators. Bring Your Own Model (BYOM)"

---

## MVP Philosophy

### BYOM (Bring Your Own Model)
- Users provide their own OpenAI API keys via `.env.local`
- No subscription fees - pay only for actual API usage (~$0.006/min)
- Full transparency and control over costs
- Self-hosted on user's infrastructure

### Minimal Code
- Focus on core functionality only
- No feature bloat
- Clean, maintainable codebase
- Easy to understand and extend

### Future-Ready Architecture
- **Containerization**: Docker setup (future - before cloud hosting)
- **Cloud Hosted Version**: Managed service with user accounts, video storage, affordable pricing (future - not MVP)

---

## MVP Features (Must-Have)

### ✅ Phase 1: Working Mock (COMPLETE)
- [x] Mock transcription system
- [x] TXT and VTT format generation
- [x] File upload UI (placeholder)
- [x] Video URL input UI
- [x] Download and copy functionality
- [x] Clean, modern UI with progress indicators

### 🚀 Phase 2: Real Transcription (Next - 4-6 hours total)

#### Feature 01: FFmpeg Audio Extraction
**Time**: 2-3 hours  
**Tasks**:
1. Install `fluent-ffmpeg` package
2. Create `src/lib/audio-extractor.ts` 
3. Extract audio to temp WAV file (16kHz for Whisper)
4. Clean up temp files after processing
5. Add basic error handling

**Minimal Implementation**:
```typescript
// src/lib/audio-extractor.ts
import ffmpeg from 'fluent-ffmpeg'
import { tmpdir } from 'os'
import { join } from 'path'

export async function extractAudio(videoPath: string): Promise<string> {
  const outputPath = join(tmpdir(), `audio-${Date.now()}.wav`)
  
  await new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format('wav')
      .on('end', resolve)
      .on('error', reject)
      .save(outputPath)
  })
  
  return outputPath
}
```

#### Feature 02: Whisper via AI SDK (UPDATED)
**Time**: 1-2 hours  
**Tasks**:
1. Create `src/lib/transcription.ts` using AI SDK v5
2. Use `experimental_transcribe` from `ai` package
3. Integrate with API route
4. Fallback to mock if no API key
5. Use real timestamps from segments

**See**: `specs/feature-02-whisper-api-integration.md` for AI SDK v5 implementation

#### Feature 03: Binary File Upload (Simplified)
**Time**: 1-2 hours  
**Tasks**:
1. Update frontend to send FormData instead of JSON
2. Handle multipart/form-data in API route
3. Save uploaded file to temp directory
4. Pass file path to FFmpeg extractor
5. Clean up uploaded file after processing

**Minimal Implementation**:
```typescript
// Frontend: Send actual file
const formData = new FormData()
formData.append('video', file)
formData.append('inputType', 'file')

const response = await fetch('/api/generate-captions', {
  method: 'POST',
  body: formData // not JSON
})
```

---

## MVP Success Criteria

### Must Work
- ✅ Upload video file (MP4, MOV)
- ✅ Extract audio using FFmpeg
- ✅ Transcribe with Whisper via AI SDK
- ✅ Generate TXT and VTT captions with real timestamps
- ✅ Download caption files
- ✅ Fallback to mock when no API key

### Nice to Have (Skip for MVP)
- ❌ Video URL download (Feature 04) - can add later
- ❌ SRT format (Feature 07) - TXT + VTT sufficient
- ❌ Translation (Feature 08) - future
- ❌ Video preview (Feature 09) - future
- ❌ Batch processing (Feature 11) - future

---

## Post-MVP Roadmap

### Phase 3: Cloud Deployment Prep
**Goal**: Containerize for easy deployment  
**Time**: 2-3 hours

1. Create `Dockerfile`
2. Add `docker-compose.yml`
3. Document self-hosting setup
4. Test on common platforms (Vercel, Railway, DigitalOcean)

**Note**: This happens BEFORE we build cloud hosted version

### Phase 4: Cloud Hosted Service (Future)
**Goal**: Managed SaaS alternative for non-technical users  
**Time**: 40-60 hours (separate project)

Features:
- User authentication and accounts
- Video upload and storage (S3/R2)
- Transcription history
- Affordable subscription pricing
- Team collaboration
- API access for paid users

**Key Difference**: MVP is self-hosted BYOM, Cloud is managed service

---

## Current Dependencies Installed

Based on user's note:
- ✅ `zod` - Data validation
- ✅ `ai` - AI SDK v5 for transcription
- ✅ `@ai-sdk/openai` - OpenAI provider

**Still Needed for MVP**:
- `fluent-ffmpeg` - FFmpeg wrapper
- `@types/fluent-ffmpeg` - TypeScript types
- `vitest` - Testing framework
- `@vitejs/plugin-react` - Vitest React support
- `@testing-library/react` - Component testing
- `@testing-library/jest-dom` - DOM matchers

## Testing Requirement

**⚠️ IMPORTANT**: Every feature MUST include Vitest tests that pass before marking complete.

See `testing-guidelines.md` for:
- Test setup and configuration
- Required test types per feature
- Coverage requirements (≥80%)
- Testing antipatterns to avoid

**Rule**: `pnpm test:run` must pass before committing any feature.

---

## Implementation Order (Next Steps)

### Immediate: Get Real Transcription Working

**0. Setup Testing Framework** (10 min)
   ```bash
   pnpm add -D vitest @vitejs/plugin-react
   pnpm add -D @testing-library/react @testing-library/user-event @testing-library/jest-dom
   ```
   - Create `vitest.config.ts` (see `testing-guidelines.md`)
   - Create `vitest.setup.ts`
   - Add test scripts to `package.json`

**1. Install FFmpeg Dependencies** (5 min)
   ```bash
   pnpm add fluent-ffmpeg @types/fluent-ffmpeg
   brew install ffmpeg  # or apt-get install ffmpeg
   ```

**2. Feature 01: Audio Extraction** (3-4 hours including tests)
   - Create `src/lib/audio-extractor.ts`
   - Write `src/lib/__tests__/audio-extractor.test.ts`
   - Run `pnpm test audio-extractor` until passing
   - Test with sample video

**3. Feature 02: Whisper Integration** (2-3 hours including tests)
   - Create `src/lib/transcription.ts` with AI SDK v5
   - Write `src/lib/__tests__/transcription.test.ts`
   - Run `pnpm test transcription` until passing
   - Update API route to use real transcription

**4. Feature 03: File Upload** (2-3 hours including tests)
   - Update frontend to FormData
   - Write component tests for file upload
   - Run `pnpm test video-caption` until passing
   - Handle binary uploads in API

**5. Integration Testing** (30 min)
   - Run full test suite: `pnpm test:run`
   - Check coverage: `pnpm test:coverage`
   - Verify ≥80% coverage on new modules
   - Upload real video end-to-end test

**Total Time**: 6-9 hours to tested MVP (including test writing)

---

## Environment Variables

```bash
# .env.local

# Required for real transcription (BYOM)
OPENAI_API_KEY=sk-...

# Optional: FFmpeg path (usually auto-detected)
# FFMPEG_PATH=/usr/local/bin/ffmpeg

# Future: Cloud deployment
# DATABASE_URL=...
# S3_BUCKET=...
```

---

## Documentation Updates Needed

### README.md
1. Update description with BYOM messaging
2. Add "How It Works" section
3. Document self-hosting setup
4. Add cost calculator vs. competitors
5. Future roadmap section (containerization → cloud)

### Landing Page (Future)
- Emphasize BYOM and cost savings
- Self-hosted benefits
- Developer-friendly approach
- "Pay $6 for what costs $40 on Maestra"

---

## Key Decisions

### Why BYOM?
- No subscription fees to users
- No infrastructure costs for us (initially)
- Perfect for developers and technical users
- Complete transparency and control

### Why Self-Hosted First?
- Faster to MVP (no auth, database, billing)
- Validate product-market fit
- Build community and trust
- Cloud version can build on proven foundation

### Why Minimal Code?
- Easier to maintain
- Faster to implement
- Easier for contributors
- Focus on core value proposition

---

## Success Metrics for MVP

### Technical
- [ ] FFmpeg extracts audio correctly
- [ ] Whisper transcription works with AI SDK v5
- [ ] Timestamps accurate in VTT output
- [ ] No memory leaks with temp files
- [ ] Works with 100MB+ video files

### User Experience
- [ ] Upload to download in < 5 minutes for 10min video
- [ ] Clear error messages on failures
- [ ] Mock mode works without any setup
- [ ] Real mode works with just API key

### Community
- [ ] GitHub stars > 50
- [ ] At least 3 external users test it
- [ ] Zero critical bugs after 1 week
- [ ] Documentation clear enough for self-hosting

---

## Next Commit Messages

Following our "one feature per commit" rule:

1. `feat: add FFmpeg audio extraction with temp file cleanup`
2. `feat: integrate Whisper transcription via AI SDK v5 with BYOM support`
3. `feat: implement binary file upload with FormData`
4. `docs: update README with BYOM messaging and self-hosting guide`

---

## Questions to Answer During MVP

1. What's the typical transcription accuracy?
2. What's the average processing time per minute of video?
3. Do users prefer self-hosted or would pay for managed?
4. What's the #1 requested feature after transcription?
5. Is BYOM messaging resonating with target users?

These answers will inform post-MVP roadmap.
