// jest.setup.js
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// jest.setup.js
require("whatwg-fetch");
