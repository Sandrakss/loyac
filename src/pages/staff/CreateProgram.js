import React from 'react';
import { Card, Container, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import get from 'lodash/get';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
import { useBoolean } from '../../hooks';
import programAPI from '../../services/programAPI';

const CreateProgram = () => {
  const [loading, setLoading] = useBoolean();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    setLoading.on();
    const payload = new FormData();

    Object.entries(data).forEach((item) => {
      if (item[0] === 'program_image') {
        payload.append(item[0], item[1][0]);
      } else {
        payload.append(item[0], item[1]);
      }
    });
    const res = await programAPI.createProgram(payload);
    setLoading.off();

    if (res?.status === 201) {
      toast.success('Program created successfully!');
      reset();
      navigate('/staff/programs');
    } else if (res?.response?.status === 400) {
      Object.keys(res?.response?.data ?? {}).forEach((k) => {
        setError(k, {
          message: get(res?.response?.data, k, []).join(', '),
        });
      });
      toast.error('Please correct the following errors!');
    } else {
      toast.error('Error creating program!');
    }
  };

  return (
    <Container className="pt-3">
      <Card>
        <Card.Header as="h5">Create Program</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Program Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    {...register('program_image', { required: 'Program image is required' })}
                    isInvalid={errors?.program_image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.program_image?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Program Name</Form.Label>
                  <Form.Control
                    {...register('program_name', { required: 'Program name is required' })}
                    isInvalid={errors?.program_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.program_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    {...register('from_date', { required: 'From date is required' })}
                    isInvalid={errors?.from_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.from_date?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    {...register('to_date', { required: 'To date is required' })}
                    isInvalid={errors?.to_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.to_date?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>From Age</Form.Label>
                  <Form.Control
                    type="number"
                    {...register('from_age', { required: 'From age is required' })}
                    isInvalid={errors?.from_age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.from_age?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>To Age</Form.Label>
                  <Form.Control
                    type="number"
                    {...register('to_age', { required: 'To age is required' })}
                    isInvalid={errors?.to_age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.to_age?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group>
                  <Form.Label>Program Fee</Form.Label>
                  <Form.Control
                    {...register('program_fee', { required: 'Program fee is required' })}
                    isInvalid={errors?.program_fee}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.program_fee?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Program Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    {...register('program_details', { required: 'Program details is required' })}
                    isInvalid={errors?.program_details}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.program_details?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <LoadingButton type="submit" className="btn-block" isLoading={loading}>
                Submit
              </LoadingButton>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateProgram;
