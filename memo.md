# 📝 2023/05/24

## `p5.sound` って解決してなかったけ？


音を出す方法を忘れておる😇


## タップ判定

全体にかけちゃってるから、eruda もスクローできてない？



# 📝 2023/03/28

## `p5.sound` が読み込めん

`sound` の方で、`p5.prototype` と`prototype` を喰わせようとしているのがキモい？

issue 上がっているけど、解決していない？

### あった

[ReactとTypeScriptで始めるp5.js - 頑張らないために頑張る](https://ysko909.github.io/posts/use-p5js-with-react/)

やはり、えっちらほっちら、投げ合わないといけないみたいだ。。。

これ、バージョン上がったら変わりそうやな。。。

### `min` は入らないか、、、

エラーになってしまう

```console
./src/js/p5Sound.js → ./src/js/modules/p5Sound.bundle.js...
[!] RollupError: "default" is not exported by "node_modules/p5/lib/addons/p5.sound.min.js", imported by "src/js/p5Sound.js".
https://rollupjs.org/troubleshooting/#error-name-is-not-exported-by-module
src/js/p5Sound.js (2:9)
1: export * from 'p5/lib/addons/p5.sound.min.js';
2: export { default } from 'p5/lib/addons/p5.sound.min.js';
            ^
    at error (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:274:30)
    at Module.error (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:13820:16)
    at Module.getVariableForExportName (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:13974:29)
    at Module.includeAllExports (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:14047:37)
    at Graph.includeStatements (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:25173:36)
    at Graph.build (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:25089:14)
    at async /Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:26007:13
    at async catchUnfinishedHookActions (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:25256:20)
    at async rollupInternal (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/shared/rollup.js:26002:5)
    at async build (/Users/pometa/Documents/GitHub/p5jsSetUpTest/node_modules/rollup/dist/bin/rollup:1541:20)

```

## タップとか

`mouseClicked` が効かない？

それとは別に

[iPhone/iPadで動くWebBluetoothアプリをp5.jsで作る方向けのメモ - Qiita](https://qiita.com/tetunori_lego/items/363d0a47a5bbc4ffabd1#web%E3%82%A2%E3%83%97%E3%83%AA%E3%81%A8%E3%81%97%E3%81%A6%E4%BD%BF%E3%81%86%E3%81%9F%E3%82%81%E3%81%AE%E6%BA%96%E5%82%99)

メタタグとか入れるか

```html
  <head>
    <!-- ... -->
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes">

    <script>
      window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    </script>
    <!-- ... -->
  </head>
```

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

## iOS のCodeSandbox app ではbundle できない

まぁしゃあなし、として諦める。基本的に、随時bundle させる必要性もないので

## 全画面のスクロールバー

```css
.p5Canvas {
  display: block;
}

```

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
