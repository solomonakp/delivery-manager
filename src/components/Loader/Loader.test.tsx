import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader, { LoaderProps } from './Loader';

const setUpLoader = (props?: LoaderProps) => render(<Loader {...props} />);

describe('<Loader />', () => {
  test('it should mount', () => {
    setUpLoader();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  test('should render the Loader user would see', () => {
    const { asFragment } = setUpLoader();

    expect(asFragment()).toMatchSnapshot();
  });
});
