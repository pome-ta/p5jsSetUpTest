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
