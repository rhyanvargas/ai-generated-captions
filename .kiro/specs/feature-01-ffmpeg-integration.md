# Feature 01: FFmpeg Audio Extraction

**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 3-4 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Integrate FFmpeg to extract audio from uploaded video files and video URLs, replacing the mock audio processing with real audio extraction capability.

## Objectives
- Install and configure FFmpeg in the project
- Extract audio from video files to temporary WAV format
- Handle different video formats (MP4, MOV, AVI, WebM)
- Clean up temporary audio files after processing
- Add error handling for unsupported formats

## Tasks

### 1. Add FFmpeg Dependencies
- Install `fluent-ffmpeg` npm package
- Install `@types/fluent-ffmpeg` for TypeScript support
- Add FFmpeg binary installation instructions to README
- Create environment variable for FFmpeg path (optional)

### 2. Create Audio Extraction Utility
- Create `src/lib/audio-extractor.ts` module with file header JSDoc
- Implement `extractAudio()` function with complete JSDoc documentation
- Include `@param`, `@returns`, `@throws`, and `@example` tags
- Implement `cleanupAudioFile()` with JSDoc
- Return path to extracted WAV file

### 3. Integrate with API Route
- Update `/src/app/api/generate-captions/route.ts`
- Replace mock audio extraction with real FFmpeg calls
- Add temporary file handling with cleanup
- Implement progress tracking for long extractions

### 4. Add Error Handling
- Handle unsupported video formats gracefully
- Add timeout for long-running extractions (5 min max)
- Return user-friendly error messages
- Log FFmpeg errors for debugging

### 5. Write Vitest Tests (REQUIRED)
- Create `src/lib/__tests__/audio-extractor.test.ts`
- Test successful audio extraction from sample video
- Test cleanup of temporary files
- Test error handling for invalid files
- Test timeout for long extractions
- **All tests must pass before feature is complete**

## Success Criteria
- ✅ Audio successfully extracted from MP4, MOV, AVI files
- ✅ Temporary files cleaned up after processing
- ✅ Errors handled with clear user feedback
- ✅ **Vitest tests written and passing** (see `testing-guidelines.md`)
- ✅ Test coverage ≥ 80% for audio-extractor module
- ✅ Documentation updated with setup instructions

## Technical Notes
- Use WAV format at 16kHz sample rate (optimal for Whisper)
- Store temp files in `/tmp` directory
- Maximum video size: 500MB (configurable)
- Extraction timeout: 5 minutes

## Dependencies
- None (first feature in production pipeline)

## Follows Features
- Feature 02: OpenAI Whisper API Integration
