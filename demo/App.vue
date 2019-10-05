<template>
  <div id="app">
    <h1>vue-native-scroller</h1>
    <section>
      <h2>Default usage</h2>
      <vue-native-scroller data-t-scroller ref="scroller">
        <div v-for="i in 64" :key="i" class="item">{{ i - 1 }}</div>
      </vue-native-scroller>
    </section>
    <section>
      <h2>Scoped stots</h2>
      <vue-native-scroller>
        <template v-slot:prepend="{ scrollLeft }">
          <button type="button" @click="scrollLeft">Scroll left</button>
        </template>
        <div v-for="i in 64" :key="i" class="item">{{ i - 1 }}</div>
        <template v-slot:append="{ scrollRight }">
          <button type="button" @click="scrollRight">Scroll right</button>
        </template>
      </vue-native-scroller>
    </section>
    <form>
      <fieldset>
        <legend>Options</legend>
        <label for="align-select">Align:</label>
        <select id="align-select" v-model="align">
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        <label for="behavior-select">Behavior:</label>
        <select id="behavior-select" v-model="behavior">
          <option value="auto">Auto</option>
          <option value="instant">Instant</option>
          <option value="smooth">Smooth</option>
        </select>
      </fieldset>
      <hr />
      <button type="button" @click="scrollLeft">Scroll left</button>
      <button type="button" @click="scrollRight">Scroll right</button>
      <button type="button" @click="scrollTo(24)">Scroll to 24</button>
    </form>
  </div>
</template>

<script>
import VueNativeScroller from '../src/components/VueNativeScroller/VueNativeScroller.vue'

export default {
  name: 'App',
  components: {
    VueNativeScroller,
  },
  data() {
    return {
      align: 'center',
      behavior: 'smooth',
    }
  },
  methods: {
    getScroller() {
      return this.$refs.scroller
    },
    scrollTo(index) {
      const { align, behavior } = this
      this.getScroller().scrollToIndex(index, { align, behavior })
    },
    scrollLeft() {
      const { align, behavior } = this
      this.getScroller().scrollLeft({ align, behavior })
    },
    scrollRight() {
      const { align, behavior } = this
      this.getScroller().scrollRight({ align, behavior })
    },
  },
}
</script>

<style lang="scss">
@import '../src/styles/core.scss';
@import '../src/styles/themes/default.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

.v-scroller {
  &__item {
    padding: 16px;

    &:nth-child(even) {
      .item {
        background-color: #73abfe;
      }
    }
  }
}

@for $i from 1 through 64 {
  .v-scroller__item:nth-child(#{$i}) {
    .item {
      width: 100px + $i * 8;
    }
  }
}

.item {
  height: 100px;
  padding: 4px;
  border: 1px solid rgba(0, 0, 0, 0.128);
  border-radius: 4px;
}
</style>
