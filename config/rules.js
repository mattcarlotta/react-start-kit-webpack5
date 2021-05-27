const MiniCssExtractPlugin = require("mini-css-extract-plugin").loader;
const { fontsFolder } = require("./paths");
const { inDevelopment, localIdentName } = require("./envs");

// =============================================================== //
// WEBPACK RULES                                                   //
// =============================================================== //

const jsRegex = /\.(js|jsx)$/;

/* defines a javascript rule */
const jsRule = ({ enforce, loader, options }) => ({
  enforce: enforce || "post",
  test: jsRegex,
  loader,
  exclude: /(node_modules)/,
  options: options || {},
});

/* defines a media (font/image) rule */
const mediaRule = ({ test, outputPath }) => ({
  test,
  use: [
    {
      loader: "file-loader",
      options: {
        outputPath,
      },
    },
  ],
});

/* defines a SCSS rule */
const cssRule = ({ auto, include, exclude, sourceMap, test }) => ({
  test,
  include,
  exclude,
  use: [
    inDevelopment ? "style-loader" : MiniCssExtractPlugin,
    {
      loader: "css-loader",
      options: {
        sourceMap: sourceMap || !inDevelopment,
        modules: {
          auto,
          localIdentName,
        },
      },
    },
    "sass-loader",
  ],
});

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const scssRegex = /\.scss$/;
const scssModuleRegex = /\.module\.scss$/;

/* webpack module rules */
const rules = [
  /* lints JS files on compilation */
  jsRule({
    enforce: "pre",
    loader: "eslint-loader",
    options: {
      emitWarning: inDevelopment,
    },
  }),
  /* nanoid to es5 */
  {
    test: jsRegex,
    include: /[\\/]node_modules[\\/](nanoid)[\\/]/,
    loader: "babel-loader",
  },
  /* handle React JS files */
  jsRule({
    loader: "babel-loader",
    options: {
      cacheDirectory: inDevelopment,
      cacheCompression: false,
    },
  }),
  /* handle font assets */
  mediaRule({
    test: /\.(woff2|ttf|woff|eot|svg|png|jpg|jpeg)$/,
    outputPath: fontsFolder,
  }),
  /* handle css */
  cssRule({
    test: cssRegex,
    exclude: cssModuleRegex,
  }),
  /* handle css modules */
  cssRule({
    test: cssRegex,
    include: [cssModuleRegex],
    auto: true,
  }),
  /* handle scss */
  cssRule({
    test: scssRegex,
    exclude: scssModuleRegex,
  }),
  /* handle scss modules */
  cssRule({
    test: scssRegex,
    include: scssModuleRegex,
    auto: true,
  }),
];

module.exports = rules;
