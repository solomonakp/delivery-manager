import Loader from 'components/Loader';
import React, { FC } from 'react';

type color = 'primary' | 'warning';

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  color?: color;
  loading?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    color = 'primary',
    loading = false,
    ...rest
  } = props;

  return (
    <button className={`${className} btn`} {...rest}>
      {children}
      {loading && <Loader type={2} />}
    </button>
  );
};

export default Button;
