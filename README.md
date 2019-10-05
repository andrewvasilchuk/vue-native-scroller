# 📜 vue-native-scroller

> Vue.js wrapper component over browser scroll API.

> 🌈 The main purpose of the library is just to give you a simple wrapper over browser native scroll API.

The library internally uses [`scroll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll) method.

## ✨ Features

- lightweight (~ `2.5kb` gzip);
- zero dependency;
- simple API;

# Demo

[![Edit vue-native-scroller](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-native-scroller-eid7l?fontsize=14)

## 💿 Installation

### 📦 Via NPM

```bash
npm install vue-native-scroller --save
```

### 🧶 Via Yarn

```bash
yarn add vue-native-scroller
```

## Initialization

### As a plugin

It must be called before `new Vue()`.

```js
import Vue from 'vue'
import VueNativeScroller from 'vue-native-scroller'

Vue.use(VueNativeScroller)
```

### As a global component

```js
import Vue from 'vue'
import { VueNativeScroller } from 'vue-native-scroller'

Vue.component('VueNativeScroller', VueNativeScroller)
```

### As a local component

```js
import { VueNativeScroller } from 'vue-native-scroller'

export default {
  name: 'YourAwesomeComponent',
  components: {
    VueNativeScroller,
  },
}
```

## 🚀 Usage

### Template

Just wrap your items into the `<vue-native-scroller>` component:

```html
<template>
  <vue-native-scroller>
    <div>foo</div>
    <div>bar</div>
    <div>baz</div>
  </vue-native-scroller>
</template>
```

### 🎨 Styles

Then don't forget to include core styles:

`SASS`:

```scss
@import 'vue-native-scroller/src/styles/core.scss';
```

Or already compiled `CSS`:

`CSS`:

```scss
@import 'vue-native-scroller/dist/styles/core.css';
```

Library is shipped with default theme, so if you want to import it, then do the following:

```scss
@import 'vue-native-scroller/src/styles/themes/default.scss';
```

## API

### ⚙️ Props

`<vue-native-scroller>` accepts some `props` through which you can customize different aspects of scroll logic.

| Prop        | Default    | Description                                                                                                  |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `behavior`  | `'smooth'` | Specifies scroll behavior. Possible values are: `['smooth', 'instant', 'auto']`                              |
| `align`     | `'center'` | Specifies alignment of the item relatively to the parent. Possible values are: `['left', 'center', 'right']` |
| `scrollbar` | `false`    | Specifies whether or not the scrollbar is visible                                                            |
| `tag`       | `'div'`    | Specifies the tag of the container                                                                           |

#### Example of `props` passing

```html
<vue-native-scroller
  behavior="instant"
  align="left"
  tag="section"
  scrollbar
></vue-native-scroller>
```

### 🎛 Methods

`<vue-native-scroller>` provides you with several methods you can use to scroll left, right or to certain item.

> ℹ️ `options` object in the bellow methods, is the object through which you can specify custom behavior and alignment of the scroll action. It can contain 2 properties with keys `align` and `behavior`. `align` value should be one of the following values `['left', 'center', 'right']`, and `behavior`: `['smooth', 'instant', 'auto']`. If one of the keys is not specified, value passed by props is used (if value is not passed, default value is used).

| Method                                           | Description                              |
| ------------------------------------------------ | ---------------------------------------- |
| `scrollToIndex(index: number, options?: object)` | Scrolls to the item with specified index |
| `scrollLeft(options?: object)`                   | Scrolls left                             |
| `scrollRight(options?: object)`                  | Scrolls right                            |

#### Example of `methods` usage

```html
<template>
  <vue-native-scroller ref="scroller"></vue-native-scroller>
</template>
```

```js
// ...
export default {
  // ...
  name: 'YourAwesomeComponent',
  methods: {
    method() {
      const { scroller } = this.$refs

      scroller.scrollToIndex(1)
      scroller.scrollLeft({ align: 'center' })
      scroller.scrollRight({ align: 'right', behavior: 'instant' })
    },
  },
  // ...
}
// ...
```

### 🕳️ Slots

`<vue-native-scroller>` provides you with some `scopedSlots` you can use to fit your needs.

| Slot      | Scope             | Description                                 |
| --------- | ----------------- | ------------------------------------------- |
| `prepend` | `{ scrollLeft }`  | Slot that is prepended to the list of items |
| `append`  | `{ scrollRight }` | Slot that is appended to the list of items  |

#### Example of possible usage of `scopedSlots`

```html
<template>
  <vue-native-scroller>
    <template v-slot:prepend="{ scrollLeft }">
      <button type="button" @click="scrollLeft">Scroll left</button>
    </template>
    <div>foo</div>
    <div>bar</div>
    <div>baz</div>
    <template v-slot:append="{ scrollRight }">
      <button type="button" @click="scrollRight">Scroll right</button>
    </template>
  </vue-native-scroller>
</template>
```

## 💉 Tests

### Unit

[`Jest`](https://jestjs.io) and [`VueTestUtils`](https://vue-test-utils.vuejs.org) is used for unit tests.

You can run unit tests by running next command:

```bash
npm run test:unit
```

## Powered by

- `Rollup` (and plugins);
- `SASS` and `node-sass`;
- `PostCSS`;
- `Autoprefixer`;
- `VueTestUtils`;
- `Jest`.

## 🔒 License

[MIT](http://opensource.org/licenses/MIT)
