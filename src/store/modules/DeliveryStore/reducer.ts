import { DeliveryStoreTypes, State } from './types';
import { checkActive } from 'utils/helpers/delivery.helpers';

export const initialState: State = {
  deliveries: [],
  delivery: null,
  isLoadingDelivery: false,
  isLoadingDeliveries: false,
  isSettingUndelivered: false,
  isSettingDelivered: false,
  isMakingActive: false,
  hasActive: false,
  currentActive: null,
};

const DeliveryReducer = (
  state = initialState,
  action: DeliveryStoreTypes
): State => {
  switch (action.type) {
    case 'SET_LOADING_DELIVERIES':
      return {
        ...state,
        isLoadingDeliveries: action.payload,
      };
    case 'SET_LOADING_DELIVERY':
      return {
        ...state,
        isLoadingDelivery: action.payload,
      };

    case 'SET_UNDELIVERED_STATUS':
      return {
        ...state,
        isSettingUndelivered: action.payload,
      };
    case 'SET_DELIVERED_STATUS':
      return {
        ...state,
        isSettingDelivered: action.payload,
      };

    case 'SET_MAKING_ACTIVE':
      return {
        ...state,
        isMakingActive: action.payload,
      };
    case 'SET_DELIVERIES':
      return {
        ...state,
        deliveries: action.payload,
        hasActive: action.payload.some(checkActive),
        currentActive: action.payload.find(checkActive) || null,
      };

    case 'SET_DELIVERY':
      return {
        ...state,
        delivery: action.payload,
      };
    case 'SET_ACTIVE':
      return {
        ...state,
        delivery: action.payload,
        hasActive: true,
        currentActive: action.payload,
      };
    case 'SET_UPDATED_STATUS':
      return {
        ...state,
        delivery: action.payload,
        hasActive: false,
        currentActive: null,
      };
    case 'CLEAR_DELIVERY':
      return {
        ...state,
        delivery: action.payload,
      };

    default:
      return state;
  }
};

export default DeliveryReducer;
