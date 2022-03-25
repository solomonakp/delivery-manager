import { AxiosResponse, AxiosError } from 'axios';

import { Axios } from 'services/Api/axios';
import endPoints from 'services/Api/api.constants';

import { AppThunk } from 'store/index';

import { Deliveries, Delivery, DeliveryInfo } from 'types/deliveries.types';
import { setDeliveredStatus, setUndeliveredStatus } from './actions';

import {
  setLoadingDeliveries,
  setDeliveries,
  setDelivery,
  setLoadingDelivery,
  setMakingActive,
  setUpdatedStatus,
  setActive,
} from './actions';

// AppThunk<(1)>
// (1) The return value of the internal async function that will be returned by this thunk

// gets all deliveries
export const getDeliveries = (): AppThunk<Promise<Deliveries | void>> => {
  return (dispatch) => {
    dispatch(setLoadingDeliveries(true));

    return Axios.get(endPoints.deliveries)
      .then(({ data }: AxiosResponse<Deliveries>) => {
        dispatch(setDeliveries(data));
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      })
      .finally(() => {
        dispatch(setLoadingDeliveries(false));
      });
  };
};

// gets delivery details
export const getDelivery = (id: string): AppThunk<Promise<Delivery | void>> => {
  return async (dispatch, getState) => {
    dispatch(setLoadingDelivery(true));

    // find if there is an active product already  if page is refreshed or state is lost
    const {
      deliveryStore: { deliveries },
    } = getState();

    if (deliveries.length === 0) {
      await Axios.get(endPoints.deliveries)
        .then(({ data }: AxiosResponse<Deliveries>) => {
          dispatch(setDeliveries(data));
        })
        .catch((err: AxiosError) => {
          alert(err.response?.data?.message);
        })
        .finally(() => {
          dispatch(setLoadingDeliveries(false));
        });
    }

    return Axios.get(`${endPoints.deliveries}/${id}`)
      .then(({ data }: AxiosResponse<Delivery>) => {
        dispatch(setDelivery(data));
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      })
      .finally(() => {
        dispatch(setLoadingDelivery(false));
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

  const { status } = values;

  return (dispatch) => {
    if (status === 'delivered') {
      dispatch(setDeliveredStatus(true));
    } else {
      dispatch(setUndeliveredStatus(true));
    }

    return Axios.put(`${endPoints.deliveries}/${id}`, postData)
      .then(({ data }: AxiosResponse<Delivery>) => {
        dispatch(setUpdatedStatus(data));
      })
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      })
      .finally(() => {
        if (status === 'delivered') {
          dispatch(setDeliveredStatus(false));
        } else {
          dispatch(setUndeliveredStatus(false));
        }
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
      .catch((err: AxiosError) => {
        alert(err.response?.data?.message);
      })
      .finally(() => {
        dispatch(setMakingActive(false));
      });
  };
};
