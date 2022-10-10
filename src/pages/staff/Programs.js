import { useEffect } from 'react';
import { Button, Container, Row, Col, Stack, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramsAsync } from '../../redux/slices/programSlice';

const Programs = () => {
  const { programs } = useSelector((state) => state.program);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProgramsAsync());
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Stack direction="horizontal" className="justify-content-between my-3">
        <h5>Programs</h5>
        <Button as={Link} to="/staff/create-program/">
          Create Program
        </Button>
      </Stack>

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
                {/* <Button variant="danger">Delete</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Programs;
