import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from 'store/index';
import { initialState } from 'store/modules/DeliveryStore/reducer';
import thunk from 'redux-thunk';

const middleware = [applyMiddleware(thunk)];

export const renderWithRedux = (component: any, reduxState = {}) => {
  const store = createStore(
    rootReducer,
    reduxState || initialState,
    compose(...middleware)
  );
  return render(<Provider store={store}>{component}</Provider>);
};
