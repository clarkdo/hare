import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
const nodeEnv = 'production'

export default {
  entry: {
    app: './server/app.js'
  },
  target: 'node',
  output: {
    path: process.cwd() + '/.nuxt/dist',
    filename: 'server-[name].[hash].js'
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
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    new ProgressBarPlugin()
  ]
}
