---
title: 'Yak Shaving: The Programming Curse We All Know Too Well'
date: 2025-07-22
tags: ['programming', 'productivity', 'developer-culture']
description: "From Ren & Stimpy to MIT labs - how a cartoon holiday became every developer's nightmare"
---

![A brown Yak](https://cdn.pixabay.com/photo/2022/01/22/09/42/animal-6956681_1280.jpg)

**TL;DR**: Yak shaving is when you start fixing one small bug and end up knee-deep in webpack configuration three hours later. It's the endless chain of "necessary" tasks that pull you away from your actual goal.

## Origins: From Cartoon to Code

The term comes from a bizarre 1991 Ren & Stimpy episode featuring "Yak Shaving Day". A surreal holiday involving diapers, coleslaw, and floating canoes. MIT PhD student **Carlin Vieri** watched this absurdist segment and started using "yak shaving" to describe bureaucratic task chains.

The programming definition crystallized in 2000 when **Jeremy Brown** wrote to MIT's AI Lab: _"Yak shaving is what you are doing when you're doing some stupid, fiddly little task that bears no obvious relationship to what you're supposed to be working on, but yet a chain of twelve causal relations links what you're doing to the original meta-task."_

## Anatomy of a One-Line Change

**Classic scenario**:

**The Goal**: Change the color of a button. A one-line CSS change. You tell your manager it'll be "five minutes."

**The Descent**:
Your code editor, however, has other plans. The linter throws a fit, not about your code, but because a dependency-of-a-dependency has released a patch version and your lockfile is now considered emotionally unstable.

You run `npm install`. It fails. The error message is a 400-line ASCII art stack trace that points to a C++ binary in a library responsible for optimizing PNGs—a file type you aren't even using.

A Stack Overflow answer from 2017, with one upvote and a comment that just says "thx," suggests you need to update your Node.js version. You use nvm to switch to the latest release. This, in turn, breaks your shell's PATH, and now every command returns

```shell
zsh: command not found: ls
```

Three hours later, you're deep inside a GitHub issue thread from 2019, learning how to recompile your terminal emulator from source. You have forgotten the button, the color, and your own name. You are no longer a developer. You are an archaeologist of forgotten build tools. The button remains unchanged.

Unlike procrastination, each step feels logical and necessary, making yak shaving particularly insidious.

## Breaking Free

**Warning signs**: You're 5+ steps from your original task, can't explain the connection to teammates, and hours (or days even) have passed on unrelated work.

**Solutions**:

- Time-box tasks (use 25-minute Pomodoros)
- Write down your primary objective first
- When running into an issue. Write it down on some todo list and continue with core logic
- Ask: "Does this directly contribute to my main goal?" or "Can we do this later?"

## Personal Note: ADHD and the Yak Shaving Trap

As someone with ADHD, I'm particularly vulnerable to yak shaving, both in code and life. What starts as "quickly organizing my desk" becomes reorganizing my entire room, researching optimal storage solutions, and somehow ending up on Wikipedia reading about minimalism for two hours. In programming, my hyperfocus turns a simple Typescript fix into a complete refactor of a library.

I'm writing this down because I need to follow my own advice. ADHD brains love the dopamine hit of "solving" each small problem, making the yak shaving cycle incredibly addictive. The time-boxing and clear objective writing aren't just good practices, they're survival strategies.

## The Bottom Line

Every developer has been there, but some of us get stuck deeper than others. The goal isn't eliminating all yak shaving but ensuring it serves your objectives rather than derailing them. Next time you're five levels deep in dependency hell, at least you'll know what to call it.
