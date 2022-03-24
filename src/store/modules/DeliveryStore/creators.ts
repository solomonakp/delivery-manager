import { AxiosResponse, AxiosError } from 'axios';

import { Axios } from 'services/Api/axios';
import endPoints from 'services/Api/api.constants';

import { AppThunk } from 'store/index';

import { Deliveries, Delivery, DeliveryInfo } from 'types/deliveries.types';

import {
  setLoadingDeliveries,
  setDeliveries,
  setDelivery,
  setLoadingDelivery,
  setUpdatingStatus,
  setMakingActive,
  setUpdatedStatus,
  setActive,
} from './actions';

// AppThunk<(1), (2)>
// (1) The return value of the internal async function that will be returned by this thunk
// (2) The type of data being fired in the last action

// gets all deliveries
export const getDeliveries = (): AppThunk<
  Promise<Deliveries | void>,
  Deliveries
> => {
  return (dispatch) => {
    dispatch(setLoadingDeliveries(true));

    return Axios.get(endPoints.deliveries)
      .then(({ data }: AxiosResponse<Deliveries>) => {
        dispatch(setDeliveries(data));
      })
      .then(() => {
        dispatch(setLoadingDeliveries(false));
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      });
  };
};

// gets delivery details
export const getDelivery = (
  id: string
): AppThunk<Promise<Delivery | void>, Delivery> => {
  return (dispatch) => {
    dispatch(setLoadingDelivery(true));
    return Axios.get(`${endPoints.deliveries}/${id}`)
      .then(({ data }: AxiosResponse<Delivery>) => {
        dispatch(setDelivery(data));
      })
      .then(() => {
        dispatch(setLoadingDelivery(false));
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      });
  };
};

// updates the delivery status of a delivery
export const upDateDeliveryStatus = (
  id: string,
  values: DeliveryInfo
): AppThunk<Promise<Delivery | void>, Delivery> => {
  const postData = {
    active: false,
    delivery: values,
  };

  return (dispatch) => {
    dispatch(setUpdatingStatus(true));
    return Axios.put(`${endPoints.deliveries}/${id}`, postData)
      .then(({ data }: AxiosResponse<Delivery>) => {
        dispatch(setUpdatedStatus(data));
      })
      .then(() => {
        dispatch(setUpdatingStatus(false));
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      });
  };
};

// makes a delivery the current active delivery
export const makeActive = (
  id: string
): AppThunk<Promise<Delivery | void>, Delivery> => {
  const postData = {
    active: true,
  };

  return (dispatch) => {
    dispatch(setMakingActive(true));
    return Axios.put(`${endPoints.deliveries}/${id}`, postData)
      .then(({ data }: AxiosResponse<Delivery>) => {
        dispatch(setActive(data));
      })
      .then(() => {
        dispatch(setMakingActive(false));
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      });
  };
};
