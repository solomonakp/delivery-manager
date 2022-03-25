import { render, screen, waitFor } from '@testing-library/react';
import { mockGeolocation } from 'utils/helpers/test.helpers';
import usePosition from './usePosition';

beforeAll(() => {
  const jsdomAlert = window.alert;
  window.alert = () => {};
  window.alert = jsdomAlert;
});

function setup() {
  function TestComponent() {
    const { longitude, latitude } = usePosition({});

    return (
      <div>
        <span data-testid='latitude'>{latitude}</span>
        <span>{longitude}</span>
      </div>
    );
  }
  render(<TestComponent />);
}

describe('usePosition()', () => {
  test('should display current Position', async () => {
    setup();

    expect(mockGeolocation.watchPosition).toHaveBeenCalled();

    expect(screen.getByTestId('latitude')).toHaveTextContent('0');
  });
});
