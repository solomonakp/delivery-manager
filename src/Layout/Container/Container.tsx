import React, { FC } from 'react';

interface ContainerProps {
  className?: string;
}

const Container: FC<ContainerProps> = ({ className, children }) => (
  <div className={`container px-4 ${className ? className : ''}`}>
    {children}
  </div>
);

export default Container;
