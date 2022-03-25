import { render, screen, cleanup } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { BuildDelivery } from 'utils/helpers/test.helpers';
import DeliveryInfo from './DeliveryInfo';

const defaultProps = {
  delivery: BuildDelivery(),
};

afterEach(cleanup);

const setUpDeliveryInfo = (props = defaultProps) =>
  render(<DeliveryInfo {...props} />);

describe('<DeliveryInfo />', () => {
  test('it should mount', () => {
    setUpDeliveryInfo();

    const deliveryInfo = screen.getByTestId('DeliveryInfo');

    expect(deliveryInfo).toBeInTheDocument();
  });

  test('should display delivery details', () => {
    const {
      delivery: {
        customer: { city },
      },
    } = defaultProps;

    setUpDeliveryInfo();

    expect(screen.getByText(city)).toBeInTheDocument();
  });
  test('should not fail any accessibility test', async () => {
    const { container } = setUpDeliveryInfo();

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
