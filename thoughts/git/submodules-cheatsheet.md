---
title: Git Submodules Cheatsheet
date: 2025-07-13
tags: [git, submodules, cheatsheet, version-control]
---

Git submodules let you include one Git repository inside another as a subdirectory.

## Add a submodule

```sh
git submodule add https://github.com/user/repo.git path/to/submodule
```

## Clone repo with submodules

```sh
git clone --recurse-submodules https://github.com/user/main-repo.git
```

## Initialize submodules in existing clone

```sh
git submodule update --init --recursive
```

## Update submodule to latest commit

```sh
cd submodule-path
git pull origin main
cd ..
git add submodule-path
git commit -m "update submodule"
```

## Check submodule status

```sh
git submodule status
```

- Clean: `abc1234 path/to/submodule (v1.0)`
- Modified: `+abc1234 path/to/submodule (v1.0)`
