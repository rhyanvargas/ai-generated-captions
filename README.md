# AI Video Caption Generator

A Next.js application that automatically generates video captions in both TXT and WebVTT formats using AI transcription.

## Features

- 🎥 **Video Upload**: Drag & drop or click to upload video files
- 🤖 **AI Transcription**: Uses OpenAI's GPT-4 to generate and clean up captions
- 📝 **Multiple Formats**: Outputs both plain text (.txt) and WebVTT (.vtt) formats
- 🎨 **Smooth Progress UI**: Beautiful progress indicators showing processing stages
- 📋 **Copy & Download**: Easy copy to clipboard and download functionality
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Next.js 15** - React framework with App Router
- **AI SDK** - For AI-powered transcription and text processing
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development

## Setup

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload a Video**: Drag and drop a video file or click to browse
2. **Generate Captions**: Click "Generate Captions" to start the AI processing
3. **View Progress**: Watch the smooth progress indicator as it processes your video
4. **Download Results**: Copy to clipboard or download the generated caption files

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

## Current Implementation

The current version uses a mock transcription system for demonstration. In a production environment, you would:

1. **Extract Audio**: Use FFmpeg to extract audio from video files
2. **Transcribe Audio**: Use OpenAI Whisper API or similar for accurate transcription
3. **Generate Timestamps**: Create precise timing information for captions

## Development

The main component is located at `src/components/video-caption-generator.tsx` and uses:

- **State Management**: React hooks for managing upload, processing, and results
- **File Handling**: Drag & drop and file input for video uploads
- **AI Integration**: OpenAI GPT-4 for caption generation and cleanup
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

## Contributing

Feel free to submit issues and enhancement requests! Check out our roadmap above for planned features you could help implement.

### Development Setup
```bash
# Fork the repo and clone your fork
git clone https://github.com/yourusername/ai-generated-captions.git
cd ai-generated-captions

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Add your OpenAI API key

# Start development server
pnpm dev
```

## License

MIT License - feel free to use this in your own projects.