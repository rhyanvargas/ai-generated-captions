# Documentation Standards & Practices

**Purpose**: Guidelines for maintaining high-quality documentation across code, project files, and changelog.

---

## Documentation Hierarchy

1. **Code Documentation** (JSDoc) - Inline with source code
2. **README.md** - Primary project documentation
3. **Steering Docs** - Strategy, architecture, standards (this directory)
4. **Changelog** - Historical record of improvements
5. **Feature Specs** - Detailed implementation guides (`.kiro/specs/`)

---

## Code Documentation (JSDoc)

### Mandatory Requirements

All exported functions, components, and types **must** have JSDoc comments.

**Why JSDoc?**
- IntelliSense support in IDEs
- Self-documenting code
- Better onboarding for new developers
- Type hints and examples visible inline

### JSDoc Templates

**Function Documentation**:
```typescript
/**
 * Brief description of what the function does.
 * Can span multiple sentences for clarity.
 * 
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 * @example
 * ```typescript
 * const result = functionName('value')
 * console.log(result) // Expected output
 * ```
 */
export function functionName(paramName: string): ReturnType {
  // Implementation
}
```

**Component Documentation**:
```typescript
/**
 * Component description explaining purpose and behavior.
 * 
 * @component
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
export function ComponentName({ prop }: Props) {
  // Implementation
}
```

**Type Documentation**:
```typescript
/**
 * Description of what this type represents.
 */
export interface TypeName {
  /** Description of this property */
  propertyName: string
}
```

### JSDoc Best Practices

1. **Provide Context, Not Just Types**
   - ❌ `@param id - The ID`
   - ✅ `@param id - Unique user identifier (UUID format)`

2. **Include Examples for Complex Functions**
   - Show real-world usage
   - Demonstrate expected inputs/outputs

3. **Document Error Cases**
   - Use `@throws` for all possible errors

4. **VSCode Integration**
   - Type `/**` above function → Press Enter → Auto-generates template

**See Also**: `structure.md` for complete JSDoc guidelines

---

## README Maintenance

### Update Requirements

When making any key updates to the project, **always update the README.md file** to reflect:

- ✅ New features or functionality
- ✅ Changed dependencies or requirements
- ✅ Updated setup instructions
- ✅ Modified API endpoints or usage patterns
- ✅ New environment variables or configuration
- ✅ Installation prerequisites

### README Best Practices

Follow GitHub's README best practices: https://docs.github.com/api/article/body?pathname=/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

#### Essential Sections
- **Clear project title and description**
- **Core message and value proposition** (BYOM)
- **Installation and setup instructions** (step-by-step)
- **Usage examples with code snippets** (working examples)
- **Environment variables** (with descriptions)
- **Testing instructions** (how to run tests)
- **Contributing guidelines**
- **License information**
- **Troubleshooting section**

#### Quality Guidelines
- ✅ Use clear, concise language
- ✅ Include working code examples
- ✅ Keep setup instructions up-to-date
- ✅ Add screenshots or demos when helpful
- ✅ Structure content with proper headings
- ✅ Include troubleshooting for common issues
- ✅ Maintain consistent formatting and style
- ✅ Verify all commands and examples work

### Documentation Sync
- Update README **immediately** after feature changes
- Verify all code examples work with current codebase
- Keep dependency versions and commands current
- Review and update roadmap sections regularly
- Update badges (tests, version, license)

---

## Changelog Practices

### Purpose

The `changelog.md` is a **living document** tracking:
- Major improvements and optimizations
- Bug fixes and their root causes
- Learnings and best practices discovered
- Before/after code examples
- Context for future reference

### When to Add Changelog Entries

Add an entry when you:
- ✅ Implement a significant feature
- ✅ Fix a complex bug
- ✅ Make an architectural decision
- ✅ Optimize performance
- ✅ Refactor major code sections
- ✅ Learn something valuable

**Don't add entries for**:
- ❌ Typo fixes
- ❌ Minor styling tweaks
- ❌ Routine dependency updates

### Changelog Entry Format

```markdown
## 🔧 [Feature/Fix Name]
**Date**: YYYY-MM-DD  
**Category**: [Category]

### Problem
[What wasn't working or what was inefficient]

### Solution
[What you implemented and how it works]
- Bullet points for key changes
- Include relevant technical details

### Key Takeaways
- **Lesson 1**: What you learned
- **Lesson 2**: Best practice discovered
- **Lesson 3**: What to do differently next time

### Code Example
\```typescript
// Before: [problematic code]


// After: [improved code]
\```

### References (optional)
- [Official documentation link]
- [Related issue/PR]
```

### Categories

- **Architecture**: System design, patterns, structure
- **Performance**: Speed, optimization, efficiency
- **Testing Infrastructure**: Test setup, frameworks, patterns
- **Documentation**: Docs improvements
- **Product Strategy**: Positioning, messaging
- **Developer Experience**: Tooling, setup, debugging
- **API Integration**: Third-party integrations
- **Bug Fixes**: Complex bugs and solutions

### Date Format

**IMPORTANT**: Always use the **current date** in `YYYY-MM-DD` format.
- ✅ `2025-10-11`
- ❌ `October 2024` (too vague)
- ❌ Backdating entries

---

## Steering Documentation

### Structure

The `.kiro/steering/` directory contains:

1. **Core Documents** (4 files):
   - `tech.md` - Technology stack
   - `structure.md` - Code organization & standards
   - `product.md` - Product strategy & vision
   - `documentation.md` - This file

2. **Active Documents**:
   - `README.md` - Documentation index
   - `changelog.md` - Living improvements log
   - `next-steps-mvp.md` - Implementation guide
   - `testing-guidelines.md` - Complete testing guide
   - `coding-standards.md` - JSDoc & quality standards

3. **Feature Specs**: In `.kiro/specs/` (separate directory)

### When to Update Steering Docs

Update steering docs when:
- Adding new technologies or frameworks
- Changing architectural patterns
- Updating coding standards
- Modifying product strategy
- Adding new documentation practices

---

## Testing Documentation

### Test File Documentation

Document test files with purpose and context:

```typescript
/**
 * Tests for audio extraction functionality.
 * Requires FFmpeg to be installed on the system.
 * 
 * @group unit
 * @requires ffmpeg
 */

describe('audio-extractor', () => {
  /**
   * Verifies audio is extracted in correct format (16kHz mono WAV).
   * This ensures compatibility with Whisper's audio requirements.
   */
  it('should extract audio from video file', async () => {
    // Test implementation
  })
})
```

**See Also**: `testing-guidelines.md` for complete testing standards

---

## Best Practices Summary

### For Code
✅ JSDoc for all exported functions/components  
✅ Clear examples in documentation  
✅ Error cases documented with `@throws`

### For README
✅ Update immediately after changes  
✅ Working code examples only  
✅ Step-by-step setup instructions

### For Changelog
✅ Use current date (YYYY-MM-DD)  
✅ Include before/after code  
✅ Document learnings, not just changes

### For Steering Docs
✅ Keep core docs consolidated  
✅ Update when patterns change  
✅ Reference other docs with "See Also"