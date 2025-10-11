# AI Video Caption Generator

A Next.js application that automatically generates video captions in both TXT and WebVTT formats using AI transcription.

## Features

- 🎥 **Dual Input Methods**: Upload video files OR paste video URLs
- 🔗 **Video URL Support**: Process videos directly from web links
- 🤖 **Mock Transcription**: Generates realistic caption demos (production-ready for FFmpeg + Whisper integration)
- 📝 **Multiple Formats**: Outputs both plain text (.txt) and WebVTT (.vtt) formats
- 🎨 **Smooth Progress UI**: Beautiful progress indicators showing processing stages
- 📋 **Copy & Download**: Easy copy to clipboard and download functionality
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ✅ **URL Validation**: Smart validation for video URLs with error handling

## Tech Stack

- **Next.js 15** - React framework with App Router
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Mock Transcription** - Ready for FFmpeg + OpenAI Whisper integration

## Setup

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

> **Note**: The app currently runs in **mock mode** and doesn't require any API keys. It generates realistic demo captions to showcase the UI/UX. See [Production Setup](#production-setup) below for real transcription integration.

## Usage

### Method 1: File Upload
1. **Choose "Upload File"** tab in the interface
2. **Upload a Video**: Drag and drop a video file or click to browse
3. **Generate Captions**: Click "Generate Captions" to start processing

### Method 2: Video URL
1. **Choose "Video URL"** tab in the interface  
2. **Paste Video URL**: Enter a direct link to your video file
3. **Generate Captions**: Click "Generate Captions from URL" to start processing

### Results
4. **View Progress**: Watch the smooth progress indicator as it processes your video
5. **Download Results**: Copy to clipboard or download the generated caption files in both TXT and VTT formats

## File Formats

### Plain Text (.txt)
Clean, readable text format perfect for:
- Subtitles in video editing software
- Accessibility documentation
- Content transcription

### WebVTT (.vtt)
Web Video Text Tracks format with timestamps, ideal for:
- HTML5 video players
- YouTube captions
- Web-based video platforms

## Implementation Status

### ✅ **Completed Features**
- [x] **UI/UX**: Complete interface with drag & drop, URL input, progress indicators
- [x] **Dual Input Methods**: File upload and video URL support with mode switching
- [x] **API Architecture**: Production-ready `/api/generate-captions` endpoint
- [x] **AI Integration**: OpenAI GPT-4 for transcript cleanup and improvement
- [x] **Format Generation**: Complete TXT and WebVTT output with proper timestamps
- [x] **User Actions**: Copy to clipboard, download files, error handling
- [x] **Responsive Design**: Works on desktop and mobile devices

### 🚧 **In Progress / Next Steps**
- [ ] **Audio Extraction**: FFmpeg integration for video → audio conversion
- [ ] **Speech-to-Text**: OpenAI Whisper API for actual transcription
- [ ] **File Processing**: Handle large file uploads and streaming
- [ ] **URL Processing**: Download and process videos from web URLs
- [ ] **Production Deployment**: Environment setup and scaling

### 🏗️ **Current Architecture**
- **Frontend**: Next.js 15 + React 19 + TypeScript + shadcn/ui
- **Backend**: API Routes with server-side processing
- **Mock Mode**: Realistic demo transcripts (no API keys required)
- **Production Ready**: Architecture prepared for FFmpeg + Whisper integration

## Development

The main component is located at `src/components/video-caption-generator.tsx` and uses:

- **State Management**: React hooks for managing upload, processing, and results
- **File Handling**: Drag & drop and file input for video uploads
- **Mock Transcription**: Generates realistic demo captions for testing
- **Format Conversion**: Utilities to convert transcripts to TXT and VTT formats

## Roadmap

### 🚀 Planned Features

#### 🌍 Multi-Language Translation
- **Auto-detect source language** from video content
- **Translate captions** to 50+ languages using AI
- **Batch translation** for multiple target languages
- **Language-specific formatting** and cultural adaptations
- **Export translated VTT files** with proper language tags

#### 🎯 Enhanced Transcription
- **Real audio extraction** using FFmpeg integration
- **OpenAI Whisper API** for production-grade transcription
- **Speaker identification** and multi-speaker support
- **Custom vocabulary** for technical terms and proper nouns
- **Confidence scoring** and manual correction interface

#### ⚡ Performance & Quality
- **Chunked processing** for large video files
- **Real-time progress** with detailed status updates
- **Quality assessment** and automatic retry on low confidence
- **Batch processing** for multiple videos
- **Cloud storage integration** (AWS S3, Google Cloud)

#### 🎨 UI/UX Improvements
- **Video preview** with synchronized caption overlay
- **Timeline editor** for manual timestamp adjustments
- **Caption styling** options (font, size, positioning)
- **Keyboard shortcuts** for power users
- **Dark mode** support

#### 🔧 Developer Features
- **REST API** for programmatic access
- **Webhook notifications** for processing completion
- **Custom model support** (local Whisper, other providers)
- **Plugin system** for custom post-processing
- **Analytics dashboard** for usage tracking

### 📋 Implementation Priority

1. **Phase 1**: Real audio extraction + Whisper integration
2. **Phase 2**: Multi-language translation system
3. **Phase 3**: Enhanced UI with video preview
4. **Phase 4**: API and developer tools
5. **Phase 5**: Advanced features and optimizations

### 💡 Feature Requests

Have an idea for a new feature? We'd love to hear it! 
- Open an issue with the `enhancement` label
- Describe your use case and expected behavior
- Include mockups or examples if helpful

## 🎯 Development Status

**Current Phase**: Core functionality complete, ready for real data processing integration

**Demo Status**: ✅ Fully functional with mock transcripts  
**Production Ready**: 🚧 Architecture complete, needs FFmpeg + Whisper integration

## Production Setup

To enable **real transcription** capabilities, you'll need to integrate:

### 1. Audio Extraction (FFmpeg)
```bash
# Install FFmpeg
brew install ffmpeg  # macOS
# or use Docker container with FFmpeg included
```

### 2. OpenAI Whisper API
```bash
# Add to .env.local
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Update API Route
Modify `/src/app/api/generate-captions/route.ts`:
- Replace `generateMockTranscript()` with actual FFmpeg audio extraction
- Use OpenAI Whisper API for speech-to-text transcription
- See inline comments marked with `[MOCK MODE]` for integration points

### 4. File Upload Handler
Implement proper file upload handling:
- Use `FormData` instead of JSON payload
- Stream large files to disk/S3
- Extract audio using FFmpeg child process

## Contributing

Feel free to submit issues and enhancement requests! Check out our roadmap above for planned features you could help implement.

### Development Setup
```bash
# Fork the repo and clone your fork
git clone https://github.com/yourusername/ai-generated-captions.git
cd ai-generated-captions

# Install dependencies
pnpm install

# Start development server (no API keys needed for mock mode)
pnpm dev
```

## License

MIT License - feel free to use this in your own projects.