module.exports = {
    mode: "development",
    entry: [
      './client/index.js'
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react'
            ]
          }
        },
         // use the style-loader/css-loader combos for anything matching the .css extension
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            ]
        }
      ]
    }
}