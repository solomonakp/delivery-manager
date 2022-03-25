import { FC, memo } from 'react';
import { Delivery } from 'types/deliveries.types';

interface DeliveryCardProps {
  delivery: Delivery;
}

const DeliveryCard: FC<DeliveryCardProps> = ({ delivery }) => {
  const {
    client,
    customer: { address, name },
    delivery: { status },
  } = delivery;

  const isDelivered = Boolean(status === 'delivered');
  const isActive = Boolean(delivery.active);
  const isIdle = Boolean(status === 'idle' || status === 'undelivered');

  return (
    <div
      className={`flex w-full p-4 rounded-lg shadow-lg mb-3 ${
        isDelivered ? 'bg-green-500' : ''
      }  ${isActive ? '!bg-red-500' : ''}
          ${isIdle ? 'bg-blue-500' : ''}
        `}
      data-testid='DeliveryCard'
    >
      <div className='details mr-auto'>
        <div className='group'>
          <span className='title'>Client: </span>
          <span className='value'>{client}</span>
        </div>
        <div className='group'>
          <span className='title'>Customer Name: </span>
          <span className='value'>{name}</span>
        </div>
        <div className='group'>
          <span className='title'>Address: </span>
          <span className='value'>{address}</span>
        </div>
      </div>
      <div className='status flex justify-center items-center ml-3 font-bold'>
        {status}
      </div>
    </div>
  );
};

export default memo(DeliveryCard);
