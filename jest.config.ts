import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  moduleNameMapper: {
    '^~/functions/(.*)$': '<rootDir>/src/functions/$1',
    '^~/utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default jestConfig;
