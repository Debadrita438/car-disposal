module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest-setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    // 'node_modules/(?!(@react-native|react-native|@react-native-community|@testing-library)/)',
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@rneui)/)',
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Ensure Babel transforms files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
};
