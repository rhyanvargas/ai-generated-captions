# Feature 11: Batch Video Processing

**Status**: Pending  
**Priority**: Medium  
**Estimated Effort**: 4-5 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Enable processing of multiple videos simultaneously with queue management, progress tracking, and batch results download.

## Objectives
- Upload multiple videos at once
- Process videos in parallel (up to 3 concurrent)
- Show progress for each video in queue
- Download all results as single ZIP
- Persist queue state across page refreshes

## Tasks

### 1. Update Upload UI for Multiple Files
- Modify file input to accept multiple files
- Display list of queued videos
- Show status for each: pending, processing, complete, failed
- Add remove button for individual videos

### 2. Implement Processing Queue
- Create `src/lib/processing-queue.ts` utility
- Limit concurrent processing to 3 videos
- Queue additional videos automatically
- Retry failed videos with backoff

### 3. Add Progress Tracking
- Track progress for each video individually
- Show overall batch progress percentage
- Display estimated time remaining
- Update UI in real-time during processing

### 4. Create Batch Results Manager
- Collect all generated captions
- Create ZIP file with organized structure
- Include video names in caption filenames
- Add batch summary report (TXT file)

### 5. Add Queue Persistence
- Save queue state to localStorage
- Restore queue on page refresh
- Resume incomplete processing
- Clear completed items after download

## Success Criteria
- ✅ Multiple videos uploaded and queued successfully
- ✅ 3 videos process concurrently without issues
- ✅ Progress accurate for each video
- ✅ Batch download includes all captions properly organized
- ✅ Queue survives page refresh

## Technical Notes
- Max concurrent processing: 3 videos
- Queue stored in localStorage (limit 10 videos)
- Batch ZIP structure: `/video-name/captions.{txt,vtt,srt}`
- Processing timeout per video: 15 minutes

## Dependencies
- Feature 03: File Upload Binary Handling
- Feature 06: Enhanced Error Handling

## Follows Features
- Feature 12: REST API for Programmatic Access
