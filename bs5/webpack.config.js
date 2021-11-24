//path モジュールの読み込み
const path = require('path');
//MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
 
  //エントリポイント（デフォルトと同じなので省略可）
  entry: './src/index.js',  
  //出力先（デフォルトと同じなので省略可）
  output: { 
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath を追加
    publicPath: '',
  },
  module: {
    rules: [
      {
        // Sass 用のローダー
        //ローダーの処理対象ファイル（拡張子 .scss や .sass のファイル）
        test: /\.s[ac]ss$/i,  //scss だけを対象にする場合は test: /\.scss$/i,
        // ★ .css も対象にする場合は test: /\.(scss|sass|css)$/i, 
        // Sassファイルの読み込みとコンパイル
        use: [
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするためのローダー
          {
            loader: "css-loader",
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // css-loader の前に適用されるローダーの数を指定
              importLoaders: 2,
            },
          },
          // PostCSS
          {
            loader: "postcss-loader",
            options: {
              // PostCSS でもソースマップを有効に
              sourceMap: true,
              postcssOptions: {
                // ベンダープレフィックスを自動付与
                plugins: ["autoprefixer"],
              },
            },
          },
          // Sass をコンパイルするローダー
          {
            loader: "sass-loader",
            options: {
              // dart-sass を優先
              implementation: require('sass'),
              sassOptions: {
                // fibers を使わない場合は以下で false を指定
                // fiber: require('fibers'),
                fiber: false, // node16系にまだ非対応
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        //file-loader の対象となるファイルの拡張子
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf)$/i,
        generator: {
          filename: 'imagse/[name][ext][query]'
        },
        type: 'asset/resource',
      },
    ],
  },
  //プラグインの設定
  plugins: [
    //MiniCssExtractPlugin プラグインのインスタンスを生成
    new MiniCssExtractPlugin({
      //出力される CSS のファイル名を指定
      filename: "style.css",
    }),
  ],
  //source-map タイプのソースマップを出力
  devtool: "source-map",
};