import useDeliveryStore from './useDeliveryStore';
import { BuildDelivery } from 'utils/helpers/test.helpers';
import { renderWithRedux } from 'utils/helpers/render.helpers';

const defaultState = {
  deliveryStore: {
    deliveries: [BuildDelivery(), BuildDelivery()],
    delivery: null,
    isLoadingDelivery: false,
    isLoadingDeliveries: false,
    isSettingUndelivered: false,
    isSettingDelivered: false,
    isMakingActive: false,
    hasActive: true,
    currentActive: null,
  },
};

const setUp = (reduxState = {}) => {
  const returnVal = {};
  const TestComponent = () => {
    Object.assign(returnVal, useDeliveryStore());

    return null;
  };

  renderWithRedux(<TestComponent />, defaultState);

  return returnVal as any;
};

describe('useDeliveryStore()', () => {
  test('should return the correct values from redux store', async () => {
    const {
      deliveryStore: { deliveries, hasActive },
    } = defaultState;

    const value = setUp(defaultState);

    expect(value.deliveries).toHaveLength(deliveries.length);

    expect(value.hasActive).toEqual(hasActive);
  });
});
