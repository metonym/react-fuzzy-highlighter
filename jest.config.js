module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>src/**/*.(spec|test).{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>src/tests/setup.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
