import { useEffect, useState, useMemo } from 'react';
import throttle from 'lodash/throttle';

interface Props extends PositionOptions {
  throttleTime?: number;
}

const usePosition = (props: Props) => {
  const { throttleTime = 500, ...rest } = props;

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleSuccess: PositionCallback = (positions) => {
    const {
      coords: { latitude, longitude },
    } = positions;

    setLocation((state) => ({ ...state, latitude, longitude }));
  };

  const debouncedHandleSuccess = useMemo(
    () => throttle(handleSuccess, throttleTime),
    []
  );

  const handleError: PositionErrorCallback = (err) => {
    alert(err.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      alert('Use a Browser that supports geolocation');
      return;
    }

    const watchId = geo.watchPosition(
      debouncedHandleSuccess,
      handleError,
      rest
    );
    return () => {
      geo.clearWatch(watchId);
    };
  }, []);

  return { ...location };
};

export default usePosition;
