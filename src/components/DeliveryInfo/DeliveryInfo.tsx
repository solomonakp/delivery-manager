import { FC, memo } from 'react';
import { Delivery } from 'types/deliveries.types';

interface DeliveryInfoProps {
  delivery: Delivery;
}

const DeliveryInfo: FC<DeliveryInfoProps> = (props) => {
  const {
    delivery: {
      client,
      customer: { address, city, latitude, longitude, name, zipCode },
      delivery: { latitude: currentLong, longitude: currentLat, status },
    },
  } = props;

  return (
    <div data-testid='DeliveryInfo' className='mb-8'>
      <div className='w-full p-4 rounded-lg shadow-lg mb-3'>
        <h2 className='font-bold text-2xl mb-4'>Delivery Information</h2>
        <div className='group'>
          <span className='title'>Client: </span>
          <span className='value'>{client}</span>
        </div>
        <div className='group'>
          <span className='title'>Name: </span>
          <span className='value'>{name}</span>
        </div>
        <div className='group'>
          <span className='title'>Address: </span>
          <span className='value'>{address}</span>
        </div>
        <div className='group'>
          <span className='title'>City:</span>
          <span className='value'>{city}</span>
        </div>
        <div className='group'>
          <span className='title'>Zip Code: </span>
          <span className='value'>{zipCode}</span>
        </div>
        <div className='group'>
          <span className='title'>Latitude: </span>
          <span className='value'>{latitude}</span>
        </div>
        <div className='group'>
          <span className='title'>longitude: </span>
          <span className='value'>{longitude}</span>
        </div>
      </div>
      <div className='w-full p-4 rounded-lg shadow-lg mb-3'>
        <h2 className='font-bold text-2xl mb-4'>Delivery Status</h2>
        <div className='group'>
          <span className='title'>Status: </span>
          <span className='value'>{status}</span>
        </div>
        <div className='group'>
          <span className='title'>Latitude: </span>
          <span className='value'>{currentLat}</span>
        </div>
        <div className='group'>
          <span className='title'>Longitude:</span>
          <span className='value'>{currentLong}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(DeliveryInfo);
