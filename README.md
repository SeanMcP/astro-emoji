# astro-emoji

[![npm](https://img.shields.io/npm/v/astro-emoji.svg)](https://npmjs.com/package/astro-emoji) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/astro-emoji.svg)](https://npmjs.com/package/astro-emoji) [![npm](https://img.shields.io/npm/dt/astro-emoji.svg)](https://npmjs.com/package/astro-emoji)

🚀 An accessible Emoji component for Astro applications

## Why?

Emojis can add a light playfulness to your project but require some specific formatting in order to ensure they are accessible for all users. `astro-emoji`'s reusable `Emoji` component helps you do that quickly and painlessly.

This component was ported to Astro from [`svelte-emoji`](https://npm.im/svelte-emoji).

## Installation

Add `astro-emoji` to your project:

```sh
npm install astro-emoji
# or
yarn add astro-emoji
```

## Use

Import the default `Emoji` from `astro-emoji` and add it to your code:

```jsx
---
import Emoji from 'astro-emoji':
---

<footer>
    Made with
    {' '}
    <Emoji symbol="💕" label="love" />
    {' '}
    by Sean McPherson
</footer>
```

The resulting markup for that component signature will be:

```html
<span aria-label="love" role="img">💕</span>
```

`Emoji`s with no `label` prop are rendered with `aria-hidden="true"`:

```html
<Emoji symbol="🤐" />
<span aria-hidden="true" role="img">🤐</span>
```

## Emoji component

The `Emoji` component consumes two props: `symbol` and `label`. Every other prop is spread to the top-level `<span>` element.

## License

[MIT](/LICENSE)
