# TIL Project Implementation Plan

## Structured Approach to Minimize Mistakes

### Phase 1: Foundation Analysis (Current State)
**Goal:** Understand existing setup before making changes
- [ ] Analyze current React Router v7 configuration
- [ ] Check existing SSG/prerender setup
- [ ] Examine current file structure and routing patterns
- [ ] Verify build commands and tooling

### Phase 2: Content Infrastructure
**Goal:** Set up content loading without touching UI
- [ ] Configure MDX processing pipeline
- [ ] Set up content loading utilities for TIL posts
- [ ] Implement content parsing (date, slug extraction)
- [ ] Test content loading in isolation

### Phase 3: Route Structure
**Goal:** Implement routing before components
- [ ] Add `/thoughts` route definition
- [ ] Add `/thoughts/[year]/[slug]` dynamic route
- [ ] Configure SSG prerendering for new routes
- [ ] Test route resolution without full components

### Phase 4: Component Implementation
**Goal:** Build components incrementally
- [ ] Create basic TIL list component (no styling)
- [ ] Create TIL detail page component (basic MDX rendering)
- [ ] Add to `/thoughts` page
- [ ] Test individual components in isolation

### Phase 5: Homepage Integration
**Goal:** Update homepage last to avoid breaking existing functionality
- [ ] Create "recent posts" component
- [ ] Integrate into existing homepage
- [ ] Ensure existing homepage content remains intact

### Phase 6: Validation & Polish
**Goal:** Ensure everything works end-to-end
- [ ] Run full SSG build and test
- [ ] Validate all routes resolve correctly
- [ ] Run typecheck and linting
- [ ] Test with sample TIL content

## Key Principles
1. **Verify at each step** - Test builds and functionality after each phase
2. **No premature optimization** - Focus on basic functionality first
3. **Incremental changes** - Each step should be independently testable
4. **Preserve existing functionality** - Don't break what already works
5. **Follow existing patterns** - Use the established codebase conventions

## Testing Strategy
- After each phase: `npm run build` and `npm run typecheck`
- Before moving to next phase: Verify current functionality works
- Use `npm run preview` to test SSG output locally