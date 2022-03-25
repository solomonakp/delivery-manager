import App from 'App';
import { screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from 'utils/helpers/render.helpers';
import { BuildDelivery } from 'utils/helpers/test.helpers';
import { Axios } from 'services/Api/axios';

jest.mock('services/Api/axios');

const mockedAxios = Axios as any;

const setUpApp = (
  routerProps = {
    initialEntries: ['/', '/deliveryDetails/:id'],
    initialIndex: 0,
  }
) =>
  renderWithRedux(
    <MemoryRouter {...routerProps}>
      <App />
    </MemoryRouter>
  );

const activeOverride = {
  active: true as any,
  delivery: {
    status: 'idle',
    latitude: null,
    longitude: null,
  },
};

const inActiveOverride = {
  active: false as any,
  delivery: {
    status: 'delivered',
    latitude: '8.9944',
    longitude: '16.9474',
  },
};

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('The app', () => {
  test('should list out the different deliveries for the driver', async () => {
    const deliveries = [BuildDelivery(), BuildDelivery(), BuildDelivery()];

    mockedAxios.get.mockResolvedValue({ data: deliveries });

    setUpApp();

    const deliveryCards = await screen.findAllByTestId('DeliveryCard');

    expect(deliveryCards).toHaveLength(3);
  });

  test('should navigate to the details page for the selected delivery', async () => {
    const delivery = BuildDelivery();

    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url === `/deliveries/${delivery.id}`) {
          return resolve({ data: delivery });
        }
        return resolve({ data: [delivery] });
      });
    });

    setUpApp();

    const deliveryCards = await screen.findAllByTestId('DeliveryCard');

    expect(deliveryCards).toHaveLength(1);

    fireEvent.click(await screen.findByText(delivery.client));

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(screen.getByText(delivery.client)).toBeInTheDocument();
    });
  });
  test('should not allow a driver to make any delivery active while there is an active delivery', async () => {
    const [delivery1, delivery2] = [
      BuildDelivery({
        overrides: activeOverride,
      }),
      BuildDelivery({
        overrides: inActiveOverride,
      }),
    ];

    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url === `/deliveries/${delivery2.id}`) {
          return resolve({ data: delivery2 });
        }
        return resolve({ data: [delivery1, delivery2] });
      });
    });

    setUpApp({
      initialEntries: ['/', `/deliveryDetails/${delivery2.id}`],
      initialIndex: 1,
    });

    expect(screen.queryByText(/make active/i)).toBeNull();
  });

  test('should have two buttons delivered and undelivered when a delivery is active', async () => {
    const [delivery1, delivery2] = [
      BuildDelivery({
        overrides: activeOverride,
      }),
      BuildDelivery({
        overrides: inActiveOverride,
      }),
    ];

    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url === `/deliveries/${delivery1.id}`) {
          return resolve({ data: delivery1 });
        }
        return resolve({ data: [delivery1, delivery2] });
      });
    });

    setUpApp({
      initialEntries: ['/', `/deliveryDetails/${delivery1.id}`],
      initialIndex: 1,
    });

    expect(screen.queryByText(/make active/i)).toBeNull();

    expect(await screen.findByText('undelivered')).toBeInTheDocument();
    expect(await screen.findByText('delivered')).toBeInTheDocument();
  });

  test('should not allow driver to make delivery active or change delivery status if delivery status is delivered', async () => {
    const [delivery1, delivery2] = [
      BuildDelivery({
        overrides: activeOverride,
      }),
      BuildDelivery({
        overrides: inActiveOverride,
      }),
    ];

    const upDatedDelivery1 = {
      ...delivery1,
    };

    upDatedDelivery1.delivery.status = 'delivered';
    upDatedDelivery1.active = false;

    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url === `/deliveries/${delivery1.id}`) {
          return resolve({ data: delivery1 });
        }
        return resolve({ data: [delivery1, delivery2] });
      });
    });
    mockedAxios.put.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url === `/deliveries/${delivery1.id}`) {
          return resolve({ data: upDatedDelivery1 });
        }
      });
    });

    setUpApp({
      initialEntries: ['/', `/deliveryDetails/${delivery1.id}`],
      initialIndex: 1,
    });

    expect(screen.queryByText(/make active/i)).toBeNull();

    fireEvent.click(await screen.findByRole('button', { name: 'delivered' }));

    await waitFor(() => {
      expect(screen.queryByText('undelivered')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.queryByRole('button', { name: 'delivered' })
      ).not.toBeInTheDocument();
    });
  });
});
