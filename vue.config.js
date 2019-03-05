const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const UI_DIR = path.join(__dirname, "./src/ui");
const UI_DIST = path.join(__dirname, "./src/ui/dist");

module.exports = {
  publicPath: "/",
  outputDir: UI_DIST,
  configureWebpack: {
    resolve: {
      alias: {
        "@ui": UI_DIR
      }
    },
    entry: {
      app: path.join(UI_DIR, "main.js")
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(UI_DIR, "public"),
          to: UI_DIST,
          toType: "dir",
          ignore: ["index.html", ".DS_Store"]
        }
      ])
    ]
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].template = path.join(UI_DIR, "public", "index.html");
      return args;
    });
  }
};
