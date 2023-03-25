import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
  input: './src/js/p5Main.js',
  output: {
    file: './src/js/modules/p5Main.bundle.js',
    format: 'es',
  },
  plugins: [nodeResolve()],
};
