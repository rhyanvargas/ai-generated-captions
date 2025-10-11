'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Upload, Download, Copy, CheckCircle, Loader2, FileText, Video, Link } from 'lucide-react'
// Remove the direct import since we'll use the API route

interface CaptionResult {
  txt: string
  vtt: string
}

type ProcessStage = 'upload' | 'processing' | 'transcribing' | 'formatting' | 'complete'
type InputMode = 'file' | 'url'

const stageInfo = {
  upload: { label: 'Uploading video...', progress: 20 },
  processing: { label: 'Processing video...', progress: 40 },
  transcribing: { label: 'Generating transcription...', progress: 70 },
  formatting: { label: 'Formatting captions...', progress: 90 },
  complete: { label: 'Complete!', progress: 100 }
}

export function VideoCaptionGenerator() {
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [inputMode, setInputMode] = useState<InputMode>('file')
  const [stage, setStage] = useState<ProcessStage>('upload')
  const [captions, setCaptions] = useState<CaptionResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copiedType, setCopiedType] = useState<'txt' | 'vtt' | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type.startsWith('video/')) {
      setFile(selectedFile)
      setVideoUrl('')
      setInputMode('file')
      setStage('upload')
      setCaptions(null)
    }
  }

  const handleUrlChange = (url: string) => {
    setVideoUrl(url)
    setFile(null)
    setInputMode('url')
    setStage('upload')
    setCaptions(null)
  }

  const isValidVideoUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const processVideo = async () => {
    if (!file && !videoUrl) return

    setIsProcessing(true)

    try {
      // Simulate processing stages
      setStage('processing')
      await new Promise(resolve => setTimeout(resolve, 1000))

      setStage('transcribing')

      // Prepare request data
      const requestData: any = {
        inputType: inputMode,
      }

      if (inputMode === 'url') {
        requestData.videoUrl = videoUrl
      } else if (file) {
        // TODO: Convert file to base64 or use FormData for file upload
        console.log('📁 Would send file data:', { name: file.name, size: file.size, type: file.type })
        requestData.fileData = `[File: ${file.name}]` // Placeholder
      }

      const response = await fetch('/api/generate-captions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate captions')
      }

      const result = await response.json()

      setStage('formatting')
      await new Promise(resolve => setTimeout(resolve, 500))

      setCaptions(result)
      setStage('complete')
    } catch (error) {
      console.error('Error processing video:', error)
      // Reset to upload state on error
      setStage('upload')
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = async (text: string, type: 'txt' | 'vtt') => {
    await navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setFile(null)
    setVideoUrl('')
    setInputMode('file')
    setStage('upload')
    setCaptions(null)
    setIsProcessing(false)
    setCopiedType(null)
  }

  const getVideoDisplayName = () => {
    if (inputMode === 'file' && file) {
      return file.name
    }
    if (inputMode === 'url' && videoUrl) {
      try {
        const url = new URL(videoUrl)
        return url.hostname + url.pathname
      } catch {
        return videoUrl
      }
    }
    return 'video'
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-6 w-6" />
            Video Caption Generator
          </CardTitle>
          <CardDescription>
            Upload a video file or paste a video URL to automatically generate captions in TXT and VTT formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Mode Selection */}
          {!file && !videoUrl && (
            <div className="space-y-6">
              {/* Mode Toggle */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={inputMode === 'file' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setInputMode('file')}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
                <Button
                  variant={inputMode === 'url' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setInputMode('url')}
                  className="flex-1"
                >
                  <Link className="h-4 w-4 mr-2" />
                  Video URL
                </Button>
              </div>

              {/* File Upload */}
              {inputMode === 'file' && (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Drop your video here or click to browse</p>
                  <p className="text-sm text-gray-500">Supports MP4, MOV, AVI, and other video formats</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  />
                </div>
              )}

              {/* URL Input */}
              {inputMode === 'url' && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <Link className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-2">Enter video URL</p>
                    <p className="text-sm text-gray-500">Paste a direct link to your video file</p>
                  </div>
                  <div className="space-y-3">
                    <Input
                      type="url"
                      placeholder="https://example.com/video.mp4"
                      value={videoUrl}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      className="text-center"
                    />
                    {videoUrl && !isValidVideoUrl(videoUrl) && (
                      <p className="text-sm text-red-500 text-center">Please enter a valid URL</p>
                    )}
                    {videoUrl && isValidVideoUrl(videoUrl) && (
                      <Button onClick={processVideo} className="w-full">
                        Generate Captions from URL
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video Selected */}
          {(file || videoUrl) && !isProcessing && stage === 'upload' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Video className="h-8 w-8 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">{getVideoDisplayName()}</p>
                  <p className="text-sm text-gray-500">
                    {inputMode === 'file' && file
                      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                      : 'Video URL'
                    }
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={processVideo} className="flex-1">
                  Generate Captions
                </Button>
                <Button variant="outline" onClick={reset}>
                  Choose Different {inputMode === 'file' ? 'File' : 'URL'}
                </Button>
              </div>
            </div>
          )}

          {/* Processing Progress */}
          {isProcessing && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-medium">{stageInfo[stage].label}</span>
              </div>
              <Progress value={stageInfo[stage].progress} className="w-full" />
            </div>
          )}

          {/* Results */}
          {captions && stage === 'complete' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Captions generated successfully!</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* TXT Format */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="h-5 w-5" />
                      Plain Text (.txt)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={captions.txt}
                      readOnly
                      className="min-h-[200px] font-mono text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(captions.txt, 'txt')}
                        className="flex-1"
                      >
                        {copiedType === 'txt' ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copiedType === 'txt' ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadFile(captions.txt, `${getVideoDisplayName()}-captions.txt`, 'text/plain')}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* VTT Format */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="h-5 w-5" />
                      WebVTT (.vtt)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={captions.vtt}
                      readOnly
                      className="min-h-[200px] font-mono text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(captions.vtt, 'vtt')}
                        className="flex-1"
                      >
                        {copiedType === 'vtt' ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copiedType === 'vtt' ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadFile(captions.vtt, `${getVideoDisplayName()}-captions.vtt`, 'text/vtt')}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button variant="outline" onClick={reset} className="w-full">
                Generate Captions for Another Video
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}