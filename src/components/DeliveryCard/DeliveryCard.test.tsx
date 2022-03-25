import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import DeliveryCard from './DeliveryCard';
import { BuildDelivery } from 'utils/helpers/test.helpers';

const defaultProps = {
  delivery: BuildDelivery(),
};

afterEach(cleanup);

const setUpDeliveryCard = (props = defaultProps) =>
  render(<DeliveryCard {...props} />);

describe('<DeliveryCard />', () => {
  test('it should mount', () => {
    setUpDeliveryCard();

    const deliveryCard = screen.getByTestId('DeliveryCard');

    expect(deliveryCard).toBeInTheDocument();
  });

  test('should display delivery details', () => {
    const {
      delivery: { client },
    } = defaultProps;

    setUpDeliveryCard();

    expect(screen.getByText(client)).toBeInTheDocument();
  });
  test.skip('should not fail any accessibility test', async () => {
    const { container } = setUpDeliveryCard();

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
