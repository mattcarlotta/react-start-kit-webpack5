const { DefinePlugin } = require("webpack"); // HotModuleReplacementPlugin
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
// const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WebpackBar = require("webpackbar");
// const ManifestPlugin = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {
  analyzePath,
  cssFolder,
  faviconPath,
  // publicPath,
  templatePath,
} = require("./paths");
const { ANALYZE, APIPORT, inDevelopment, NODE_ENV, PORT } = require("./envs");

// =============================================================== //
// WEBPACK PLUGINS                                                 //
// =============================================================== //

/* common webpack plugins */
const plugins = [
  /* shows a compilation bar instead of the default compile message */
  // new WebpackBar({
  //   color: "#268bd2",
  //   minimal: false,
  //   compiledIn: false,
  // }),
  /* simplifies creation of HTML files to serve your webpack bundles */
  new HtmlWebpackPlugin({
    template: templatePath,
    favicon: faviconPath,
  }),
  /* webpack ENV files */
  new DefinePlugin({
    "process.env": {
      APIPORT: JSON.stringify(APIPORT),
      NODE_ENV: JSON.stringify(NODE_ENV),
      PORT: JSON.stringify(PORT),
    },
  }),
  /* generates a manifest for all assets */
  // new ManifestPlugin({
  //   fileName: "asset-manifest.json",
  //   publicPath,
  //   generate: (seed, files) => {
  //     const manifestFiles = files.reduce(function (manifest, file) {
  //       manifest[file.name] = file.path;
  //       return manifest;
  //     }, seed);

  //     return {
  //       files: manifestFiles,
  //     };
  //   },
  // }),
];

/* development webpack plugins */
if (inDevelopment) {
  plugins
    .push
    /*
        new ReactRefreshPlugin({
      overlay: {
        entry: webpackDevClientEntry,
        // The expected exports are slightly different from what the overlay exports,
        // so an interop is included here to enable feedback on module-level errors.
        module: reactRefreshOverlayEntry,
        // Since we ship a custom dev client and overlay integration,
        // the bundled socket handling logic can be eliminated.
        sockIntegration: false,
      },
    }),
    */
    /* in browser error overlay */
    // new ErrorOverlayPlugin(),
    /* hot-module plugin to update files without refreshing the page */
    // new HotModuleReplacementPlugin(),
    ();
} else {
  /* production webpack plugins */
  plugins.push(
    /* generates an inline runtime chunk script within the index.html */
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
    /* extracts CSS to dist folder */
    new MiniCssExtractPlugin({
      filename: `${cssFolder}/[name].[contenthash:8].css`,
      chunkFilename: `${cssFolder}/[id].[contenthash:8].css`,
    }),
    /* copies some files from public to dist on build */
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/robots.txt" },
        { from: "public/manifest.json" },
        { from: "public/logo_512.png" },
        { from: "public/logo_192.png" },
      ],
    }),
    /* runs bundle analyzer if in staging */
    ANALYZE &&
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: analyzePath,
      }),
  );
}

module.exports = plugins.filter(Boolean);
