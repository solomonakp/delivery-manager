import { useSelector } from 'react-redux';
import { RootState } from 'store/index';

const useDeliveryStore = () => {
  const {
    deliveryStore: { deliveries, ...rest },
  } = useSelector((state: RootState) => state);

  return { deliveries, ...rest };
};

export default useDeliveryStore;
