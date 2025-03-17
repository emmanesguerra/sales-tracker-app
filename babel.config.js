module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['module:react-native-dotenv', {
        'moduleName': 'react-native-dotenv',
        'path': '.env', // Path to your .env file
      }],
    ],
  };
  