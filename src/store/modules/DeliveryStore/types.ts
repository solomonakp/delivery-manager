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

interface SetDelivery {
  payload: Delivery;
  type: typeof actions.SET_DELIVERY;
}

interface SetDeliveries {
  payload: Deliveries;
  type: typeof actions.SET_DELIVERIES;
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
}

export type DeliveryStoreTypes =
  | SetLoadingDeliveries
  | SetLoadingDelivery
  | SetUpdatingStatus
  | SetDelivery
  | SetDeliveries
  | ClearDelivery;
