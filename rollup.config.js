// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from "rollup-plugin-commonjs";

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
};

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: "react-ssr-fork",
    globals
  },
  external: Object.keys(globals),
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs({
      include: /node_modules/
    })
  ]
};