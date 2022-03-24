import { combineReducers, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import DeliveryReducer from './modules/DeliveryStore/reducer';

// reducers

export const rootReducer = combineReducers({
  deliveryStore: DeliveryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType, Value = RootState> = ThunkAction<
  ReturnType,
  Value,
  unknown,
  AnyAction
>;
