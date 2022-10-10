import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return user?.token ? <Outlet {...props} /> : <Navigate to="/" />;
};

export default PrivateRoute;
