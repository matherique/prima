/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  resetMocks: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  },
  watchPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules"],
  collectCoverageFrom: [
    "src/**/*.ts"
  ]
};
