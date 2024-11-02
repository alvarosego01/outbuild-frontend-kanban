module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        'dialog-polyfill/dialog-polyfill.css': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    rootDir: '.',
    moduleDirectories: ["node_modules", "src"],
};