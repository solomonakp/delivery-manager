import Loader from 'components/Loader';
import { FC, ComponentType } from 'react';
import { getDisplayName } from 'utils/helpers/hoc.helpers';

interface WithLoadingProps {
  loading: boolean;
}

const withLoader = <P extends object>(Component: ComponentType<P>) => {
  const WithLoader: FC<P & WithLoadingProps> = ({ loading, ...props }) => {
    WithLoader.displayName = `WithLoader${getDisplayName(Component)}`;

    return loading ? <Loader fixed /> : <Component {...(props as P)} />;
  };

  return WithLoader;
};

export default withLoader;
