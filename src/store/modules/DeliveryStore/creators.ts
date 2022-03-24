import { AxiosResponse } from 'axios';

import { Axios } from 'services/Api/axios';
import endPoints from 'services/Api/api.constants';

import { Deliveries, Delivery, DeliveryInfo } from 'types/deliveries.types';

import {
  setLoadingDeliveries,
  setDeliveries,
  setDelivery,
  setLoadingDelivery,
  setUpdatingStatus,
} from './actions';
import { AppThunk } from 'store/index';

// AppThunk<(1), (2)>
// (1) The return value of the internal async function that will be returned by this thunk
// (2) The type of data being fired in the last action

export const getDeliveries = (): AppThunk<
  Promise<Deliveries | void>,
  Deliveries
> => {
  return (dispatch) => {
    dispatch(setLoadingDeliveries(true));

    return Axios.get(endPoints.deliveries)
      .then(({ data }: AxiosResponse<Deliveries>) => {
        dispatch(setDeliveries(data));
        console.log(data, 'deliveries');
      })
      .then(() => {
        dispatch(setLoadingDeliveries(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getDelivery = (
  id: string
): AppThunk<Promise<Delivery | void>, Delivery> => {
  return (dispatch) => {
    dispatch(setLoadingDelivery(true));
    return Axios.get(`${endPoints.deliveries}/${id}`)
      .then(({ data }: AxiosResponse<Delivery>) => {
        dispatch(setDelivery(data));
        console.log(data, 'delivery');
      })
      .then(() => {
        dispatch(setLoadingDelivery(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const upDateDeliveryStatus = (
  id: string,
  values: DeliveryInfo
): AppThunk<Promise<Delivery | void>, Delivery> => {
  const postData = {
    delivery: values,
  };

  return (dispatch) => {
    dispatch(setUpdatingStatus(true));
    return Axios.put(`${endPoints.deliveries}/${id}`, postData)
      .then(({ data }: AxiosResponse<Delivery>) => {
        // dispatch(setDelivery());
        console.log(data, 'updated');
      })
      .then(() => {
        dispatch(setUpdatingStatus(true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
