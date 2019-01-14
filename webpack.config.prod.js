const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "public"),
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    overlay: {
      error: true
    }
  },
  plugins: [
    new CleanWebpackPlugin(
      ["public/**/*.js", "public/**/*.map", "public/**/*.html"],
      {
        root: path.resolve(__dirname, "."),
        verbose: true
      }
    ),
    new UglifyJSPlugin({ sourceMap: true }),
    new HappyPack({
      loaders: ["babel-loader"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "template.html")
    })
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  }
};
