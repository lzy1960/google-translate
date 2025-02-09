import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

// 主构建配置 (ESM + CJS)
const mainConfig = {
  input: 'packages/src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  external: ['https-proxy-agent', 'node-fetch', 'qs'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
  ],
}

// 类型声明配置
const dtsConfig = {
  input: 'packages/src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
}

export default [mainConfig, dtsConfig]
