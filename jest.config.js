module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleDirectories: ['node_modules', 'src', '<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    // '/(.*)$': '<rootDir>/src/$1',
    // '/store(.*)$': '<rootDir>/src/store/$1',
    // '/services(.*)$': '<rootDir>/src/services/$1',
  },
  testEnvironment: 'jsdom',
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['node_modules'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
