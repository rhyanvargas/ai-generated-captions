# Feature 04: Video URL Download and Processing

**Status**: Pending  
**Priority**: Medium  
**Estimated Effort**: 4-5 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Implement video downloading from URLs to enable processing of remote videos without manual upload, with support for direct video URLs and common platforms.

## Objectives
- Download videos from direct URLs to temporary storage
- Validate URL accessibility before downloading
- Show download progress to users
- Handle large remote videos efficiently
- Support common video hosting platforms

## Tasks

### 1. Create Video Download Utility
- Create `src/lib/video-downloader.ts` module
- Implement `downloadVideoFromUrl()` function using `fetch` with streaming
- Save downloaded video to temporary directory
- Return local file path for processing

### 2. Add URL Validation and Detection
- Validate URL format and accessibility
- Detect video content type from headers
- Check file size before downloading (reject if >500MB)
- Support direct video URLs (.mp4, .mov, etc.)

### 3. Implement Progress Tracking
- Stream download with progress events
- Send progress updates to frontend via WebSocket or polling
- Show estimated time remaining
- Allow cancellation of long downloads

### 4. Update API Route Integration
- Modify `/src/app/api/generate-captions/route.ts`
- Add URL download before FFmpeg processing
- Reuse existing temporary file management
- Clean up downloaded files after processing

### 5. Add Platform-Specific Handling
- Add helper for direct video file URLs
- Document URL format requirements
- Handle redirects and CDN URLs
- Add timeout for downloads (10 min max)

## Success Criteria
- ✅ Videos successfully downloaded from direct URLs
- ✅ Download progress visible to users
- ✅ Large files handled without memory issues
- ✅ Invalid/inaccessible URLs rejected gracefully
- ✅ Downloaded files cleaned up after processing

## Technical Notes
- Use streaming to avoid loading entire video in memory
- Timeout: 10 minutes for download
- Maximum file size: 500MB (same as uploads)
- Store in same temp directory as uploaded files

## Dependencies
- Feature 01: FFmpeg Audio Extraction (processes downloaded videos)
- Feature 03: File Upload Binary Handling (shares file management)

## Follows Features
- Feature 05: Environment Mode Toggle (Dev/Prod)
