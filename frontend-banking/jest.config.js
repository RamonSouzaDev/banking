// jest.config.js
const path = require('path');




module.exports = {
  timers: 'legacy',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',  // Correct transformer for Vue 3
    '^.+\\.js$': 'babel-jest',       // Transform JS with babel-jest
    '^.+\\.jsx$': 'babel-jest'       // Transform JSX with babel-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"     // Exclude axios from transform ignore (if using ES modules in axios)
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',  // Mock styles
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',      // Mock asset files
    '^@/(.*)$': '<rootDir>/src/$1'                                   // Alias for src directory
  }
};
