import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const mainSet = () => {
  return {
    input: './src/js/p5Main.js',
    output: {
      file: './src/js/modules/p5Main.bundle.js',
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs()],
  };
};

const soundSet = () => {
  return {
    input: './src/js/p5Sound.js',
    output: {
      file: './src/js/modules/p5Sound.bundle.js',
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs()],
  };
};

export default [mainSet(), soundSet()];
