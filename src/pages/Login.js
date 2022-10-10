import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Container, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useBoolean } from '../hooks';
import LoadingButton from '../components/LoadingButton/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import authAPI from '../services/authAPI';
import { setUser } from '../redux/slices/authSlice';

const Login = () => {
  const [loading, setLoading] = useBoolean();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirection = (data) => {
    if (data.user.is_staff) {
      navigate('/staff/programs');
    } else {
      navigate('/student/programs');
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading.on();

    const res = await authAPI.getToken(data);
    setLoading.off();
    if (res === undefined) {
      toast.error('Unable to login using provided credentials!');
    } else {
      dispatch(setUser(res.data));
      toast.success('Logged in successfully!');
      handleRedirection(res.data);
    }
  };

  useEffect(() => {
    if (user?.token) {
      handleRedirection(user);
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={4} className="mx-auto">
          <Card>
            <Card.Header as="h5" className="text-center">
              Login
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack direction="column" gap={2}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      {...register('username', { required: true })}
                      isInvalid={errors?.username}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register('password', { required: true })}
                      isInvalid={errors?.password}
                    />
                  </Form.Group>
                  <LoadingButton type="submit" className="btn-block" isLoading={loading}>
                    Login
                  </LoadingButton>
                </Stack>
              </Form>
            </Card.Body>
            <Card.Footer>
              Don't have an account? <Link to="/register">Register</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
