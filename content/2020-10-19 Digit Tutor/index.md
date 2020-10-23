---
title: "Building “Digit Tutor” — Part 1: Svelte"
cover: "https://source.unsplash.com/MRlFZs_WZdI/1080x600"
date: "2020-10-19"

# note, categories should be properly capitalized
category: "Development"
# draft: true
tags:
  - coding
  - svelte
  - development
  - frontend
  - kids
  - speech-recognition
  - i18n
  - digit-tutor
---

"Digit Tutor" — a simple online game for kids in Svelte, which uses speech
recognition engine to train pronounciation of digits: from "0" to "9".

### ✳️ [Open Digit Tutor](https://digit-tutor.rmust.me)

> This post is part of a series about building "Digit Tutor", that include:
>
> 1. Building “Digit Tutor” — Part 1: Svelte
> 2. Building “Digit Tutor” — Part 2: Speech Recognition
> 3. Building “Digit Tutor” — Part 3: Internationalization

# Idea

It all started when my son began to show interest to actually understand what
those strange "0", "1", etc. mean. Some time ago, I've heard, that kids like
talking to Alexa (and other voice assistants), and that it also helps with
improving their speech:

1. Voice assistants, usually, pronounce everything very well, so kids have a
   sample of nice speech
2. Voice assistants simply don't understand, if you have mispronounced
   something, so kids have motivation to speak well

So the idea was simple: have an app to show some digit, like "7", on a screen
and wait for correctly pronounced "seven", than show some other random digit.

# Technology

Both items from the list above joined very well, as I have remembered, that
there is
[SpeechAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) in
today's browsers ([partially supported](https://caniuse.com/?search=speech)).

So, building a game, available to almost everyone, was just a matter of me going
through that API.

To add some more challenge, I have selected a much-loved and still-fresh
frontend library Svelte. All the initial development was done in Codesandbox, so
that I even did not have to install anything locally.

# About Svelte

Before we jump to hardcore details about building speech recognizing games, let
me give an overview of what Svelte is, and how it is different from Angular,
React and Vue.

Svelte is the most popular one from the "disappearing frameworks" group.
Technically, **this isn't even a library, as it does not have any footprint in
your app — instead, it is a compiler**, which goes through your code and creates
an app and all the functions, that are needed for your app, but nothing more.
So, if you app is just a static site — there will not be any javascript
"compiled" by Svelte. On the contrary, React/Angular/Vue core libs are always
required in your app.

As Svelte has "compilation" step as part of building and app, at which it
already knows about all the possible changes to your DOM structure, **it does
not have (and does not need to have) virtual DOM**. If you just need to change
the value of an input — Svelte will see that and create just the code to change
input's value; nothing more and no VDOM involved. Svelte developers blog calls
VDOM a ["pure overhead"](https://svelte.dev/blog/virtual-dom-is-pure-overhead).

Besides, working with Svelte, I have experienced some cool features, some of
which are even missing from React, while some might be considered a
disadvantage:

1. In a singe Svelte file, you can define HTML, CSS and JS of your component.
   This can be achieved in React, using some external libraries, but not
   out-of-the-box. In Svelte, this all looks natural and easy to understand:

   ```html
   <script>
     let count = 0;

     function handleClick() {
       count += 1;
     }
   </script>

   <style>
     /* Svelte makes sure, this css is scoped to just your component */
     button {
       background: #ff3e00;
       color: white;
       border: none;
       padding: 8px 12px;
       border-radius: 2px;
     }
   </style>

   <button on:click="{handleClick}">
     Clicked {count} {count === 1 ? 'time' : 'times'}
   </button>
   ```

2. There is **no need for hooks or setState** — just like in Vue, Svelte makes
   use of js class getters/setters. Downside of this, is that you have to use
   immutable structures, or give Svelte hints: `arr.push(x)` will not be noticed
   as a change, `arr = [...arr, x]` is a canonical way to push to arrays in
   Svelte.

3. You **cannot use js in your templates** (like you can in JSX): any specific
   logic should be expressed via Svelte-specific constructions, like
   `{#if X == Y}<conditinally rendered HTML>{/if}`. This is not inconvenient,
   but pure js is something everyone already knows, so could be a point to
   improve.

4. **State.** What an important word to know for React/Vue/Angular developers!
   Surprisingly, Svelte has something to offer in state management
   out-of-the-box, which is called "Stores". On the high-level, anything you can
   subscribe to and write/read from can be a store in Svelte (sometimes just
   2-function-object is enough). I have not yet seen issues in working with
   shared state between different components, yet, as I have seen in React.

# Conclusion

After a short warm-up with Svelte, I found it very convenient and quite easy to
get up and running with it. [Codesandbox.io](https://csb.app) supports it quite
well, so there is no need to set up everything locally. However, if you prefer
using local VSCode, I would suggest going on with
[VSCode Remote Development plugin](https://github.com/Microsoft/vscode-remote-release),
so that you don's intall node and all modules locally. This plugin even lets
setting up some VSCode extensions, like Prettier, remotely.

As for the Svelte features, everything seemed convenient and well-thought. I had
couple issues with Svelte not seeing array updates (see item#2 above) and being
unable to style a Svelte component from root-component (the fix is to wrap
component to a `div` or make sure it captures additional style from props).
Otherwise, [tutorial at svelte.dev](https://svelte.dev/tutorial) was quite
comprehensive and covered everything required.

Would I recommend using Svelte in production? Yes, if you're working with a
web-site (not web-app), which is not very dynamic and delivers, mostly, static
content. Although there are good react-based static site generators, Svelte will
always win in initial bundle size, while being equal in performance. It is also
quite mature now, as current major version is 3, meaning three major releases
are done now.
