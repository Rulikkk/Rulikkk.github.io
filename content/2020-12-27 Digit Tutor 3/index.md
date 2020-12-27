---
title: "Building “Digit Tutor” — Part 3: Internationalization"
cover: "https://source.unsplash.com/MRlFZs_WZdI/1080x600"
date: "2020-12-27"

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
> 3. [Building “Digit Tutor” — Part 3: Internationalization](/building-digit-tutor-part-3-internationalization)
>    (this page)

# Intro

If you're interested in details on how "Digit Tutor" started and was built in
Svelte, please, refer to the
[first article](/building-digit-tutor-part-1-svelte) in the series.

The [second part](/building-digit-tutor-part-2-speech-recognition) of the
article covers speech recognition implementation details.

This one will cover intenationalization implementation, as I have implemented
Russian and English support, and I also didn't go with standard Svelte i18n
implementation, since initially all resources were in a store, and it seemed to
me, that Svelte store could be sufficient. And it was! I have called it
**"poor-man's Svelte internationalization"**.

# Svelte Stores

At first, we need to understand what [Svelte Stores]() are and how they work:

> A store is simply an object with a `subscribe` method that allows interested
> parties to be notified whenever the store value changes.

Here is a simple, but feature-complete store example:

```js
import { writable } from "svelte/store";

function createCount() {
  // this line creates a "writable" store, with "0" initial value
  // and gives subscribe, set and update methods
  // this really resembles "useState" from react
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0),
  };
}
```

As you can see, store does not necessarily exposes direct "set" or "update"
methods — if you want to limit its updates to some specific cases
(increment/decrement/reset in the sample) — this is all achievable.

There is also one more Svelte-magic with stores: you don't actually need to use
`subscribe` method or anything, to use store value in code or UI, just use the
magic `$` sign. Here is how we could use our sample store in the code:

```js
<script>
	import { count } from './stores.js';
</script>


// this is where the magic happens, and `count` from the store
// is reactively bound to the UI
<h1>The count is {$count}</h1>

<button on:click={count.increment}>+</button>
<button on:click={count.decrement}>-</button>
<button on:click={count.reset}>reset</button>
```

So, stores seem to be fully sufficient to implement internaionalization:

- It is easy to bind store values to the UI
- Stores can expose additional logic; later I figured out, that stores can be
  used to logically group methods and values, just like objects from the
  business layer of the app
- If store's value is an object, it works fine if used as `$store.value`

# Intrenationalization in a Store

My internationalization implemenetations lives in the
[`locale.js`](https://github.com/Rulikkk/digit-tutor/blob/2ae989dc74614b91768dd7d9b42d4abfbdd6dfef/locale.js)
file, and provides following features:

- Loads initial user locale from OS settings
- Provides list of available locales, loaded from the data-file
- Allows to get/set current locale and its code (for the UI)

It is implemented as a writable store, whose value is an object, storing
localized versions of all the strings in the app. That object is loaded from the
[data-file](https://github.com/Rulikkk/digit-tutor/blob/2ae989dc74614b91768dd7d9b42d4abfbdd6dfef/data.js).

The store itself is used just like a usual Svelte store, which is referred as a
`$l` in the code. Whenever selected locale changes, the underlying store object
is replaced with a new one, and all UI elements change their values:

```js
// fragment of the App.js file
<h1>{$l.header}</h1>
{#if gameState == STARTING || gameState == NO_RECOGNITION}
  <LocaleSelector />
{/if}
<p>{$l.info}</p>
```

# The Bug

Unfortunately, there was **exactly one bug in the "release" version of the
game**, and it was connected to internationalization. Besides it, I have covered
all possible corner casees with the locales, so let's just discuss the bug.

The reason for it was, that in the `LocaleSelector` component, I haven't
initialized the `selectedLocaleCode` value the user's OS locale. As a result,
its initial value was undefined, while the UI was showing English locale as
selected — just the first one in the list; at the same time, all the logic,
including speech recognition, was using real user's locale (russian, in my
case).

The fix is pretty simple: I just made sure, that this variable is properly
initalized in the component, too. Here is
[the fix](https://github.com/Rulikkk/digit-tutor/commit/2ae989dc74614b91768dd7d9b42d4abfbdd6dfef),
which I have done **20 minutes since the bug was reported**.

# Conclusion

It turned out, that Svelte stores is a sufficiently powerful concept to
implement the internationalization. I cannot imagine anything similar from
React-world, except third-party libs.

And it also turned out, that you need to be twice as thorough and attentive,
when making an internationalized app, since it can be a source of additional
bugs.

Anyway, I hope people liked this game, since that time I have even received
multiple improvement and evolution ideas, which may some day go to production,
we'll see!
