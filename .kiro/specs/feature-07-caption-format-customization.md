# Feature 07: Caption Format Customization

**Status**: Pending  
**Priority**: Medium  
**Estimated Effort**: 2-3 hours  
**Git Commit Scope**: Single atomic commit

## Overview
Add customization options for caption output formats, including SRT support, adjustable timing, and caption styling preferences.

## Objectives
- Add SRT format output alongside TXT and VTT
- Allow users to adjust caption timing parameters
- Add caption line length customization
- Support multiple format downloads in one go
- Persist user format preferences

## Tasks

### 1. Add SRT Format Support
- Create `formatAsSRT()` function in API route
- Generate SRT format with proper numbering
- Include timestamps in SRT format (HH:MM:SS,mmm)
- Return SRT alongside TXT and VTT

### 2. Create Format Customization UI
- Add settings panel in component
- Add checkboxes for output formats (TXT, VTT, SRT)
- Add sliders for timing adjustments (duration, gap)
- Add input for max characters per line

### 3. Implement Customization Logic
- Accept format preferences in API request
- Apply timing adjustments to VTT/SRT outputs
- Enforce character limits per caption line
- Return only requested formats

### 4. Add Bulk Download
- Create "Download All" button
- Generate ZIP file with all selected formats
- Use `jszip` library for client-side zipping
- Include video name in zip filename

### 5. Persist User Preferences
- Store format preferences in localStorage
- Load saved preferences on component mount
- Add "Reset to Defaults" button
- Show current settings in UI

## Success Criteria
- ✅ SRT format generated correctly with proper timing
- ✅ Users can customize caption timing and length
- ✅ Preferences saved and restored between sessions
- ✅ Bulk download creates proper ZIP file
- ✅ All formats validated for correctness

## Technical Notes
- SRT timing format: `HH:MM:SS,mmm --> HH:MM:SS,mmm`
- Default max chars per line: 42 (configurable)
- Default caption duration: 3-8 seconds (adjustable)
- Use `jszip` for client-side ZIP creation

## Dependencies
- None (enhances existing caption generation)

## Follows Features
- Feature 08: Language Detection and Translation
