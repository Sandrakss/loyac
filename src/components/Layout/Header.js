import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const isAuthenticated = useMemo(() => !!user?.token, [user]);
  const isStaff = useMemo(() => !!user?.user?.is_staff, [user]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          E-Learning
        </Navbar.Brand>
        <Nav>
          {isStaff && (
            <>
              <Nav.Link as={Link} to="/staff/programs/">
                Programs
              </Nav.Link>
              <Nav.Link as={Link} to="/staff/enrollments/">
                Enrollments
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="ms-auto">
          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
          {isAuthenticated && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
