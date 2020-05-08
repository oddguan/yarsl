import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('should test true to be true', () => {
  render(<App />);
  expect(true).toBe(true);
});
