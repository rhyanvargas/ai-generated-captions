# Feature 05: Environment Mode Toggle (Dev/Prod)

**Status**: Pending  
**Priority**: Medium  
**Estimated Effort**: 2-3 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Add environment-based mode toggle to seamlessly switch between mock transcription (dev) and real transcription (prod) without code changes.

## Objectives
- Detect environment mode automatically
- Toggle between mock and real transcription
- Add visual indicators for current mode
- Make mode configurable via environment variables
- Document mode switching for developers

## Tasks

### 1. Add Environment Configuration
- Add `TRANSCRIPTION_MODE` env variable (mock/production)
- Create `src/lib/config.ts` for centralized config
- Auto-detect mode based on API key presence
- Add default to mock mode for development

### 2. Create Mode Detection Utility
- Implement `getTranscriptionMode()` function
- Check for OpenAI API key availability
- Respect explicit mode override from env
- Return current mode for logging

### 3. Update API Route with Mode Logic
- Wrap real transcription in mode check
- Fall back to mock when in dev mode
- Add clear console logs indicating current mode
- Update response headers with mode info

### 4. Add Frontend Mode Indicator
- Show badge/banner when in mock mode
- Add tooltip explaining mock vs. production
- Display mode in footer or settings
- Make indicator dismissible (localStorage)

### 5. Update Documentation
- Document environment variables for mode control
- Add "Switching to Production" guide
- Update README with mode explanation
- Add troubleshooting for mode issues

## Success Criteria
- ✅ App uses mock mode when no API key present
- ✅ App uses real transcription when API key configured
- ✅ Mode clearly visible to users in UI
- ✅ Seamless switching without code changes
- ✅ Documentation clear on mode usage

## Technical Notes
- Default mode: `mock` (safe for development)
- Environment variable: `TRANSCRIPTION_MODE=mock|production`
- Auto-detect: Use production if `OPENAI_API_KEY` exists
- UI indicator: Non-intrusive banner at bottom

## Dependencies
- Feature 01: FFmpeg Audio Extraction
- Feature 02: Whisper API Integration

## Follows Features
- Feature 06: Enhanced Error Handling
