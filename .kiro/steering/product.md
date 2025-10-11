# Product Strategy & Vision

**Purpose**: Product positioning, philosophy, competitive advantage, and future roadmap.

---

## Core Message

**"The Simple, Open-Source Caption Generator for Developers and Creators. Bring Your Own Model (BYOM)"**

---

## Product Overview

A Next.js web application that automatically generates video captions using AI transcription. The app emphasizes simplicity, self-hosting, and user control through the BYOM (Bring Your Own Model) philosophy.

### Key Differentiators
1. **BYOM Philosophy** - Users provide their own API keys
2. **Self-Hosted** - Run on your own infrastructure
3. **Open-Source** - Fully transparent, customizable codebase
4. **Pay-Per-Use** - No subscriptions, only pay for API usage
5. **Minimal Code** - Clean, focused implementation

---

## BYOM (Bring Your Own Model) Philosophy

### Core Principles

**User Control**:
- Users provide their own OpenAI API keys via `.env.local`
- No middleman charges or markup
- Complete cost transparency
- Data never touches our servers (self-hosted)

**Cost Structure**:
- **OpenAI Whisper API**: ~$0.006 per minute of audio
- **Example**: 10 hours of video = ~$3.60 in API costs
- **No subscription fees**
- **No hidden charges**

**Comparison to Competitors**:
| Feature | Our Tool (BYOM) | Maestra.ai | Rev.com |
|---------|----------------|------------|---------|
| **Pricing** | $0.006/min (API only) | $12-120/month | $1.50/min |
| **Data Privacy** | Your infrastructure | Their servers | Their servers |
| **Customization** | Full control | Limited | None |
| **Vendor Lock-in** | None | High | High |

**Savings**: 90% cheaper than SaaS alternatives for regular usage.

---

## Current Features (MVP)

### ✅ Implemented
- Mock transcription system (development/demo mode)
- TXT and VTT format generation
- File upload UI with drag-and-drop
- Video URL input
- Download and copy functionality
- Clean, modern UI with progress indicators
- BYOM messaging throughout interface

### 🚧 In Progress (Next 6-9 hours)
- **Feature 01**: FFmpeg audio extraction (3-4 hours)
- **Feature 02**: Whisper transcription via AI SDK v5 (2-3 hours)
- **Feature 03**: Binary file upload handling (2-3 hours)
- **Testing**: Vitest tests for all features (integrated)

---

## Target Users

### Primary Audience
- **Developers** - Want self-hosted tools with full control
- **Content Creators** - Need affordable captioning at scale
- **Privacy-Conscious Users** - Require data to stay on their infrastructure
- **Cost-Sensitive Users** - Want to avoid subscription fees

### Use Cases
1. **YouTube Creators** - Caption videos for accessibility
2. **Educational Content** - Transcribe lectures and tutorials
3. **Podcasters** - Convert audio to searchable text
4. **Video Editors** - Generate subtitles for client projects
5. **Accessibility Teams** - Create compliant captions

---

## Competitive Positioning

### vs. SaaS Solutions (Maestra.ai, Rev.com, Otter.ai)

**Our Advantages**:
- ✅ 90% cheaper (pay-per-use vs subscriptions)
- ✅ Self-hosted (data privacy)
- ✅ Open-source (full transparency)
- ✅ No vendor lock-in
- ✅ Customizable codebase

**Trade-offs**:
- ⚠️ Requires technical setup (developer-focused)
- ⚠️ Self-managed infrastructure
- ⚠️ No managed video storage (bring your own)

**Market Position**: "Developer-first alternative to expensive SaaS captioning tools"

---

## Future Roadmap

### Phase 1: MVP (Current - 6-9 hours)
- [x] Mock system working
- [x] Testing framework setup
- [ ] FFmpeg integration
- [ ] Whisper transcription
- [ ] Binary file upload
- [ ] All tests passing

**Success Criteria**: Real transcription working with BYOM, ≥80% test coverage

### Phase 2: Containerization (2-3 hours)
- [ ] Dockerfile for easy deployment
- [ ] Docker Compose setup
- [ ] One-command deployment
- [ ] Environment configuration guide
- [ ] Community testing

**Success Criteria**: Anyone can deploy in < 5 minutes

### Phase 3: Enhanced Features (Optional - 20-30 hours)
- [ ] Video URL download (Feature 04)
- [ ] Environment mode toggle (Feature 05)
- [ ] Enhanced error handling (Feature 06)
- [ ] Caption format customization (Feature 07)
- [ ] Language detection/translation (Feature 08)
- [ ] Batch processing (Feature 11)

**Success Criteria**: Feature parity with basic SaaS offerings

### Phase 4: Cloud Hosted Version (Future - 40-60 hours)
**Different project, separate from BYOM self-hosted version**

Managed service for non-technical users:
- [ ] User authentication
- [ ] Video storage (S3/R2)
- [ ] Subscription billing
- [ ] Team collaboration
- [ ] Usage dashboard
- [ ] Managed infrastructure

**Business Model**: $5-10/month for managed hosting + API passthrough costs

**Decision Point**: Only pursue if community validates demand

---

## Success Metrics

### MVP Launch Goals
- 50+ GitHub stars
- 10+ external users testing
- Zero critical bugs after 1 week
- Clear, working documentation
- Positive community feedback

### Community Validation Needed Before Cloud Version
- 500+ GitHub stars
- 100+ active self-hosted deployments
- Feature requests indicating demand for managed service
- Willingness to pay for managed hosting

---

## Key Messaging

### Elevator Pitch
"Turn any video into captions in minutes using your own OpenAI API key. Self-hosted, open-source, and 90% cheaper than SaaS alternatives."

### Value Propositions
1. **Cost**: ~$0.006/min vs. $12-120/month subscriptions
2. **Privacy**: Your data stays on your infrastructure
3. **Control**: Open-source, fully customizable
4. **Simplicity**: Minimal code, easy to understand
5. **No Lock-in**: Use your own API keys, switch anytime