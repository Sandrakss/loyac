import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/Layout/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateProgram from '../pages/staff/CreateProgram';
import Programs from '../pages/staff/Programs';
import Enrollments from '../pages/staff/Enrollments';
import PrivateRoute from './PrivateRoute';
import UpcomingPrograms from '../pages/student/UpcomingPrograms';

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/staff" element={<PrivateRoute />}>
        <Route path="/staff/programs/" element={<Programs />} />
        <Route path="/staff/create-program/" element={<CreateProgram />} />
        <Route path="/staff/enrollments/" element={<Enrollments />} />
      </Route>
      <Route path="/student" element={<PrivateRoute />}>
        <Route path="/student/programs/" element={<UpcomingPrograms />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default CustomRoutes;
