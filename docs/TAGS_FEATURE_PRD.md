# Tags Feature PRD

## Goal
Add simple tag support to thoughts feature for content organization and discovery.

## User Stories
- As a content creator, I want to add tags to my thoughts via frontmatter
- As a reader, I want to click on tags to see related thoughts
- As a reader, I want to see all tags on a thought page

## Technical Specs

### Frontmatter Format
```yaml
---
tags: [javascript, react, frontend]
---
# My Thought Title
Content here...
```

### URL Structure
- Individual thought: `/thoughts/2024/my-thought/` (unchanged)
- Tag filtering: `/thoughts/tags/javascript/` (new)

### Implementation Plan

#### Phase 1: Core Infrastructure
1. **Add frontmatter parsing** - Install `gray-matter`, update `extractMetadata()`
2. **Update types** - Add `tags?: string[]` to `ThoughtPost`
3. **Update tests** - Verify frontmatter parsing works

#### Phase 2: UI Components  
4. **Tag display component** - Show tags as styled links on thought pages
5. **Tag filtering page** - List all thoughts with specific tag
6. **Update routing** - Add `/thoughts/tags/[tag]/` route

#### Phase 3: Integration
7. **Update existing thoughts** - Add frontmatter to current content (optional)
8. **Test end-to-end** - Verify complete user flow works

## Technical Decisions
- **Library**: `gray-matter` for frontmatter parsing (industry standard)
- **Tags format**: Array of strings in frontmatter
- **URL encoding**: Lowercase, URL-safe tag names
- **Fallback**: Thoughts without tags still work normally

## Out of Scope
- Tag autocomplete/suggestions
- Tag hierarchy or categories  
- Tag statistics/counts
- Search functionality

## Acceptance Criteria
- [ ] Can add tags to MDX files via frontmatter
- [ ] Tags display as clickable links on thought pages
- [ ] Clicking tag shows list of all thoughts with that tag
- [ ] Existing thoughts without tags continue to work
- [ ] All existing tests pass