import { Delivery } from 'types/deliveries.types';

export const checkActive = (delivery: Delivery) => delivery.active === true;
