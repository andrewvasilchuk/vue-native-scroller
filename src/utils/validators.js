import { ALIGN_OPTIONS, BEHAVIOR_OPTIONS } from '../config'

export const align = val => ALIGN_OPTIONS.indexOf(val) !== -1
export const behavior = val => BEHAVIOR_OPTIONS.indexOf(val) !== -1
