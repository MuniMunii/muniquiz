/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"transpileOnly": true} */

import type { Config } from "jest";
import nextJest from "next/jest.js";
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});
const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  verbose:true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^lib/(.*)$": "<rootDir>/lib/$1",
  },
  // Ignore module
transformIgnorePatterns: [
  'node_modules/(?!(jose|openid-client|oauth4webapi|@auth|next-auth|bson|mongodb|@mongodb-js|whatwg-url|tr46|webidl-conversions|ip-address|jsbi|sparse-bitfield|@fortawesome|react-icons)/)',
],
testPathIgnorePatterns: [
    "<rootDir>/e2e-tests/",
  ],
};

export default createJestConfig(config);
