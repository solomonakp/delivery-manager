import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDeliveries } from 'store/modules/DeliveryStore/creators';
import useDeliveryStore from 'hooks/useDeliveryStore';
import { Link } from 'react-router-dom';

interface DeliveryListPageProps {}

const DeliveryListPage: FC<DeliveryListPageProps> = () => {
  const dispatch = useDispatch();

  const { deliveries } = useDeliveryStore();

  useEffect(() => {
    handleFetchingDeliveries();
  }, []);

  const handleFetchingDeliveries = () => dispatch(getDeliveries());

  return (
    <>
      <h1>delivry DeliveryDetailsPage</h1>
      {deliveries.map((delivery) => {
        return (
          <Link to={`/${delivery.id}`} key={delivery.id}>
            <div>{delivery.client}</div>
          </Link>
        );
      })}
    </>
  );
};

export default DeliveryListPage;
