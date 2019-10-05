import { shallowMount } from '@vue/test-utils'

import VueNativeScroller from '../VueNativeScroller.vue'

import { BEHAVIOR_OPTIONS, ALIGN_OPTIONS } from '../../../config'

const defaultSlot = '<div></div><div style="width: 100px;"></div>'

beforeEach(() => {
  console.error = jest.fn()
})

describe('VueNativeScroller', () => {
  it('should call console.error if invalid behavior prop is passed', () => {
    const error = jest.spyOn(global.console, 'error')

    shallowMount(VueNativeScroller, { propsData: { behavior: 'foo' } })
    expect(error).toHaveBeenCalled()
  })

  it('should not call console.error if valid behavior prop is passed', () => {
    const error = jest.spyOn(global.console, 'error')

    BEHAVIOR_OPTIONS.forEach(option => {
      shallowMount(VueNativeScroller, { propsData: { behavior: option } })
      expect(error).not.toHaveBeenCalled()
    })
  })

  it('should call console.error if invalid align prop is passed', () => {
    const error = jest.spyOn(global.console, 'error')

    shallowMount(VueNativeScroller, { propsData: { align: 'foo' } })
    expect(error).toHaveBeenCalled()
  })

  it('should not call console.error if valid align prop is passed', () => {
    const error = jest.spyOn(global.console, 'error')

    ALIGN_OPTIONS.forEach(option => {
      shallowMount(VueNativeScroller, { propsData: { align: option } })
      expect(error).not.toHaveBeenCalled()
    })
  })

  it('should apply appropriate class when scrollbar prop is false', () => {
    const wrapper = shallowMount(VueNativeScroller, {
      propsData: { scrollbar: false },
    })

    expect(wrapper.find('.v-scroller--scrollbar-hidden').exists()).toBe(true)
  })

  it('should apply appropriate tag when tag prop is passed', () => {
    const tag = 'section'

    const wrapper = shallowMount(VueNativeScroller, {
      propsData: { tag },
    })

    expect(wrapper.is(tag)).toBe(true)
  })

  it('should throw an error when invalid options is passed to scrollToIndex method', () => {
    const wrapper = shallowMount(VueNativeScroller, {
      slots: { default: defaultSlot },
    })

    expect(() => wrapper.vm.scrollToIndex(0, { align: 'foo' })).toThrow()
    expect(() => wrapper.vm.scrollToIndex(0, { behavior: 'foo' })).toThrow()
  })

  it('should throw an error when invalid options is passed to scrollLeft or scrollLeft method', () => {
    const wrapper = shallowMount(VueNativeScroller, {
      slots: { default: defaultSlot },
    })

    expect(() => wrapper.vm.scrollLeft({ align: 'foo' })).toThrow()
    expect(() => wrapper.vm.scrollLeft({ behavior: 'foo' })).toThrow()

    expect(() => wrapper.vm.scrollRight({ align: 'foo' })).toThrow()
    expect(() => wrapper.vm.scrollRight({ behavior: 'foo' })).toThrow()
  })

  it('should not throw an error when valid options is passed to scrollRight method', () => {
    const wrapper = shallowMount(VueNativeScroller, {
      slots: { default: defaultSlot },
    })

    ALIGN_OPTIONS.forEach(option => {
      expect(() => wrapper.vm.scrollLeft({ align: option })).not.toThrow()
      expect(() => wrapper.vm.scrollRight({ align: option })).not.toThrow()
    })

    BEHAVIOR_OPTIONS.forEach(option => {
      expect(() => wrapper.vm.scrollLeft({ behavior: option })).not.toThrow()
      expect(() => wrapper.vm.scrollRight({ behavior: option })).not.toThrow()
    })
  })

  it('should call native scroll method when scrollLeft is invoked', () =>{
    const wrapper = shallowMount(VueNativeScroller, {
      slots: { default: defaultSlot },
    })

    HTMLElement.prototype.scroll = () => {}

    const spy = jest.spyOn(HTMLElement.prototype, 'scroll')

    wrapper.vm.scrollLeft()


    expect(spy).toHaveBeenCalled()
  })

  it('should call native scroll method when scrollToIndex method is invoked', () =>{
    const wrapper = shallowMount(VueNativeScroller, {
      slots: { default: defaultSlot }, attachToDocument: true,
    })

    HTMLElement.prototype.scroll = () => {}

    const spy = jest.spyOn(HTMLElement.prototype, 'scroll')

    wrapper.vm.scrollToIndex(0)


    expect(spy).toHaveBeenCalled()
  })
})
