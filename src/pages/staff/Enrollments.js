import { useEffect } from 'react';
import { Badge, Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getEnrollmentsAsync } from '../../redux/slices/programSlice';
import programAPI from '../../services/programAPI';

const Enrollments = () => {
  const { enrollments } = useSelector((state) => state.program);
  const dispatch = useDispatch();

  const getBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const updateStatus = async (id, status) => {
    const res = await programAPI.updateStatus(id, { status });
    if (res?.status === 200) {
      dispatch(getEnrollmentsAsync());
      toast.success('Status updated successfully!');
    } else {
      toast.error('Error updating status!');
    }
  };

  useEffect(() => {
    dispatch(getEnrollmentsAsync());
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h5 className="my-3">Enrollments</h5>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Program Date</th>
            <th>Student Email</th>
            <th>ID Number</th>
            <th>Student Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrollments?.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.program.program_name}</td>
              <td>
                {enrollment.program.from_date} to {enrollment.program.to_date}
              </td>
              <td>{enrollment.user.email}</td>
              <td>{enrollment.user.id_number}</td>
              <td>
                {enrollment.user.first_name} {enrollment.user.last_name}
              </td>
              <td>
                <Badge bg={getBadgeColor(enrollment.status)}>{enrollment.status}</Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="success"
                  className="me-1"
                  onClick={() => updateStatus(enrollment.id, 'approved')}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => updateStatus(enrollment.id, 'rejected')}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Enrollments;
