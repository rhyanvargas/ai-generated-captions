# Feature 09: Video Preview with Caption Overlay

**Status**: Pending  
**Priority**: Medium  
**Estimated Effort**: 4-5 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Add video player with synchronized caption overlay to preview generated captions before downloading, allowing users to verify timing and quality.

## Objectives
- Display uploaded/downloaded video in player
- Overlay generated captions synchronized with playback
- Support caption styling customization
- Allow caption toggling during playback
- Add playback controls (play, pause, seek, speed)

## Tasks

### 1. Create Video Player Component
- Create `video-player-with-captions.tsx` component
- Use HTML5 video element with controls
- Load video from File object or URL
- Add playback state management

### 2. Implement Caption Synchronization
- Parse VTT timestamps for display timing
- Show/hide captions based on current time
- Update captions in real-time during playback
- Handle caption transitions smoothly

### 3. Add Caption Styling Controls
- Create caption style editor panel
- Adjust font size, color, background
- Change caption position (top, bottom, center)
- Preview style changes in real-time

### 4. Integrate with Main Component
- Show video preview after caption generation
- Add "Preview Captions" button in results section
- Allow switching between preview and download modes
- Persist video for preview without re-upload

### 5. Add Playback Controls
- Implement custom play/pause button
- Add seek bar with caption markers
- Add playback speed control (0.5x - 2x)
- Add keyboard shortcuts (space, arrows)

## Success Criteria
- ✅ Video plays with synchronized captions
- ✅ Caption styling customizable in real-time
- ✅ Playback controls smooth and responsive
- ✅ Video works for both uploaded files and URLs
- ✅ Caption timing accurate within 100ms

## Technical Notes
- Use native `<video>` element with `<track>` for VTT
- Caption styling via CSS variables
- Playback speed affects caption timing
- Video preview limited to <100MB for performance

## Dependencies
- Feature 03: File Upload Binary Handling (provides video files)
- Feature 04: Video URL Download (provides video URLs)

## Follows Features
- Feature 10: Caption Timeline Editor
