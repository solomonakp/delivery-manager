import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

// reducers
import DeliveryReducer from './DeliveryStore/reducer';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  deliveryStore: DeliveryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void, Value = RootState> = ThunkAction<
  ReturnType,
  Value,
  unknown,
  AnyAction
>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
