import VueNativeScroller from './components/VueNativeScroller/VueNativeScroller.vue'

const Plugin = {
  // Makes sure that plugin can be installed only once
  instal(Vue) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.component('VueNativeScroller', VueNativeScroller)
  },
}

export default Plugin

export { VueNativeScroller }
