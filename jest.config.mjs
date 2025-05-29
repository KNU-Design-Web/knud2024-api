const config = {
    verbose: true,
    testEnvironment: "node",

    testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
    transform: { "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest" },
};

export default config;
