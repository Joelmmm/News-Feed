import { render, screen } from '@testing-library/react';
import App from './App';

test('There is a search input', () => {
  render(<App />);
  const inputField = screen.getByPlaceholderText('Input search text');
  expect(inputField).toBeDefined()
});
