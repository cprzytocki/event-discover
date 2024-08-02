import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)", // Include all ts and tsx files in src
    "!src/types/**.*", // Exclude types
    "!src/components/ui/*", // Exclude component library files
  ],

  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testRegex: ".*\\.test\\.(ts|tsx)$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
