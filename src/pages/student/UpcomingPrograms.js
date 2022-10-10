import { useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramsAsync } from '../../redux/slices/programSlice';
import programAPI from '../../services/programAPI';

const UpcomingPrograms = () => {
  const { programs } = useSelector((state) => state.program);
  const dispatch = useDispatch();

  const handleRegister = async (id) => {
    const res = await programAPI.registerProgram(id);

    if (res?.status === 201) {
      toast.success('Registered successfully!');
    } else if (res?.response?.status === 400) {
      toast.error(res?.response?.data?.message);
    } else {
      toast.error('Error registering program!');
    }
  };

  useEffect(() => {
    dispatch(getProgramsAsync());
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h5 className="my-3">Upcoming Programs</h5>

      <Row>
        {programs?.map((program) => (
          <Col md={3} key={program.id}>
            <Card>
              <Card.Img variant="top" src={program.program_image} />
              <Card.Body>
                <Card.Title>{program.program_name}</Card.Title>
                <Card.Text>Fee: {program.program_fee}</Card.Text>
                <Card.Text>
                  Date: {program.from_date} to {program.to_date}
                </Card.Text>
                <Card.Text>
                  Age group: {program.from_age} to {program.to_age}
                </Card.Text>
                <Card.Text>{program.program_details}</Card.Text>
                <Button className="w-100" onClick={() => handleRegister(program.id)}>
                  Register Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UpcomingPrograms;
