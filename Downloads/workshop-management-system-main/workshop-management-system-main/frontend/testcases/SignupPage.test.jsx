// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import SignupPage from '../src/Pages/SignupPage'; // ✅ FIXED path
// // Patch for TextEncoder (Node.js doesn't have it globally)
// import { TextEncoder, TextDecoder } from 'util';
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// describe('SignupPage', () => {
//   test('renders SignupPage with Create an account text', () => {
//     render(<SignupPage />);
//     const titleElement = screen.getByText(/create an account/i);
//     expect(titleElement).toBeInTheDocument();
//   });
// });

import React from 'react'; // <-- REQUIRED for JSX
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SignupPage from '../src/Pages/SignupPage';

// ✅ MOCK react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// ✅ MOCK toast if used
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SignupPage', () => {
  test('renders SignupPage with "Create an account" text', () => {
    render(<SignupPage />);
    const titleElement = screen.getByText(/create an account/i);
    expect(titleElement).toBeInTheDocument();
  });
});
