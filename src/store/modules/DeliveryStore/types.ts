import { Deliveries, Delivery } from 'types/deliveries.types';
import * as actions from './constants';

interface SetLoadingDeliveries {
  payload: boolean;
  type: typeof actions.SET_LOADING_DELIVERIES;
}

interface SetLoadingDelivery {
  payload: boolean;
  type: typeof actions.SET_LOADING_DELIVERY;
}

interface SetDeliveredStatus {
  payload: boolean;
  type: typeof actions.SET_DELIVERED_STATUS;
}

interface SetUndeliveredStatus {
  payload: boolean;
  type: typeof actions.SET_UNDELIVERED_STATUS;
}

interface SetMakingActive {
  payload: boolean;
  type: typeof actions.SET_MAKING_ACTIVE;
}

interface SetDelivery {
  payload: Delivery;
  type: typeof actions.SET_DELIVERY;
}

interface SetDeliveries {
  payload: Deliveries;
  type: typeof actions.SET_DELIVERIES;
}

interface SetActive {
  payload: Delivery;
  type: typeof actions.SET_ACTIVE;
}

interface SetUpdatedStatus {
  payload: Delivery;
  type: typeof actions.SET_UPDATED_STATUS;
}

interface ClearDelivery {
  payload: null;
  type: typeof actions.CLEAR_DELIVERY;
}

export interface State {
  deliveries: Deliveries;
  isLoadingDeliveries: boolean;
  isLoadingDelivery: boolean;
  delivery: Delivery | null;
  isSettingUndelivered: boolean;
  isSettingDelivered: boolean;
  isMakingActive: boolean;
  hasActive: boolean;
  currentActive: Delivery | null;
}

export type DeliveryStoreTypes =
  | SetLoadingDeliveries
  | SetLoadingDelivery
  | SetDeliveredStatus
  | SetUndeliveredStatus
  | SetDelivery
  | SetDeliveries
  | ClearDelivery
  | SetMakingActive
  | SetActive
  | SetUpdatedStatus;
