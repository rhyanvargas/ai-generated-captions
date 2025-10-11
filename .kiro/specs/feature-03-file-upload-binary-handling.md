# Feature 03: File Upload with Binary Handling

**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 3-4 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Implement proper binary file upload handling to replace the current placeholder string approach, enabling real video file processing.

## Objectives
- Replace JSON payload with FormData for file uploads
- Handle large video files with streaming
- Store uploaded files temporarily for processing
- Add file size validation and limits
- Clean up uploaded files after processing

## Tasks

### 1. Update Frontend File Upload
- Modify `video-caption-generator.tsx` to use FormData
- Remove placeholder `[File: filename]` logic
- Implement progress tracking for large uploads
- Add client-side file size validation (max 500MB)

### 2. Update API Route to Handle Binary Data
- Change API route to accept `multipart/form-data`
- Use Next.js file upload handling or `formidable`
- Stream uploaded files to temporary directory
- Return file path for FFmpeg processing

### 3. Implement Temporary File Management
- Create `src/lib/file-manager.ts` utility
- Generate unique filenames for uploaded videos
- Store files in `/tmp` or configurable directory
- Implement automatic cleanup after processing

### 4. Add File Validation
- Validate file MIME types (video formats only)
- Check file size limits before processing
- Verify file integrity after upload
- Return validation errors to frontend

### 5. Write Vitest Tests (REQUIRED)
- Create component tests in `src/components/__tests__/video-caption-generator.test.tsx`
- Test file upload interaction (file select, drag-drop)
- Test FormData creation and submission
- Test error states (invalid file, too large)
- Test API route file handling
- **All tests must pass before feature is complete**

## Success Criteria
- ✅ Large video files (up to 500MB) upload successfully
- ✅ Files stored temporarily and cleaned up after processing
- ✅ Upload progress shown to user
- ✅ Invalid files rejected with clear error messages
- ✅ **Vitest tests written and passing** (see `testing-guidelines.md`)
- ✅ Component tests cover user interactions
- ✅ No memory issues with large file uploads

## Technical Notes
- Use streaming to handle large files efficiently
- Maximum file size: 500MB (configurable via env)
- Supported formats: MP4, MOV, AVI, WebM, MKV
- Cleanup temp files after 1 hour if not processed

## Dependencies
- Feature 01: FFmpeg Audio Extraction (consumes uploaded files)

## Follows Features
- Feature 04: Video URL Download and Processing
