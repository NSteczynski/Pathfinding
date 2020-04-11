const WebpackCopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new WebpackCopyPlugin([
      { from: 'public' }
    ])
  ],
}