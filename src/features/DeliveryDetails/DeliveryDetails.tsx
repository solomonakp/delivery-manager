import { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import DeliveryInfo from 'components/DeliveryInfo';
import usePosition from 'hooks/usePosition';
import useDeliveryStore from 'hooks/useDeliveryStore';
import { DeliveryStatus } from 'types/deliveries.types';
import {
  makeActive,
  upDateDeliveryStatus,
} from 'store/modules/DeliveryStore/creators';

interface DeliveryDetailsProps {}

const DeliveryDetails: FC<DeliveryDetailsProps> = () => {
  const dispatch = useDispatch();

  const { id } = useParams<'id'>();

  const { longitude, latitude } = usePosition({
    enableHighAccuracy: true,
    maximumAge: 0,
  });

  const {
    delivery,
    hasActive,
    currentActive,
    isMakingActive,
    isSettingDelivered,
    isSettingUndelivered,
  } = useDeliveryStore();

  const handleStatusUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    let target = e.currentTarget;
    let status: DeliveryStatus = 'delivered';

    if (target.textContent === 'undelivered') {
      status = 'undelivered';
    }
    const data = {
      status,
      longitude,
      latitude,
    };

    dispatch(upDateDeliveryStatus(id!, data));
  };

  const handleMakeActive = (e: MouseEvent<HTMLButtonElement>) =>
    dispatch(makeActive(id!));

  const isDisable = Boolean(
    delivery?.delivery.status === 'delivered' || hasActive
  );

  const isCurrentActive = Boolean(currentActive?.id === delivery?.id);

  return (
    <div data-testid='DeliveryDetails'>
      <div className='flex  mb-6 flex-col sm:flex-row sm:justify-between items-center'>
        <h1 className='my-5 font-bold text-3xl sm:text-4xl '>
          Deliveries Details
        </h1>
        {!isDisable && (
          <Button
            onClick={handleMakeActive}
            loading={isMakingActive}
            title='make active button'
          >
            make active
          </Button>
        )}
      </div>

      {delivery && <DeliveryInfo delivery={delivery} />}

      {isCurrentActive && (
        <div className='flex mb-6 justify-between items-center'>
          <Button
            onClick={handleStatusUpdate}
            loading={isSettingDelivered}
            title='delivered button'
          >
            delivered
          </Button>
          <Button
            onClick={handleStatusUpdate}
            title='undelivered button'
            loading={isSettingUndelivered}
          >
            undelivered
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryDetails;
