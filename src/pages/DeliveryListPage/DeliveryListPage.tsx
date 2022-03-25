import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDeliveries } from 'store/modules/DeliveryStore/creators';
import useDeliveryStore from 'hooks/useDeliveryStore';
import DeliveryList from 'features/DeliveryList';
import withLoader from 'hocs/withLoading';

const DeliveryListWithLoader = withLoader(DeliveryList);

interface DeliveryListPageProps {}

const DeliveryListPage: FC<DeliveryListPageProps> = () => {
  const dispatch = useDispatch();

  const { deliveries, isLoadingDeliveries } = useDeliveryStore();

  useEffect(() => {
    handleFetchingDeliveries();
  }, []);

  const handleFetchingDeliveries = () => dispatch(getDeliveries());

  return (
    <div className='page'>
      <DeliveryListWithLoader
        deliveries={deliveries}
        loading={isLoadingDeliveries}
      />
    </div>
  );
};

export default DeliveryListPage;
