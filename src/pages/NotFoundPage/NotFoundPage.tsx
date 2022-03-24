import React, { FC } from 'react';

interface NotFoundPageProps {}

const NotFoundPage: FC<NotFoundPageProps> = () => (
  <div className='flex h-screen justify-center items-center font-bold text-center text-4xl'>
    Page not Found
  </div>
);

export default NotFoundPage;
