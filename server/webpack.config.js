const { DefinePlugin } = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    app: './server/app.js'
  },
  target: 'node',
  output: {
    path: process.cwd() + '/dist',
    filename: 'server-[name].js'
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ProgressBarPlugin(),
    new UglifyJSPlugin({
      parallel: true,
      uglifyOptions: {
        output: {
          beautify: true
        }
      }
    })
  ]
}
