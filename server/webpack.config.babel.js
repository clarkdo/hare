import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
export default {
  entry: {
    app: './server/app.js'
  },
  target: 'node',
  output: {
    path: process.cwd() + '/dist',
    filename: 'server-[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new webpack.DefinePlugin({
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
