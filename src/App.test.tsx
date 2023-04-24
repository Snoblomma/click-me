import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders click me button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
