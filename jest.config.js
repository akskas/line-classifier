module.exports = {
  rootDir: '.',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  resetMocks: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
  ],
  coveragePathIgnorePatterns: [
  ],
  coverageThreshold: {
      global: {
          lines: 80,
          branches: 80,
          functions: 80,
          statements: 80,
      },
  },
};
