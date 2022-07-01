import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

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
  plugins: [typescript()],
}
