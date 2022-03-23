import { Deliveries, Delivery } from 'types/deliveries.types';
import { DeliveryStoreTypes } from './types';
import * as constants from './constants';

export const setLoadingDeliveries = (value: boolean): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_LOADING_DELIVERIES,
});

export const setLoadingDelivery = (value: boolean): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_LOADING_DELIVERY,
});

export const setUpdatingStatus = (value: boolean): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_UPDATING_STATUS,
});

export const setDelivery = (value: Delivery): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_DELIVERY,
});

export const setDeliveries = (value: Deliveries): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_DELIVERIES,
});

export const clearDelivery = (): DeliveryStoreTypes => ({
  payload: null,
  type: constants.CLEAR_DELIVERY,
});
