import { DeliveryStoreTypes, State } from './types';

export const initialState: State = {
  deliveries: [],
  delivery: null,
  isLoadingDelivery: false,
  isLoadingDeliveries: false,
  isUpdatingStatus: false,
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

    case 'SET_UPDATING_STATUS':
      return {
        ...state,
        isUpdatingStatus: action.payload,
      };
    case 'SET_DELIVERIES':
      return {
        ...state,
        deliveries: action.payload,
      };

    case 'SET_DELIVERY':
      return {
        ...state,
        delivery: action.payload,
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
