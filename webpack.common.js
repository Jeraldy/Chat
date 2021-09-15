module.exports = {
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },

          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader', options: {
              sassOptions: {
                includePaths: ['./node_modules']
              }
            }
          },
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};