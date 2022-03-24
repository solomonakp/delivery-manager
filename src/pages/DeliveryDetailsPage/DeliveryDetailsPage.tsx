import { FC, useEffect, MouseEvent, useState, useMemo } from 'react';
import throttle from 'lodash/throttle';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getDelivery,
  upDateDeliveryStatus,
} from 'store/modules/DeliveryStore/creators';
import { clearDelivery } from 'store/modules/DeliveryStore/actions';
import useDeliveryStore from 'hooks/useDeliveryStore';
import { DeliveryStatus } from 'types/deliveries.types';

interface DeliveryDetailsPageProps {}

const options: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const DeliveryDetailsPage: FC<DeliveryDetailsPageProps> = () => {
  const dispatch = useDispatch();

  const { delivery, hasActive, currentActive } = useDeliveryStore();

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  console.log(location);

  const { id } = useParams<'id'>();

  useEffect(() => {
    handleFetchingDelivery();

    return () => {
      handleClearDelivery();
    };
  }, []);

  const handleFetchingDelivery = () => dispatch(getDelivery(id!));
  const handleClearDelivery = () => dispatch(clearDelivery());

  const handleSuccess: PositionCallback = (positions) => {
    const {
      coords: { latitude, longitude },
    } = positions;

    console.log(positions, 'i dey');
    setLocation((state) => ({ ...state, latitude, longitude }));
  };

  const debouncedHandleSuccess = useMemo(
    () => throttle(handleSuccess, 500),
    []
  );

  const handleError: PositionErrorCallback = (err) => {
    alert(err.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      alert('Use a Browser that supports geolocation');
      return;
    }

    const watchId = geo.watchPosition(
      debouncedHandleSuccess,
      handleError,
      options
    );
    console.log('i ran');
    return () => {
      geo.clearWatch(watchId);
    };
  }, []);

  const handleStatusUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    let target = e.currentTarget;
    let status: DeliveryStatus = 'delivered';

    if (target.textContent === 'undelivered') {
      status = 'undelivered';
    }
    const data = {
      status,
      longitude: location.longitude,
      latitude: location.latitude,
    };

    dispatch(upDateDeliveryStatus(id!, data));
  };

  // const handleDeliverStatus = useMemo(
  //   () => handleStatusUpdate(),
  //   []
  // );
  // const handleUndeliverStatus = useMemo(
  //   () => handleStatusUpdate('undelivered'),
  //   []
  // );

  if (delivery) {
    const {
      delivery: { status },
    } = delivery;

    const disable = Boolean(status === 'delivered' || hasActive);

    const isCurrentActive = Boolean(currentActive?.id === delivery.id);

    return (
      <div>
        <button title='make button'>make active</button>
        <div>
          <button title='delivered button' onClick={handleStatusUpdate}>
            delivered
          </button>
          <button title='undelivered button' onClick={handleStatusUpdate}>
            undelivered
          </button>
        </div>

        {JSON.stringify(delivery, null, 4)}
      </div>
    );
  }

  return <div>...loading</div>;
};

export default DeliveryDetailsPage;
