import React, { FC } from 'react';
import { Deliveries } from 'types/deliveries.types';
import DeliveryCard from 'components/DeliveryCard';
import withLoader from 'hocs/withLoading';

interface DeliveryListProps {
  deliveries: Deliveries;
}

const DeliveryList: FC<DeliveryListProps> = ({ deliveries }) => {
  return (
    <div data-testid='DeliveryList'>
      <h1 className='my-5 font-bold text-4xl'>List of Deliveries</h1>
      {deliveries.map((delivery) => {
        return <DeliveryCard delivery={delivery} key={delivery.id} />;
      })}
    </div>
  );
};

export default withLoader(DeliveryList);
