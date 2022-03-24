import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

const useDeliveryStore = () => {
  const {
    deliveryStore: { deliveries, ...rest },
  } = useSelector((state: RootState) => state);

  const hasActive = deliveries.some((delivery) => delivery.active === true);
  const currentActive = deliveries.find((delivery) => delivery.active === true);

  return { deliveries, ...rest, hasActive, currentActive };
};

export default useDeliveryStore;
