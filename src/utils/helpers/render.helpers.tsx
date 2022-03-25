import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from 'store/index';
import { initialState } from 'store/modules/DeliveryStore/reducer';

export const renderWithRedux = (component: any, reduxState = {}) => {
  const store = createStore(rootReducer, reduxState || initialState);
  return render(<Provider store={store}>{component}</Provider>);
};
