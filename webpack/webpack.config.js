const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const copyPatterns = [
  // This is important for dynamic import! The default `initSdk` expects
  // this file to be accessible via fetch:
  {
    from: "./node_modules/@namada/sdk/dist/sdk.namada.wasm",
    to: "./sdk.namada.wasm",
  },
];

module.exports = {
  target: "web",
  mode: "development",
  entry: path.join(__dirname, "src", "index.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.join(__dirname, "tsconfig.json"),
        },
      },
      {
        test: /\.m?js/, // fix:issue: https://github.com/webpack/webpack/issues/11467
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.join(__dirname, "src/"), "node_modules"],
    fallback: {
      buffer: require.resolve("buffer"),
    },
  },
  devServer: {
    static: [path.join(__dirname, "public")],
    compress: true,
    port: 9000,
    // Only required for multicore build, to support multicore worker helpers
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-site",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.DefinePlugin({
      process: {
        env: {},
      },
    }),
    new CopyPlugin({
      patterns: copyPatterns,
    }),
  ],
  // If using multicore SDK, enable the following:
  // stats: {
  //   // We want to ignore wasm-bindgen-rayon circular dependency warning
  //   warningsFilter: [/dependency between chunks.+wasm-bindgen-rayon/],
  // },
};
