

// frontend/jest.config.js
// module.exports = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "<rootDir>/styleMock.js"
//   },
//   testEnvironment: 'jsdom', // Required for testing React
// };

// export default {
//   moduleNameMapper: {
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   testEnvironment: 'jsdom',
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//   },
// };

// export default {
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
//   },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy"
//   }
// };

export default {
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.js"], // ✅ Fix for TextEncoder
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};


