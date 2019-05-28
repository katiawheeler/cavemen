module.exports = wallaby => ({
    files: [
     "tsconfig.test.json",
      "src/**/*.ts",
     "src/**/*.tsx",
      "!src/**/*.test.ts",
     "!src/**/*.test.tsx",
    ],
    tests: [
      "src/**/*.test.ts",
     "src/**/*.test.tsx",
    ],
    env: {
      type: "node",
    },
    testFramework: "jest",
    debug: true
  });