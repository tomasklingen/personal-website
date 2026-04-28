---
title: Create remote repos with GitHub CLI
date: 2025-04-22
tags: [github, cli, git, tools]
---

From the local repo, create a public repo on GitHub.

```sh
gh repo create --public --source=. --push
```

Uses `gh`: https://cli.github.com/

Which can be installed with Homebrew:

```sh
brew install gh
```
