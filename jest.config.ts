import type { Config } from "jest";

const config: Config = {
  // Use ts-jest to handle TypeScript files
  preset: "ts-jest",

  // Node environment (no browser DOM needed for these tests)
  testEnvironment: "node",

  // Resolve the @ path alias used throughout the project
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Where to look for test files
  roots: ["<rootDir>/app"],

  // Setup files
  setupFiles: ["<rootDir>/jest.setup.ts"],

  // Transform TypeScript files with ts-jest
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        // Disable type-checking for faster test runs
        diagnostics: false,
      },
    ],
  },
};

export default config;
