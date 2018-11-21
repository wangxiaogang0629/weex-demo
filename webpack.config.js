const pathTo = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const entry = {};
const weexEntry = {};
const vueWebTemp = 'temp';
const hasPluginInstalled = fs.existsSync('./web/plugin.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isWin = /^win/.test(process.platform);
let fileType = '';

// Wraping the entry file
const getEntryFileContent = (entryPath, vueFilePath) => {
    let relativePath = pathTo.relative(pathTo.join(entryPath, '../'), vueFilePath);
    let contents = '';
    /**
     * The plugin's logic currently only supports the .we version
     * which will be supported later in .vue
     */
    if (hasPluginInstalled) {
      const plugindir = pathTo.resolve('./web/plugin.js');
      contents = 'require(\'' + plugindir + '\') \n';
    }
    if (isWin) {
      relativePath = relativePath.replace(/\\/g, '\\\\');
    }
    contents += 'var App = require(\'' + relativePath + '\')\n';
    contents += 'App.el = \'#root\'\n';
    contents += 'new Vue(App)\n';
    return contents;
  }
  // Retrieve entry file mappings by function recursion
const walk = (dir) => {
    dir = dir || '.';
    const directory = pathTo.join(__dirname, 'src/views', dir);
    fs.readdirSync(directory).forEach((file) => {
      const fullpath = pathTo.join(directory, file);
      const stat = fs.statSync(fullpath);
      const extname = pathTo.extname(fullpath);
      if (stat.isFile() && extname === '.vue' || extname === '.we') {
        if (!fileType) {
          fileType = extname;
        }
        if (fileType && extname !== fileType) {
          console.log('Error: This is not a good practice when you use ".we" and ".vue" togither!');
        }
        const name = pathTo.join(dir, pathTo.basename(file, extname));
        if (extname === '.vue') {
          const entryFile = pathTo.join(vueWebTemp, dir, pathTo.basename(file, extname) + '.js');
          fs.outputFileSync(pathTo.join(entryFile), getEntryFileContent(entryFile, fullpath));
          entry[name] = pathTo.join(__dirname, entryFile) + '?entry=true';
        }
        weexEntry[name] = fullpath + '?entry=true';
      } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
        const subdir = pathTo.join(dir, file);
        walk(subdir);
      }
    });
  }
  // Generate an entry file before writing a webpack configuration
walk();
/**
 * Plugins for webpack configuration.
 */
const plugins = [
  /*
   * Plugin: UglifyJsPlugin
   * Description: UglifyJS plugin for webpack
   * See: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
   */
  // new webpack.optimize.UglifyJsPlugin({
  //   minimize: true
  // }),
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": ' + (fileType === '.vue' ? '"Vue"' : '"Weex"') + '} \n',
    raw: true,
    exclude: 'Vue'
  })
];
// Config for compile jsbundle for web.
const webConfig = {
  // context: pathTo.join(__dirname, ''),
  // entry: entry,
  // output: {
  //   path: pathTo.join(__dirname, 'dist'),
  //   filename: '[name].web.js'
  // },
  entry: {
    render: "./src/render.js",
    app: "./src/main.js",
},
  output: {
    path: pathTo.join(__dirname, 'dist/web'),
    filename: 'js/[name].js',
  },
  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'source-map',
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    // webpack 2.0
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 1,
            name: 'images/[hash:8].[name].[ext]'
          }
        }],
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules(?!(\/|\\).*(weex).*)/
      }, {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'vue-loader',
          // 打包方式生成rem
          options: {
            loaders: {
              scss: 'style-loader!css-loader!sass-loader',
              sass: 'style-loader!css-loader!sass-loader?indentedSyntax',
            },
            optimizeSSR: false,
            postcss: [
              // to convert weex exclusive styles.
              require('postcss-plugin-weex')(),
              require('autoprefixer')({
                browsers: ['> 0.1%', 'ios >= 8', 'not ie < 12']
              }),
              require('postcss-plugin-px2rem')({
                // base on 750px standard.
                rootValue: 75,
                // to leave 1px alone.
                minPixelValue: 1.01
              })
            ],
            compilerModules: [
              {
                postTransformNode: el => {
                  // to convert vnode for weex components.
                  require('weex-vue-precompiler')()(el)
                }
              }
            ]
          }
        },
      ]
    },

    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }
    ]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [...plugins,
    new HtmlWebpackPlugin({
      template: 'web/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'render', minChunks: Infinity}),
  ]
};
// Config for compile jsbundle for native.
const weexConfig = {
  entry: weexEntry,
  output: {
    path: pathTo.join(__dirname, 'dist/weex'),
    filename: '[name].js'
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 1,
            name: 'images/[hash:8].[name].[ext]'
          }
        }],
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules(?!(\/|\\).*(weex).*)/
      }, {
        test: /\.vue(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader'
        }]
      }, {
        test: /\.we(\?[^?]+)?$/,
        use: [{
          loader: 'weex-loader'
        }]
      }
    ]
  },
  /*
   * These options configure whether to polyfill or mock certain Node.js globals and modules.
   * This allows code originally written for the Node.js environment to run in other environments like the browser.
   *
   * See: https://webpack.js.org/configuration/node/#node
   */
  node: {
    setImmediate: false
    // See "Other node core libraries" for additional options.
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  // 区分是web还是app,根据这个进行跳转设置
  plugins: [...plugins,
    new webpack.DefinePlugin({
      'process.env': {
        COMPILE_ENV: '"weex"'
      }
    }),
  ]
};
// If The fileType is '.we', only need to use weexConfig for building.
if (fileType === '.we') {
  module.exports = weexConfig;
} else {
  module.exports = [webConfig, weexConfig];
}
