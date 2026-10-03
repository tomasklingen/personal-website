/**
 * Short descriptions for tags, keyed by the lowercase tag name.
 * A tag without an entry shows no description.
 */
const tagDescriptions: Record<string, string> = {
	agents: 'AI agents: how they load context, skills and memory.',
	ai: 'Working with AI tools and LLMs.',
	blogging: 'Writing, publishing and the tooling around this site.',
	cheatsheet: 'Short reference notes to look up commands fast.',
	claude: 'Claude and Claude Code: skills, memory and configuration.',
	cli: 'Command line tools and terminal workflows.',
	frontmatter: 'YAML metadata at the top of markdown files.',
	git: 'Version control with git: commands, config and workflows.',
	github: 'GitHub features, the gh CLI and repository workflows.',
	javascript: 'The language itself: syntax, APIs and runtime behaviour.',
	markdown: 'Markdown syntax and the ways tools extend it.',
	node: 'Node.js runtime features and scripting.',
	npm: 'Packages, scripts and dependency management.',
	'package-json': 'Fields, scripts and conventions in package.json.',
	submodules: 'Nested git repositories and how to keep them in sync.',
	typescript: 'Types, strictness and compiler behaviour.',
	web: 'Browser platform features and frontend work.',
	yaml: 'YAML syntax and the traps it hides.',
}

/** Get the description for a tag, or undefined when the tag has none. */
export function getTagDescription(tag: string): string | undefined {
	return tagDescriptions[tag.toLowerCase()]
}
