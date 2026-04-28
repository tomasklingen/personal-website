---
title: NPM package-lock.json formatting follows package.json
date: 2025-07-17
tags: [npm, package-json, formatting, node]
---

TIL:

> When npm creates or updates `package-lock.json`, it will infer line endings and indentation from `package.json` so that the formatting of both files matches.

From: [NPM Docs](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json#:~:text=When%20npm%20creates%20or%20updates%20package%2Dlock.json%2C%20it%20will%20infer%20line%20endings%20and%20indentation%20from%20package.json%20so%20that%20the%20formatting%20of%20both%20files%20matches.)
