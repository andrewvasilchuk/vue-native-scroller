<script>
import { ALIGN_OPTIONS, BEHAVIOR_OPTIONS, DIRECTIONS } from '../../config'

import {
  align as alignValidator,
  behavior as behaviorValidator,
} from '../../utils/validators'

import ChevronLeft from '../../assets/chevron-left.svg'
import ChevronRight from '../../assets/chevron-right.svg'

export default {
  name: 'VueNativeScroller',
  props: {
    behavior: {
      type: String,
      default: 'smooth',
      validator: behaviorValidator,
    },
    align: {
      type: String,
      default: 'right',
      validator: alignValidator,
    },
    scrollbar: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  methods: {
    /**
     * Scrolls right
     *
     * @public
     */
    scrollRight({ align, behavior } = {}) {
      align = align || 'right'
      this._scrollByDirection('right', { align, behavior })
    },
    /**
     * Scrolls left
     *
     * @public
     */
    scrollLeft({ align, behavior } = {}) {
      align = align || 'left'
      this._scrollByDirection('left', { align, behavior })
    },
    /**
     * Scrolls to the item with provided index.
     * @public
     *
     * @param {number} index - an index of item to scroll to.
     * @param {Object} [options={}] options - an options throught which scroll can be customized.
     * @param {string} options.behavior - scroll behavior.behavior.
     * @param {string} option.align - how to align scrolled item.
     *
     * @throws Will throw an error if the options argument is invalid.
     */
    scrollToIndex(index, options = {}) {
      if (this._validateOptions(options)) {
        const { list } = this.$refs

        if (list && list.children) {
          const child = list.children[index]

          if (child) {
            const align = options.align || this.align
            const behavior = options.behavior || this.behavior

            const left = this._getLeftValue(child, list, align)

            if (left || left === 0) {
              list.scroll({ left, behavior })
            }
          }
        }
      }
    },
    _getLeftValue(child, parent, align) {
      switch (align) {
        case 'left':
          return child.offsetLeft
        case 'center':
          return (
            child.offsetLeft - parent.offsetWidth / 2 + child.offsetWidth / 2
          )
        case 'right':
          return child.offsetLeft - parent.offsetWidth + child.offsetWidth
      }
    },
    _getListChildrenAsArray() {
      return Array.prototype.slice.call(this.$refs.list.children)
    },
    _getMatchByDirection(direction, child, parent) {
      switch (direction) {
        case 'left':
          return child.offsetLeft >= parent.scrollLeft - child.offsetWidth
        case 'right':
          return (
            child.offsetLeft + child.offsetWidth >
            parent.scrollLeft + parent.offsetWidth
          )
      }
    },
    _scrollByDirection(direction, options = {}) {
      if (this._validateOptions(options)) {
        const align = options.align || this.align
        const behavior = options.behavior || this.behavior
        const { list } = this.$refs

        const children = this._getListChildrenAsArray()

        for (let i = 0; i < children.length; i++) {
          const child = children[i]

          if (this._getMatchByDirection(direction, child, list)) {
            const left = this._getLeftValue(child, list, align)

            if (list.scroll) {
              list.scroll({
                left,
                behavior,
              })
            }

            break
          }
        }
      }
    },
    _validateOptions(options) {
      const { align, behavior } = options

      if (behavior) {
        if (!behaviorValidator(behavior)) {
          throw new Error(
            `Passed behavior value is invalid. Expect [${BEHAVIOR_OPTIONS}], but got ${behavior} instead`
          )
        }
      }

      if (align) {
        if (!alignValidator(align)) {
          throw new Error(
            `Passed align value is invalid. Expect [${ALIGN_OPTIONS}], but got ${align} instead`
          )
        }
      }

      return true
    },
  },
  render(h) {
    const { scrollbar } = this
    const { tag, itemTag } = this

    // get default and scoped slots
    const { default: defaultSlot } = this.$slots
    const { prepend, append } = this.$scopedSlots

    // wrap children into <li class="v-scroller__item"></li> elements
    let wrappedChildren = Array.isArray(defaultSlot)
      ? defaultSlot.map(child => {
          // detect if element is not a TEXT_NODE
          if (typeof child === 'object' && child.tag) {
            return h('li', { staticClass: 'v-scroller__item' }, [child])
          }
        })
      : null

    return h(
      tag,
      {
        staticClass: 'v-scroller',
        class: [{ 'v-scroller--scrollbar-hidden': !scrollbar }],
      },
      [
        prepend
          ? prepend({ scrollLeft: this.scrollLeft })
          : h(
              'button',
              {
                staticClass: 'v-scroller__btn v-scroller__btn--prev',
                attrs: { type: 'button', 'aria-label': 'Scroll left' },
                on: { click: this.scrollLeft },
              },
              [h(ChevronLeft)]
            ),
        h(
          'ul',
          {
            staticClass: 'v-scroller__list',
            ref: 'list',
          },
          wrappedChildren
        ),
        append
          ? append({ scrollRight: this.scrollRight })
          : h(
              'button',
              {
                staticClass: 'v-scroller__btn v-scroller__btn--next',
                attrs: { type: 'button' },
                on: { click: this.scrollRight },
              },
              [h(ChevronRight)]
            ),
      ]
    )
  },
}
</script>

