# AI Generated Captions - Steering Documentation

**Project**: AI Video Caption Generator  
**Tagline**: "The Simple, Open-Source Caption Generator for Developers and Creators. Bring Your Own Model (BYOM)"  
**Version**: MVP (Self-Hosted)

---

## 📚 Documentation Index

### ⚠️ Core Foundation Documents (READ THESE FIRST)

These 4 documents define how the project works and how you should work on it:

1. **[tech.md](tech.md)** - Technology Stack  
   Framework, tools, dependencies, testing setup, and build commands.

2. **[structure.md](structure.md)** - Project Structure & Coding Standards  
   Code organization, JSDoc requirements, TypeScript standards, testing patterns.

3. **[product.md](product.md)** - Product Strategy & Vision  
   BYOM philosophy, competitive positioning, roadmap, and success metrics.

4. **[documentation.md](documentation.md)** - Documentation Standards  
   README maintenance, changelog practices, code documentation guidelines.

### 📋 Active Working Documents

5. **[next-steps-mvp.md](next-steps-mvp.md)**  
   Step-by-step implementation guide with code examples.  
   *Your immediate action plan for MVP.*

6. **[testing-guidelines.md](testing-guidelines.md)**  
   Complete Vitest setup, testing patterns, and coverage requirements.

7. **[coding-standards.md](coding-standards.md)**  
   Extended JSDoc guidelines, VSCode integration, and enforcement rules.

8. **[changelog.md](changelog.md)**  
   Living document of improvements, learnings, and before/after examples.

### 📦 Feature Specifications

**Location**: `.kiro/specs/` directory (separate from steering)

- **[../specs/features-index.md](../specs/features-index.md)** - All 13 planned features
- **[../specs/feature-01-ffmpeg-integration.md](../specs/feature-01-ffmpeg-integration.md)** - Audio extraction
- **[../specs/feature-02-whisper-api-integration.md](../specs/feature-02-whisper-api-integration.md)** - Whisper transcription
- **[../specs/feature-03-file-upload-binary-handling.md](../specs/feature-03-file-upload-binary-handling.md)** - File upload
- **[../specs/feature-04+](../specs/)** - Future features (04-13)

---

## 🎯 Project Philosophy

### BYOM (Bring Your Own Model)
- Users provide their own OpenAI API keys
- No subscription fees - pay only for API usage (~$0.006/min)
- Self-hosted on user's infrastructure
- Complete transparency and cost control

### Minimal Code
- Focus on core functionality only
- Clean, maintainable codebase
- No feature bloat
- Easy to understand and extend

### Test-Driven Quality
- ⚠️ **Every feature requires Vitest tests**
- ≥80% code coverage on new modules
- Tests must pass before feature is complete
- No exceptions - tests ensure reliability

---

## 🚀 Quick Start for Developers

### Current Status
✅ Mock system working  
✅ UI complete  
✅ AI SDK v5 installed  
⏳ Real transcription (next 3 features)

### Next 3 Steps (6-9 hours)

1. **Setup Testing** (10 min)
   ```bash
   pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
   ```

2. **Feature 01: FFmpeg Audio Extraction** (3-4 hours with tests)
   - Install fluent-ffmpeg
   - Create audio-extractor.ts
   - Write and pass tests

3. **Feature 02: Whisper via AI SDK** (2-3 hours with tests)
   - Create transcription.ts with AI SDK v5
   - Mock and test transcription
   - Integrate with API route

4. **Feature 03: Binary File Upload** (2-3 hours with tests)
   - Update frontend to FormData
   - Handle multipart in API
   - Test component interactions

See `next-steps-mvp.md` for detailed implementation.

---

## 📋 Essential Rules

### 1. JSDoc Everything ⚠️
- All exported functions must have JSDoc
- Include `@param`, `@returns`, `@throws`, `@example`
- Document complex logic and edge cases
- See `coding-standards.md`

### 2. Testing is Mandatory ⚠️
- Write tests for every feature
- Run `pnpm test:run` before committing
- Maintain ≥80% coverage
- See `testing-guidelines.md`

### 3. One Feature Per Commit
- Each feature is a single atomic commit
- Complete all tasks including tests and JSDoc
- Update documentation
- Mark feature status as done

### 4. BYOM Philosophy
- Users bring their own API keys
- No hardcoded credentials
- Support mock mode without keys
- Document API key setup clearly

### 5. Keep It Simple
- Minimal code to solve the problem
- Avoid over-engineering
- Prefer readability over cleverness
- Delete code that isn't needed

---

## 🏗️ Architecture Overview

