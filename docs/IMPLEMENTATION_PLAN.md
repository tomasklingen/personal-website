# TIL Project Implementation Plan

## Structured Approach to Minimize Mistakes

### Phase 1: Foundation Analysis (Current State) ✅ COMPLETED
**Goal:** Understand existing setup before making changes
- [x] Analyze current React Router v7 configuration
- [x] Check existing SSG/prerender setup
- [x] Examine current file structure and routing patterns
- [x] Verify build commands and tooling

**Key Findings:**
- React Router v7 with file-based routing in `app/routes/`
- SSG mode enabled (`ssr: false`, prerender working)
- Current routes: `/`, `/run/`, `/run/[distance]/`
- Prerender URLs configured in `react-router.config.ts`
- Build system working: `bun run typecheck` ✅, `bun run build` ✅
- TSConfig paths with `~/*` alias configured
- Tailwind CSS and Biome formatting in place

**Submodule Status:**
- Git submodule exists: `app/thoughts/` (active, on main branch)
- Contains sample content: `README.md`, `github/gh-cli.md`
- Empty route directories already exist: `app/routes/til._index/`, `app/routes/til.$slug/`
- Content structure appears ready for TIL posts

**Missing:** MDX dependencies and content loading utilities

### Phase 2: Content Infrastructure ✅ COMPLETED
**Goal:** Set up content loading without touching UI
- [x] Configure MDX processing pipeline
- [x] Set up content loading utilities for TIL posts
- [x] Implement content parsing (date, slug extraction)
- [x] Test content loading in isolation

**Achievements:**
- ✅ MDX dependencies installed (`@mdx-js/mdx`, `@mdx-js/react`, `@types/mdx`)
- ✅ Content loading utilities created (`app/lib/thoughts.ts`)
- ✅ MDX rendering component created (`app/components/MDXContent.tsx`)
- ✅ Vitest testing framework added with comprehensive tests
- ✅ All verification passing: `bun run typecheck` ✅, `bun run test` ✅, `bun run build` ✅

**Testing Infrastructure Added:**
- Vitest 3.2.4 with UI support
- Test scripts: `bun run test`, `bun run test:ui`
- Comprehensive test coverage for content loading utilities
- TypeScript strict mode compliance in tests

**Content Verification:**
- Successfully loads 2 thoughts from submodule: `README` and `gh-cli`
- Proper metadata extraction (slug, year, title, dates)
- Correct sorting by creation date (newest first)

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
- After each phase: `bun run build`, `bun run typecheck`, and `bun run test`
- Before moving to next phase: Verify current functionality works
- Use `bun run preview` to test SSG output locally
- Comprehensive test coverage with Vitest for all new utilities