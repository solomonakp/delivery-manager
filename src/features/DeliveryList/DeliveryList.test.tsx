import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { BuildDelivery } from 'utils/helpers/test.helpers';
import DeliveryList from './DeliveryList';

const defaultProps = {
  deliveries: [BuildDelivery(), BuildDelivery(), BuildDelivery()],
};

afterEach(cleanup);

const setUpDeliveryList = (props = defaultProps) =>
  render(
    <MemoryRouter>
      <DeliveryList {...props} />
    </MemoryRouter>
  );

describe('<DeliveryList />', () => {
  test('should renders a  delivery cards for each delivery passed to it', () => {
    const { deliveries } = defaultProps;

    setUpDeliveryList();

    const deliveryList = screen.getAllByTestId('DeliveryCard');

    expect(deliveryList).toHaveLength(deliveries.length);
  });
  test('should not fail any accessibility test', async () => {
    const { container } = setUpDeliveryList();

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
