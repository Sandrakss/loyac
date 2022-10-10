import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Row, Col, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { useBoolean } from '../hooks';
import LoadingButton from '../components/LoadingButton/LoadingButton';

import authAPI from '../services/authAPI';

const Register = () => {
  const [loading, setLoading] = useBoolean();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleRedirection = (data) => {
    if (data.user.is_staff) {
      navigate('/staff/programs');
    } else if (data.user.is_importer) {
      navigate('/student/programs');
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading.on();
    const res = await authAPI.registerAccount(data);
    setLoading.off();

    if (res?.status === 201) {
      toast.success('Registered successfully. You can login now!');
      reset();
      navigate('/');
    } else if (res?.response?.status === 400) {
      Object.keys(res?.response?.data ?? {}).forEach((k) => {
        setError(k, {
          message: get(res?.response?.data, k, []).join(', '),
        });
      });
      toast.error('Please correct the following errors!');
    } else {
      toast.error('Error registering account!');
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
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Header as="h5" className="text-center">
              Register
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        isInvalid={errors?.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>ID Number</Form.Label>
                      <Form.Control
                        {...register('id_number', { required: 'ID number is required' })}
                        isInvalid={errors?.id_number}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.id_number?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="first_name"
                        {...register('first_name', { required: 'First name is required' })}
                        isInvalid={errors?.first_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.first_name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="last_name"
                        {...register('last_name', { required: 'Last name is required' })}
                        isInvalid={errors?.last_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.last_name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        {...register('dob', { required: 'Date of birth is required' })}
                        isInvalid={errors?.dob}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.dob?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        isInvalid={errors?.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.password?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <LoadingButton type="submit" className="btn-block" isLoading={loading}>
                    Register
                  </LoadingButton>
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer>
              Already have an account? <Link to="/">Login</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
