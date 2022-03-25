import { FC } from 'react';
import { Link } from 'react-router-dom';
import DeliveryCard from 'components/DeliveryCard';
import { Deliveries } from 'types/deliveries.types';

interface DeliveryListProps {
  deliveries: Deliveries;
}

const DeliveryList: FC<DeliveryListProps> = ({ deliveries }) => {
  return (
    <div data-testid='DeliveryList'>
      <h1 className='my-5 font-bold text-4xl'>List of Deliveries</h1>
      {deliveries.map((delivery) => {
        return (
          <Link
            to={`/deliveryDetails/${delivery.id}`}
            className='inline-block w-full'
            key={delivery.id}
          >
            <DeliveryCard delivery={delivery} />
          </Link>
        );
      })}
    </div>
  );
};

export default DeliveryList;
