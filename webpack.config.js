const path = require("path");
const slsw = require("serverless-webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  node: {
    __dirname: true,
  },
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  output: {
    libraryTarget: "commonjs2",
    library: "index",
    path: path.resolve(__dirname, ".webpack"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        include: __dirname,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};







