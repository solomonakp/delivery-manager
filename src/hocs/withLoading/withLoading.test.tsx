import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import withLoader from './withLoading';

const Text = () => {
  return <h1>Text</h1>;
};

const LoaderWithText = withLoader(Text);

const TestComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => setLoading(true);

  return (
    <>
      <LoaderWithText loading={loading} />
      <button onClick={handleClick}>toggle</button>
    </>
  );
};

const setUpTest = () => render(<TestComponent />);

describe('withLoader()', () => {
  test('should show loading spinner', async () => {
    setUpTest();

    const h1 = await screen.findByText(/text/i);

    expect(h1).toBeInTheDocument();

    fireEvent.click(screen.getByText(/toggle/i));

    expect(h1).not.toBeInTheDocument();
  });
});
