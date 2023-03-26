import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default {
  input: './src/js/p5Main.js',
  output: {
    file: './src/js/modules/p5Main.bundle.js',
    format: 'esm',
  },
  plugins: [nodeResolve(), commonjs()],
};
