# Product Overview

## AI Video Caption Generator

A Next.js web application that automatically generates video captions in multiple formats using AI transcription. The app provides a simple drag-and-drop interface for video uploads and outputs both plain text (.txt) and WebVTT (.vtt) caption files.

### Core Features
- Video file upload with drag-and-drop support
- Video URL input for remote video processing
- AI-powered transcription using OpenAI GPT-4
- Configurable output formats with .txt as default (reduces AI token usage)
- Dual format output options (TXT and WebVTT)
- Real-time progress tracking with smooth UI animations
- Copy to clipboard and download functionality
- Responsive design for desktop and mobile

### Current State
The application uses mock transcription for demonstration. Production implementation would integrate FFmpeg for audio extraction and OpenAI Whisper API for actual transcription.

### Target Users
- Content creators needing video captions
- Accessibility professionals
- Video editors and producers
- Educational content developers