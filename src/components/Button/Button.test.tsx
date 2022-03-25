import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';
import { ButtonProps } from './Button';

const defaultProps: ButtonProps = {
  onClick: jest.fn(),
  title: 'my button',
  role: 'button',
  type: 'button',
};

afterEach(cleanup);

const setUpButton = (props: ButtonProps = defaultProps) =>
  render(<Button {...props}>click</Button>);

describe('<Button />', () => {
  test('should mount', () => {
    setUpButton();

    const button = screen.getByText(/click/i);

    expect(button).toBeInTheDocument();
  });

  test('should render the button user would see', () => {
    const { asFragment } = setUpButton();

    expect(asFragment()).toMatchSnapshot();
  });

  test('should fire event when clicked', () => {
    const { onClick } = defaultProps;

    setUpButton();

    const button = screen.getByText(/click/i);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  test('shows a loader while loading', async () => {
    const props = {
      ...defaultProps,
      loading: true,
    };
    setUpButton(props);

    expect(await screen.findByTestId(/loader/i)).toBeInTheDocument();
  });
  test.skip('should not fail any accessibility test', async () => {
    const { container } = setUpButton();

    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
