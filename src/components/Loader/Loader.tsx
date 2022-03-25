import React, { FC } from 'react';
import styles from './Loader.module.css';

export interface LoaderProps {
  type?: 1 | 2;
  fixed?: boolean;
  className?: string;
}

const Loader: FC<LoaderProps> = ({ type = 1, fixed = false, className }) => {
  return (
    <div
      className={`${styles.loaderContainer} ${className} ${
        fixed ? styles.fixed : ''
      }`}
      data-testid='loader'
    >
      {type === 1 ? (
        <div className={`${styles.ldsRoller} bg`}>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
        </div>
      ) : (
        <span className={`${styles.ldsEllipsis}`}>
          <span className='after-color-2'></span>
          <span className='after-color-2'></span>
          <span className='after-color-2'></span>
          <span className='after-color-2'></span>
        </span>
      )}
    </div>
  );
};

export default Loader;
