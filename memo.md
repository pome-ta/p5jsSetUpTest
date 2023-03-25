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

## 設定手順

node のバージョンは大きく指定がなかったので、

p5.js Editor　だと14 っぽい
