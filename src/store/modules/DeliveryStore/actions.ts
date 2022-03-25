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

export const setDeliveredStatus = (value: boolean): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_DELIVERED_STATUS,
});
export const setUndeliveredStatus = (value: boolean): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_UNDELIVERED_STATUS,
});

export const setMakingActive = (value: boolean): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_MAKING_ACTIVE,
});

export const setDelivery = (value: Delivery): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_DELIVERY,
});
export const setActive = (value: Delivery): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_ACTIVE,
});

export const setUpdatedStatus = (value: Delivery): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_UPDATED_STATUS,
});

export const setDeliveries = (value: Deliveries): DeliveryStoreTypes => ({
  payload: value,
  type: constants.SET_DELIVERIES,
});

export const clearDelivery = (): DeliveryStoreTypes => ({
  payload: null,
  type: constants.CLEAR_DELIVERY,
});
