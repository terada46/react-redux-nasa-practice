const path = require('path'); // nodejs dependency when dealing with paths
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // require webpack plugin
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // require webpack plugin
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin'); // require webpack plugin
const HtmlWebPackPlugin = require("html-webpack-plugin"); // require html plugin

let config = (env, argv) => ({ // config object
  entry: './src/index.js', // entry file
  output: { // output
    path: path.resolve(__dirname, 'public'), // ouput path
    filename: 'output.js' // output filename
  },
  resolve: { // These options change how modules are resolved
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], // Automatically resolve certain extensions
    alias: { // Create aliases
      images: path.resolve(__dirname, 'src/assets/images')  // src/assets/images alias
    }
  },
  module: {
    rules: [ // loader rules
      {
        test: /\.js$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: 'babel-loader' // use this (babel-core) loader
      },
      {
        test: /\.scss$/, // files ending with .scss
        use: [
          'css-hot-loader',
          argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', 
            options: { 
              import: false
            }
          },  
          'postcss-loader',
          'sass-loader'],
      },
      {
        test: /\.jsx$/, // all files ending with .jsx
        loader: 'babel-loader', // use the babel-loader for all .jsx files
        exclude: /node_modules/ // exclude searching for files in the node_modules directory
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            }
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
    ] // end rules
  },
  plugins: [ // webpack plugins
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }), // call the MiniCssExtractPlugin constructor and name our css file
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'), // A directory or URL to serve HTML content from.
    watchContentBase: true,
    historyApiFallback: true, // fallback to /index.html for Single Page Applications.
    inline: true, // inline mode (set to false to disable including client scripts (like livereload)
    open: true, // open default browser while launching
    compress: true, // Enable gzip compression for everything served:
    hot: true // Enable webpack's Hot Module Replacement feature
  },
  devtool: argv.mode === 'development' ? 'cheap-eval-source-map' : '', // enable devtool for better debugging experience
  optimization: {
    minimize: argv.mode === 'production',
    minimizer:  [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
              output: {
                  comments: false
              }
          }
        }),
        new OptimizeCSSAssets({
          cssProcessor: require('cssnano'),
        }) // call the css optimizer (minfication)
    ] 
  }
});

module.exports = config;