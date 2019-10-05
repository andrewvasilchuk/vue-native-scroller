import path from 'path'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import plugins from './base/plugins/index.js'

const name = 'VueNativeScroller'

export default [
  {
    input: path.join(__dirname, '../src/index.js'),
    output: [
      {
        file: 'dist/vue-native-scroller.js',
        format: 'umd',
        name,
      },
      {
        file: 'dist/vue-native-scroller.common.js',
        format: 'cjs',
      },
      {
        file: 'dist/vue-native-scroller.esm.js',
        format: 'esm',
      },
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ].concat(plugins),
  },
  {
    input: path.join(__dirname, '../src/index.js'),
    output: {
      file: 'dist/vue-native-scroller.min.js',
      format: 'umd',
      name,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      babel(),
      terser(),
    ].concat(plugins),
  },
]
