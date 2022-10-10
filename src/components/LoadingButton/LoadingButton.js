import { Button, Spinner } from 'react-bootstrap';

const LoadingButton = ({ isLoading, children, ...rest }) => {
  return (
    <Button {...rest} disabled={isLoading}>
      {children} {isLoading && <Spinner animation="border" size="sm" />}
    </Button>
  );
};

export default LoadingButton;
