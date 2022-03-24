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

interface SetUpdatingStatus {
  payload: boolean;
  type: typeof actions.SET_UPDATING_STATUS;
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
  isUpdatingStatus: boolean;
  isMakingActive: boolean;
  hasActive: boolean;
  currentActive: Delivery | null;
}

export type DeliveryStoreTypes =
  | SetLoadingDeliveries
  | SetLoadingDelivery
  | SetUpdatingStatus
  | SetDelivery
  | SetDeliveries
  | ClearDelivery
  | SetMakingActive
  | SetActive
  | SetUpdatedStatus;
