---
title: "Building “Digit Tutor” — Part 2: Speech Recognition"
cover: "https://source.unsplash.com/MRlFZs_WZdI/1080x600"
date: "2020-11-21"

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

### ✳️ <a href="https://digit-tutor.rmust.me" target="_blank">Open Digit Tutor</a>

The project is [open-source](https://github.com/Rulikkk/digit-tutor), so, feel
free to send a PR, if you wish!

> This post is part of a series about building Digit Tutor, that include:
>
> 1. [Building “Digit Tutor” — Part 1: Svelte](/building-digit-tutor-part-1-svelte)
> 2. [Building “Digit Tutor” — Part 2: Speech Recognition](/building-digit-tutor-part-2-speech-recognition)
>    (this page)
> 3. Building “Digit Tutor” — Part 3: Internationalization (TBD)

# Intro

If you're interested in details on how "Digit Tutor" started and was built in
Svelte, please, refer to the
[first article](/building-digit-tutor-part-1-svelte) in the series.

This article covers the details of speech recognition — how it works and which
browsers support it.

# Can I use SpeechAPI?

Speech recognition in the app is based on
[SpeechAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). It
is not really supported in many browsers, as of now:
https://caniuse.com/speech-recognition. Here is a screenshot of that page at the
time of writing this text:

![Speech recognition state in Nov, 2020](speech-recognition.png)

As you see, the support matrix can be quickly described as "chrome-only",
however, Firefox can also support it with some config. Other browsers either
don't support it at all, or have required objects in `window`, which do nothing.

So, it is definitely **not ready** for cross-browser production usage, but fits
for experiments, like our game.

# Technology

As you might guess, speech recognition in browsers contains of three parts:

- **Grammar**: defines a set of words, which you're interested in & which will
  be recognized
- **Synthesis**: allows browser to talk to you
- **Recognition**: allows browser to convert speech to text

Logically, there might also be something like "intent recognition", which would
help you understand, what did the user really mean, but it seems that current
technology state does not allow to do that reliably.

At first, and very logically, I thought I would need to support _Grammar_ and
_Recognition_ in my game. Later, during the testing stages, I've figured out,
that _grammar_ part is not used at all, so I could only focus on _recognition_.

## A Word on Chrome Implementation

It turned out, that Chrome has very peculiar speech recognition implementation:

1. Actual recognition might happen on Google's servers, per
   [this MDN article](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition):

   > Note: On some browsers, like Chrome, using Speech Recognition on a web page
   > involves a server-based recognition engine. Your audio is sent to a web
   > service for recognition processing, so it won't work offline.

2. Chrome effectively ignores Grammar (a set of words), when recognizing — it
   just recognizes every word as it can hear.

Keep a note on these details, in case you care about privacy and Grammar
support.

# Show Me the Code!

## Initializing Speech API

The first thing to do is to get & check if Speech objects are in the `window`. I
am using a very simple approach here, with only one idea of having it all as a
separate module. Actual
[file is here](https://github.com/Rulikkk/digit-tutor/blob/main/recognition.js):

```js
import { locale } from "./locale.js";

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList,
  // SpeechRecognitionEvent =
  // window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent,
  grammar =
    "#JSGF V1.0; grammar colors; public <color> = " +
    locale.getCurrentLocale().numbers.join(" | ") +
    " ;";

let recognition, speechRecognitionList;

if (SpeechRecognition && SpeechGrammarList) {
  recognition = new SpeechRecognition();
  speechRecognitionList = new SpeechGrammarList();

  speechRecognitionList.addFromString(grammar, 1);

  recognition.grammars = speechRecognitionList;
  recognition.continuous = true;
  recognition.lang = locale.getCurrentLocaleCode();
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
}

export default recognition;
```

Here we are initializing everything we need (even grammar):

1. Check vendor-prefixed implementations:
   `window.SpeechRecognition || window.webkitSpeechRecognition`
2. Create instances of the objects, using `new`

Before jumping to configuration details, I'll describe how to use that
`recognition` instance:

1. Call `.start()` — this is the place, when browser asks for mic access
2. Listen to `.onresult` events. Each event may be "final" or "interim"
3. Call `.stop()`, if/when needed. My implementation does not call it ever =)

The configuration details:

- `.grammars`: list of grammars, that you would want to recognize. Not really
  used, but might be in future, so I still have it
- `.continuous`: `true` if you want to receive multiple _final_ results, or
  `false` in case you need just one _final_ result. Since my game is more or
  less continuous, I have it as true
- `.lang`: recognition language. I am getting it from current system settings,
  so everyone gets his/her native language
- `interimResults`: when `true`, you will get "interim" `onresult` events. Those
  happen faster, but may contain partially or incorrectly recognized words. I am
  using this, to improve recognition percieved performance: even if the interim
  result contains correct digit, it is considered pronounced correctly. This
  makes game much more responsive
- `.maxAlternatives`: browser will present more than one option, if this is more
  than one. Using one in my code, as I only need one option
