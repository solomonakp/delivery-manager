import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeliveryDetails from 'features/DeliveryDetails';
import { getDelivery } from 'store/modules/DeliveryStore/creators';
import { clearDelivery } from 'store/modules/DeliveryStore/actions';
import useDeliveryStore from 'hooks/useDeliveryStore';

interface DeliveryDetailsPageProps {}

const DeliveryDetailsPage: FC<DeliveryDetailsPageProps> = () => {
  const dispatch = useDispatch();

  const { isLoadingDelivery } = useDeliveryStore();

  const { id } = useParams<'id'>();

  useEffect(() => {
    handleFetchingDelivery();

    return () => {
      handleClearDelivery();
    };
  }, []);

  const handleFetchingDelivery = () => dispatch(getDelivery(id!));
  const handleClearDelivery = () => dispatch(clearDelivery());

  return (
    <div className='page'>
      <DeliveryDetails loading={isLoadingDelivery} />
    </div>
  );
};

export default DeliveryDetailsPage;
