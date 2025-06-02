/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'

const config: Config = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' } )},
  transform: {
    "^.+.tsx?$": ["ts-jest",{
      tsconfig: "tsconfig.json",
      diagnostics: false
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
