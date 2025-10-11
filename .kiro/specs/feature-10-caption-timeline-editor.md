# Feature 10: Caption Timeline Editor

**Status**: Pending  
**Priority**: Low  
**Estimated Effort**: 5-6 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Add interactive timeline editor for manual caption timing adjustments, text editing, and fine-tuning of auto-generated captions.

## Objectives
- Display captions on visual timeline
- Enable drag-and-drop timing adjustments
- Allow in-place text editing of captions
- Add split/merge caption functionality
- Support undo/redo operations

## Tasks

### 1. Create Timeline Component
- Build `caption-timeline.tsx` component
- Display captions as blocks on timeline
- Show video duration and time markers
- Implement zoom in/out for timeline

### 2. Add Drag-and-Drop Editing
- Make caption blocks draggable horizontally
- Update timestamps when blocks moved
- Add edge handles for duration adjustment
- Snap to grid for precise timing

### 3. Implement Text Editing
- Add inline text editor for captions
- Update caption text in real-time
- Show character count per caption
- Validate changes before saving

### 4. Add Caption Management Tools
- Add "Split Caption" at current position
- Add "Merge Captions" for selected blocks
- Add "Delete Caption" button
- Add "Add New Caption" at specific time

### 5. Implement Undo/Redo System
- Track all editing operations
- Add undo/redo buttons and keyboard shortcuts
- Show history of changes
- Reset to original captions option

## Success Criteria
- ✅ Captions draggable with smooth interaction
- ✅ Text edits saved and reflected in output
- ✅ Split/merge operations work correctly
- ✅ Undo/redo maintains consistent state
- ✅ Timeline synced with video preview

## Technical Notes
- Use state management for timeline data
- Implement command pattern for undo/redo
- Timeline resolution: 100ms per pixel (adjustable)
- Max undo history: 50 operations

## Dependencies
- Feature 09: Video Preview with Caption Overlay (provides video context)

## Follows Features
- Feature 11: Batch Video Processing
