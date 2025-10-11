# Feature 08: Language Detection and Translation

**Status**: Pending  
**Priority**: Medium  
**Estimated Effort**: 4-5 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Add automatic language detection for source video and multi-language translation capabilities for generated captions.

## Objectives
- Auto-detect source language from transcription
- Translate captions to multiple target languages
- Support 50+ languages via OpenAI GPT
- Generate translated caption files for each language
- Show language confidence scores to users

## Tasks

### 1. Implement Language Detection
- Use Whisper API language detection feature
- Display detected language to user
- Add confidence score indicator
- Allow manual language override if needed

### 2. Create Translation Module
- Create `src/lib/translator.ts` utility
- Use OpenAI GPT for caption translation
- Support batch translation for efficiency
- Preserve caption timing in translations

### 3. Add Language Selection UI
- Add multi-select dropdown for target languages
- Show popular languages at top (ES, FR, DE, ZH, JA)
- Add "Translate All" option for common languages
- Display translation progress for each language

### 4. Generate Translated Captions
- Translate caption text while preserving timing
- Create separate VTT/SRT/TXT files per language
- Add language codes to filenames (e.g., `video-captions-es.vtt`)
- Update bulk download to include translations

### 5. Update API Route for Translations
- Add `/api/translate-captions` endpoint
- Accept source text and target languages
- Return translations with preserved formatting
- Add caching for repeated translations

## Success Criteria
- ✅ Source language detected accurately (>90%)
- ✅ Translations maintain caption timing
- ✅ 50+ languages supported and tested
- ✅ Translation quality validated with native speakers
- ✅ Bulk download includes all language variants

## Technical Notes
- Use Whisper's built-in language detection
- Translation via GPT-4 with context preservation
- Supported languages: All Whisper-supported languages
- Cost: ~$0.01 per language per minute of video

## Dependencies
- Feature 02: Whisper API Integration (provides language detection)

## Follows Features
- Feature 09: Video Preview with Caption Overlay
