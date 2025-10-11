# Feature 02: OpenAI Whisper API Integration

**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 2-3 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Integrate OpenAI Whisper API to transcribe audio files extracted from videos, replacing mock transcript generation with real AI-powered speech-to-text.

## Objectives
- Configure OpenAI API client with environment variables
- Send audio files to Whisper API for transcription
- Handle API rate limits and errors
- Parse and format Whisper responses
- Add timestamp data from Whisper output

## Tasks

### 1. Configure OpenAI Client
- Add `OPENAI_API_KEY` to `.env.local`
- Install OpenAI SDK if not present
- Create `src/lib/transcription.ts` module
- Initialize OpenAI client with proper configuration

### 2. Implement Whisper Transcription
- Create `transcribeAudio()` function
- Send audio file to Whisper API (`whisper-1` model)
- Request timestamped output format
- Handle large audio files (chunking if needed)

### 3. Parse Whisper Response
- Extract transcript text from API response
- Parse timestamp data for VTT formatting
- Handle multi-speaker detection (if available)
- Format output for caption generation

### 4. Update API Route Integration
- Replace `generateMockTranscript()` with `transcribeAudio()`
- Add environment check (use mock if no API key)
- Update console logs to indicate real transcription
- Add processing time tracking

### 5. Error Handling and Fallbacks
- Handle API rate limits with retry logic
- Add fallback to mock mode on API failures
- Validate audio format before sending
- Return detailed error messages to user

## Success Criteria
- ✅ Audio successfully transcribed via Whisper API
- ✅ Timestamps accurate for VTT format generation
- ✅ Graceful fallback to mock mode without API key
- ✅ Rate limit handling prevents failures
- ✅ Transcription quality validated with test videos

## Technical Notes
- Use Whisper `whisper-1` model
- Request `verbose_json` response format for timestamps
- Maximum audio length: 25MB file size
- Cost estimate: ~$0.006 per minute of audio

## Dependencies
- Feature 01: FFmpeg Audio Extraction (provides audio files)

## Follows Features
- Feature 03: File Upload with Binary Handling
