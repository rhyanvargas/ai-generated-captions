import { NextRequest, NextResponse } from 'next/server'

interface CaptionResult {
    txt: string
    vtt: string
}

/**
 * Generate a realistic mock transcript based on input type
 * This simulates what would come from a real transcription service
 */
function generateMockTranscript(inputType: string, videoIdentifier: string): string {
    const mockTranscripts = [
        "Welcome to this video tutorial. Today we're going to explore some exciting concepts.",
        "Let's dive right into the main topic and see what we can learn together.",
        "First, I want to introduce the key principles that we'll be covering.",
        "This is really important to understand before we move forward.",
        "As you can see here, the process is actually quite straightforward.",
        "Many people find this challenging at first, but with practice it becomes easier.",
        "Let me show you a practical example of how this works in real life.",
        "Now, pay close attention to this next part because it's crucial.",
        "You might be wondering how all of these pieces fit together.",
        "The answer is simpler than you might think.",
        "In conclusion, remember these key takeaways from today's lesson.",
        "Thanks for watching, and I'll see you in the next video!"
    ]

    return mockTranscripts.join('\n')
}

function formatAsPlainText(transcript: string): string {
    return transcript
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n\n')
}

function formatAsVTT(transcript: string): string {
    const lines = transcript
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)

    let vtt = 'WEBVTT\n\n'
    let currentTime = 0

    lines.forEach((line, index) => {
        const startTime = formatTime(currentTime)
        const duration = Math.max(3, Math.min(8, line.length / 10))
        currentTime += duration
        const endTime = formatTime(currentTime)

        vtt += `${index + 1}\n`
        vtt += `${startTime} --> ${endTime}\n`
        vtt += `${line}\n\n`
    })

    return vtt
}

function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    const milliseconds = Math.floor((seconds % 1) * 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
}

export async function POST(request: NextRequest) {
    try {
        const { inputType, fileData, videoUrl } = await request.json()
        console.log('📥 Caption generation request:', { inputType, hasFileData: !!fileData, videoUrl })

        // Determine video identifier for logging
        const videoIdentifier = inputType === 'url' ? videoUrl : fileData || 'uploaded-file'

        if (inputType === 'url') {
            console.log('🔗 Processing video URL:', videoUrl)
            console.log('⚡ [MOCK MODE] Would download and extract audio from URL')
            console.log('📝 In production: Use FFmpeg to extract audio, then Whisper API for transcription')
        } else {
            console.log('📁 Processing uploaded file:', videoIdentifier)
            console.log('⚡ [MOCK MODE] Would extract audio from uploaded file')
            console.log('📝 In production: Use FFmpeg to extract audio, then Whisper API for transcription')
        }

        // Generate mock transcript
        console.log('🎤 [MOCK MODE] Generating mock transcript...')
        const mockTranscript = generateMockTranscript(inputType, videoIdentifier)
        console.log('✨ Mock transcript generated, length:', mockTranscript.length)

        // Format outputs
        console.log('📝 Formatting captions in TXT and VTT formats...')
        const txtFormat = formatAsPlainText(mockTranscript)
        const vttFormat = formatAsVTT(mockTranscript)

        const result: CaptionResult = {
            txt: txtFormat,
            vtt: vttFormat
        }

        console.log('✅ Caption generation successful')
        return NextResponse.json(result)

    } catch (error) {
        console.error('❌ Error generating captions:', error)
        return NextResponse.json(
            { error: `Failed to generate captions: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        )
    }
}