---
title: Frontmatter in agent skills and memory
date: 2026-10-03
tags: [frontmatter, ai, agents, claude, yaml]
description: How AI agents use YAML frontmatter to decide which skills, rules, and memories to load into context.
draft: true
---

In [Frontmatter Basics](/thoughts/2025/frontmatter-basics), I described frontmatter as YAML metadata placed at the top of a Markdown file. While it is a staple format for static blogs, AI coding agents rely on it heavily as well.

Even with modern context windows reaching upwards of 1 million tokens, dumping entire instruction files into context upfront is inefficient. Loading markdown content only when needed keeps the active context clean and focused.

To achieve this, the agent parses the frontmatter of many files at startup. The model sees only the short descriptions, not the full contents.

A blog operates on the same principle: the index page loads titles and tags from frontmatter to generate previews, while the post page loads the full body text.

## Skills

A skill is a directory containing a `SKILL.md` file. Anthropic introduced this format as an open standard at [agentskills.io](https://agentskills.io), and it is now supported across Claude Code, Cursor, GitHub Copilot, Gemini CLI, and Codex.

```markdown
---
name: a11y-check
description: Check a page for accessibility problems such as missing alt text and low contrast. Use when the user asks for an accessibility review.
---

# Accessibility check

1. Build the site and open the HTML of the page in `dist/`.
2. Check for missing `alt` text, unlabeled form fields, and low contrast.
3. List each problem with its file location and a suggested fix.

```

Two key fields drive this configuration (for the complete list, see the [frontmatter specification](https://agentskills.io/specification#frontmatter)):

* `name`: Up to 64 characters using lowercase letters, numbers, and hyphens. Must match the directory name.
* `description`: Up to 1024 characters explaining what the skill does and when to execute it.

At startup, the agent loads only the `name` and `description` for each skill, roughly 100 tokens per skill. The body text loads only when the model decides that a task matches the description, and secondary scripts or reference files load when referenced by that body.

Because the description acts as the primary execution trigger, clarity is critical. Compare these two examples:

```yaml
description: Helps with commits.

```

```yaml
description: Create git commits in conventional commit format. Use when the user asks to commit changes or to write a commit message.

```

The first example provides insufficient context for routing. The second specifies both the task and the triggering conditions.

The spec also has an experimental `allowed-tools` field. It lists tools that the skill can use without a permission prompt.

Claude Code builds on top of the base spec with specialized fields:

* `disable-model-invocation: true` prevents auto-triggering, requiring explicit execution via `/name`.
* `when_to_use` adds trigger phrases to the description in the skill listing.
* `paths` restricts automatic invocation to matching file globs.
* `context: fork` executes the skill inside an isolated subagent.

Claude Code silently ignores unrecognized keys. A typo like `disable-model-invokation` won't trigger an error. It will simply fail to apply.

## Subagents

Subagents live as Markdown files in `.claude/agents/`. Frontmatter sets their runtime parameters, while the Markdown body contains their core prompt.

```markdown
---
name: code-reviewer
description: Review code for quality and security. Use proactively after code changes.
tools: Read, Grep, Glob
model: sonnet
---

You are a code reviewer. Give specific feedback. Do not edit files directly.

```

The `description` determines when the main agent delegates a task. Phrases like "use proactively" increase delegation frequency. Meanwhile, `tools` and `model` establish the execution boundary.

Frontmatter here separates control flow from execution: `description` handles routing, while `tools` and `model` enforce constraints.

## Rules

Files in `.claude/rules/` store project-level instructions for Claude Code. Here, frontmatter serves primarily to handle scoping via the `paths` field.

```markdown
---
paths:
  - 'src/pages/**/*.astro'
---

Wrap every page in the `Layout` component.

```

Rules without `paths` load automatically at session launch. Rules with `paths` remain dormant until Claude reads or edits a matching file path. When a rule triggers, Claude Code strips the frontmatter before passing the text to the model.

`CLAUDE.md` relies on plain Markdown and does not require frontmatter.

Always validate your YAML syntax. Invalid YAML causes Claude Code to skip frontmatter parsing entirely, forcing the rule to load globally across all files. Run `claude --debug` to spot syntax errors.

## Memory

Claude Code can persist context across sessions through auto-memory. Each project stores notes within `~/.claude/projects/<project>/memory/`.

```text
memory/
├── MEMORY.md
├── use-pnpm.md
└── ...

```

`MEMORY.md` serves as an index, containing a one-line summary for each entry. Claude Code reads the first 200 lines or 25KB of this file when starting a session, whichever comes first. Claude reads individual topic files only when it needs them.

Individual entries store detailed information alongside frontmatter metadata:

```markdown
---
name: use-pnpm
description: 'Use pnpm for all package commands in this project, not npm or yarn'
metadata:
  type: feedback
  modified: 2026-10-03T13:55:59.721Z
---

Run `pnpm install` and `pnpm run` for all package commands.

**Why:** The project has a `pnpm-lock.yaml`. npm would create a second lockfile and change versions.

**How to apply:** Replace every `npm` or `yarn` command with the `pnpm` equivalent.

```

The `type` key accepts `user`, `feedback`, `project`, or `reference`. Depending on your environment, `type` may appear at the root level or nested under `metadata`.

The `modified` timestamp updates whenever the agent writes to the file, helping track information freshness over time.

This architecture follows a consistent pattern across features: `MEMORY.md` acts as the directory, frontmatter acts as the metadata label, and the Markdown body carries the payload. Writing precise descriptions enables the model to make accurate retrieval decisions from the index alone.

## Summary

| File | Frontmatter Keys | Usage Decision |
| --- | --- | --- |
| **Skill** | `name`, `description` | Determines when to load the full skill instructions |
| **Subagent** | `name`, `description`, `tools`, `model` | Governs delegation triggers and runtime capabilities |
| **Rule** | `paths` | Filters which file operations load the rule |
| **Memory** | `name`, `description`, `type` | Determines whether to fetch the full memory entry |

## Best Practices

* **Write explicit triggers:** Craft descriptions that clearly define both what the file accomplishes and when to call it.
* **Keep metadata concise:** The skill listing is in context on every turn. Claude Code limits it to 1% of the context window and drops descriptions that do not fit.
* **Quote strings with special characters:** YAML parsing breaks on unquoted colons or structural characters (e.g., `description: "Use when: user requests assistance"`).
* **Verify field names:** Misspelled keys fail silently rather than raising validation errors.
* **Validate skill definitions:** Run `skills-ref validate ./my-skill` using the reference CLI to verify compliance with the spec.

## Conclusion

The core takeaway remains simple: frontmatter provides lightweight, structured metadata to organize content efficiently. The key difference in modern workflows is that the primary consumer is often an AI agent managing its own context window.

Even this post uses frontmatter. It allows the site to index `title`, `date`, and `tags` without rendering the full page up front.
