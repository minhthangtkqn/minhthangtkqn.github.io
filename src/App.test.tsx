import React from 'react';
import { render, screen } from '@testing-library/react';
import RootApplication from './root-application';

test('renders learn react link', () => {
  render(<RootApplication />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
