import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import gzipPlugin from 'rollup-plugin-gzip'
import { terser } from 'rollup-plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'

module.exports = {
  input: './packages/src/index.ts',
  output: [
    {
      format: 'cjs',
      file: pkg.common,
    },
    {
      format: 'esm',
      file: pkg.main,
    },
  ],
  plugins: [visualizer(), terser(), typescript(),gzipPlugin()],
}
