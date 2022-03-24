import { ComponentType } from 'react';

export const getDisplayName = <P>(WrappedComponent: ComponentType<P>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
