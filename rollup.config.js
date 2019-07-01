import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import sass from 'rollup-plugin-sass';
import serve from 'rollup-plugin-serve';

export default {
  input: './index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    sass({
      options: {
        includePaths: ['node_modules'],
      },
      processor: (css) => ({css: css}),
    }),
    serve('dist'),
  ],
};
