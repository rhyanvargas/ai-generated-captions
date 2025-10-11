---
trigger: always_on
---

# Windsurf Global Rules

## Project-Specific Documentation (Check First)

Projects may organize coding agent guidelines and feature specifications in dedicated directories. **ALWAYS** check for these directories first before starting work.

### Directory Pattern to Look For

```
<project-root>/
├── */steering/       # Coding agent guidelines (e.g., .kiro/steering, docs/steering, .ai/steering)
│   ├── tech.md       # Technology stack and tools
│   ├── structure.md  # Code organization and standards
│   ├── product.md    # Product strategy and vision
│   ├── documentation.md  # Documentation practices
│   ├── README.md     # Documentation index
│   ├── next-steps-mvp.md  # Current implementation plan
│   ├── testing-guidelines.md  # Testing standards
│   ├── coding-standards.md   # Extended coding standards
│   └── changelog.md  # Improvements and learnings log
└── */specs/          # Feature specifications (e.g., .kiro/specs, docs/specs, .ai/specs)
    ├── features-index.md  # All features overview
    └── feature-*.md  # Individual feature specs
```

**Common directory names**: `.kiro/`, `docs/`, `.ai/`, `.cascade/`, `.project/`

### Rule: Discover and Check Guidelines First

When starting work on a project:

1. **Discover Guidelines Directory**:

   - Search for any `*/steering/` directory in project root
   - Common patterns: `.kiro/steering`, `docs/steering`, `.ai/steering`
   - If found: Read the 4 core docs first (tech, structure, product, documentation)
   - If not found: Continue with general best practices

2. **Discover Feature Specs**:

   - Search for any `*/specs/` directory in project root
   - Common patterns: `.kiro/specs`, `docs/specs`, `.ai/specs`
   - Check for feature specifications before implementing
   - Follow the feature spec structure (typically 5 tasks max)
   - Ensure all success criteria are met

3. **Always Follow Project Standards**:
   - JSDoc requirements from structure.md
   - Testing requirements from tech.md
   - Code organization from structure.md
   - Documentation practices from documentation.md

### Core Documentation Pattern

All projects with a `*/steering/` directory should have these 4 core documents:

1. **tech.md** - Technology Stack

   - Frameworks, libraries, tools
   - Testing framework and commands
   - Build system
   - Dependencies

2. **structure.md** - Code Organization & Standards

   - Directory structure
   - File naming conventions
   - JSDoc requirements (mandatory)
   - TypeScript standards
   - Testing patterns

3. **product.md** - Product Strategy

   - Core message and positioning
   - Product philosophy
   - Target users
   - Roadmap and success metrics

4. **documentation.md** - Documentation Practices
   - Code documentation standards
   - README maintenance
   - Changelog practices
   - Testing documentation

### Enforcement

- **Never assume standards** - always verify against `*/steering/` docs if they exist
- **If core docs are missing**: Suggest creating them following this pattern
- **If rules conflict**: Project-specific rules in `*/steering/` take precedence over global rules
- **Always update**: Keep steering docs current when standards change

### Benefits

- **Consistency**: Same structure across all projects
- **Onboarding**: New contributors know where to look
- **Quality**: Standards are documented and enforced
- **Maintainability**: Single source of truth per project

---

## Core Principles

1. **Clarity**: Code should be self-documenting
2. **Consistency**: Follow established patterns (project-specific if available)
3. **Maintainability**: Write code that's easy to update
4. **Performance**: Optimize for runtime efficiency
5. **Security**: Follow security best practices

---

## Cross-Platform Standards

### Code Style

- **Language**: English for all code and documentation
- **Line Length**: Maximum 100 characters
- **Naming**: Clear, descriptive names
- **Formatting**: Consistent within each language
- **Comments**: JSDoc for all exported functions (when applicable)

### Version Control

- **Versioning**: Semantic versioning
- **Commits**: Conventional commits format
- **Branches**: Feature branches
- **Reviews**: Pull requests with reviews

---

## Web Development (Next.js/React)

### Project Structure

- **Router**: App Router by default
- **Organization**: Feature-based organization
- **Components**: Server Components first, Client Components only when needed
- **Testing**: Vitest + React Testing Library

### State Management

- **Local**: `useState`/`useReducer`
- **Global**: React Context
- **Server**: TanStack Query
- **URL**: URL params for UI state

### Styling

- **Framework**: Tailwind CSS (mobile-first)
- **Modules**: CSS Modules for component-specific styles
- **Tokens**: Design tokens for consistency
- **Components**: shadcn/ui when available

### Performance Budget

- **Bundle**: Max 150KB (gzipped)
- **TTI**: < 3s
- **FCP**: < 1.5s
- **CLS**: < 0.1

---

## Unity Development

### Scripting Standards

**Performance**:

- Cache refs in `Awake()`/`Start()`
- Use `ObjectPool` for frequent instantiations
- Minimize `Find()`/`GetComponent()` in Update
- `[SerializeField]` over public fields

**Memory**:

- Unsubscribe in `OnDestroy()`
- Use `ScriptableObjects` for shared data
- Clean up coroutines
- `Resources.UnloadUnusedAssets()` when needed

### XR Development

- Latest XR Interaction Toolkit
- Proper camera rig setup
- Controller input actions
- Teleportation/locomotion systems

### UI/UX

- Screen Space - Camera for VR UI
- World-space UI for in-game elements
- EventSystem for interactions
- Proper UI batching

### Physics & Animation

- Layer-based collision
- Optimized physics settings
- Animation controllers
- Event-based animation

### Performance Budget

- **Target FPS**: 90 (VR)
- **Memory**: Monitor and optimize
- **Build Size**: Keep minimal
- **Loading**: < 5s

---

## Quality Assurance

### Testing

- **Unit Tests**: Core systems and business logic
- **Integration Tests**: Key user flows
- **Performance**: Profile and optimize
- **Platform**: Test on target platforms
- **Coverage**: ≥80% for new code (when testing is set up)

### Documentation

- **README**: Setup instructions and overview
- **API Docs**: Public API documentation
- **Architecture**: Document key decisions
- **Changelog**: Track improvements and fixes

---

## Security

- **Input Validation**: Validate all user inputs
- **Communication**: Use HTTPS/secure protocols
- **Access Control**: Principle of least privilege
- **Audits**: Regular security reviews
- **Secrets**: Never commit API keys or credentials

---

## Best Practices

### General (All Languages)

- **SOLID Principles**: Single responsibility, open/closed, etc.
- **Functions**: Small, focused methods
- **Dependencies**: Dependency injection when appropriate
- **Errors**: Proper error boundaries and handling
- **Self-Documenting**: Code that explains itself

### Web-Specific

- **Components**: Small, reusable components
- **Hooks**: Custom hooks for reusable logic
- **Server/Client**: Clear separation of concerns
- **API Routes**: RESTful design

### Unity-Specific

- **Design**: Component-based design
- **Events**: Event-driven architecture
- **Tools**: Editor tools for designers
- **Automation**: Build automation

---

## Priority Order

When conflicts arise, follow this priority:

1. **Project-specific rules** (`*/steering/` docs) - Highest priority
2. **Language/framework conventions** - Follow official guidelines
3. **These global rules** - General fallback
4. **Team preferences** - Discuss and document
