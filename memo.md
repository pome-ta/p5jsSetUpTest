# 📝 2023/03/26

## `instance mode` で構築

[Global and instance mode · processing/p5.js Wiki](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)

[examples | p5.js](https://p5js.org/examples/instance-mode-instantiation.html)

[reference | p5()](https://p5js.org/reference/#/p5/p5)

```javascript
import { p5 } from './modules/p5Main.bundle.js';

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
  };
  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');

```

この形式で取れるようにしたい

## `node_modules` の`p5` をうまく管理したい

手動で、`p5/lib/p5(.min).js` 移動をしてバージョン管理をするのは手間なので

instance mode と併せて、bundle ツールでどうにかする

```text
.
├── index.html                `sketchMain.js` を読み込み描画
└── js
    ├── modules
    │   └── p5Main.bundle.js  `p5` をEMS 形式で置いてく場所
    ├── p5Main.js             `node_modules` の`p5` を読み込みESM 形式で吐き出すような設定
    └── sketchMain.js         `p5` をimport しinstance mode で処理
```

### Rollup.js

今後の展望として、CodeMirror と連携をさせたいので、Rollup.js で双方管理できた方が楽

#### プラグインを使い、解決

基本的に、ESM のバンドラーなのでプラグインを追加し`node_modules` 内のものを引っ張ってきて、bundle ファイルを生成しそこから呼び出すように

```javascript
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

```

## VSCode での、autocomplete

[@types/p5 - npm](https://www.npmjs.com/package/@types/p5)

これとか、素直に突っ込めば読めるようになるのかしらん？

# 📝 2023/03/25

## p5.js 良い感じに取り扱いたい

`node_modules` ではなく、ESM としてroot ディレクトリに生成とか

### いい感じにするために

- Roullup
  - バンドルとして、一つに纏めちゃうから違うかな
  - Codemirror がこれだから統一してみたかった
- TypeScript
  - `.js` 食わせて、module　解決のためだけにコンパイル？
- webpack
  - 標準的だから、一度は触ってみるか？

### `node_modules` への参照

あれ？`npm` で落とすと、もうバンドルされている。。。？

[Node.jsでパッケージが参照しているnode_modulesのパスを取得する - tom-256.log](https://mzqvis6akmakplpmcjx3.hatenablog.com/entry/2022/05/21/185607)

[TypeScriptのESMでハマる - くらげになりたい。](https://www.memory-lovers.blog/entry/2022/05/31/110000)

[Pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

[VS Code & TypeScriptとp5.jsで始めるモダンなクリエイティブコーディング入門 - ICS MEDIA](https://ics.media/entry/210129/)

`p5` で呼びたく、、、SkyPack であれば。って感じだから、ローカルでゴリっと呼び出すことに関してやってみることをしてみる

## 設定手順

node のバージョンは大きく指定がなかったので、

p5.js Editor　だと14 っぽい

[npm ciを使おう あるいはより速く - Qiita](https://qiita.com/mstssk/items/8759c71f328cab802670)
