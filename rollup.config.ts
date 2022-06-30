import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default {
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
  plugins: [commonjs(), typescript()],
}
