const path = require('path');

module.exports = {
  name: 'wordrelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval', // hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  
  entry: {
    app: ['./client'], //client.jsx가 WordRelay.jsx를 불러오기 때문에 client.jsx만 불러오면 된다.
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    }],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  } // 출력
};