```
User Interface (Next.js + React)
        ↓
Frontend (video-caption-generator.tsx)
        ↓ FormData
API Route (/api/generate-captions)
        ↓
┌───────┴────────┐
│                │
FFmpeg (Audio)   Mock Transcript
        ↓                ↓
AI SDK (Whisper) ────────┤
        ↓                │
Caption Generator ←──────┘
        ↓
TXT + VTT Formats
        ↓
User Downloads
```

---

## 📊 Timeline & Milestones

### Phase 1: MVP (Current) - 6-9 hours
- [x] Mock system working
- [ ] Setup testing framework
- [ ] Feature 01: FFmpeg integration
- [ ] Feature 02: Whisper integration  
- [ ] Feature 03: File upload
- [ ] All tests passing

### Phase 2: Containerization - 2-3 hours
- [ ] Dockerfile
- [ ] Docker Compose
- [ ] Deployment documentation
- [ ] Community testing

### Phase 3: Cloud Hosted (Future) - 40-60 hours
- [ ] User authentication
- [ ] Video storage (S3/R2)
- [ ] Subscription billing
- [ ] Team collaboration

---

## 🧪 Testing Strategy

### Test Types Required

1. **Unit Tests** - All utility functions
   - `audio-extractor.ts` → `audio-extractor.test.ts`
   - `transcription.ts` → `transcription.test.ts`

2. **Component Tests** - React components
   - `video-caption-generator.tsx` → `video-caption-generator.test.tsx`

3. **Integration Tests** - API routes
   - `/api/generate-captions/route.ts` → `route.test.ts`

### Coverage Goals
- New modules: ≥80%
- Critical paths: 100%
- Overall project: ≥70%

### Running Tests
```bash
pnpm test           # Watch mode
pnpm test:run       # Run once
pnpm test:coverage  # With coverage report
pnpm test:ui        # Visual UI
```

---

## 📦 Dependencies

### Installed ✅
- `next` - Framework
- `react` - UI library
- `ai` - AI SDK v5
- `@ai-sdk/openai` - OpenAI provider
- `zod` - Validation
- `lucide-react` - Icons
- `tailwindcss` - Styling

### Needed for MVP
- `fluent-ffmpeg` - FFmpeg wrapper
- `@types/fluent-ffmpeg` - TS types
- `vitest` - Testing framework
- `@vitejs/plugin-react` - Vitest React
- `@testing-library/react` - Component testing
- `@testing-library/jest-dom` - DOM matchers

### System Requirements
- Node.js 20+
- FFmpeg binary installed
- OpenAI API key (for real transcription)

---

## 🎓 Learning Resources

### AI SDK v5 Documentation
- [Transcription Docs](https://ai-sdk.dev/docs/ai-sdk-core/transcription)
- [OpenAI Provider](https://ai-sdk.dev/providers/ai-sdk-providers/openai)

### Testing Resources
- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)

### FFmpeg Resources
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
- [FFmpeg Docs](https://ffmpeg.org/documentation.html)

---

## 🐛 Common Issues

### Tests Not Found
```bash
# Ensure vitest.config.ts exists
# Check test files are named *.test.ts or *.test.tsx
```

### FFmpeg Errors
```bash
# Verify FFmpeg installed
ffmpeg -version

# Install if missing
brew install ffmpeg  # macOS
```

### API Key Issues
```bash
# Check .env.local exists
# Restart dev server after changing env vars
# Verify key format: sk-proj-...
```

---

## 🤝 Contributing

### For MVP Development

1. Check `next-steps-mvp.md` for current work
2. Pick a feature from `specs/features-index.md`
3. Follow the feature spec task list
4. **Write tests** (mandatory)
5. Run `pnpm test:run` - must pass
6. Submit PR with tests

### Code Standards

- TypeScript strict mode
- 80% test coverage minimum
- ESLint passing
- Meaningful commit messages
- One feature per commit

---

## 📞 Questions?

### Where to Start?
Read `mvp-roadmap.md` then `next-steps-mvp.md`

### How to Implement Features?
Follow the spec in `specs/feature-0X-*.md`

### Testing Questions?
See `testing-guidelines.md` - comprehensive guide

### Future Plans?
Check `future-containerization-cloud.md`

---

## 📈 Success Metrics

### MVP Complete When:
- ✅ All 3 MVP features implemented
- ✅ All tests passing (≥80% coverage)
- ✅ Real transcription working with BYOM
- ✅ Mock mode working without API key
- ✅ Clean error handling
- ✅ Documentation complete

### Community Validation:
- 50+ GitHub stars
- 10+ external users testing
- Zero critical bugs after 1 week
- Clear, working documentation

---

**Last Updated**: 2025-10-11  
**Status**: MVP Development - Testing Requirements Added  
**Next Milestone**: Complete 3 MVP features with passing tests
