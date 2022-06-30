import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './packages/src/index.ts',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'esm',
      file: pkg.module,
    },
  ],
  plugins: [typescript()],
}
