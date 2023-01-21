import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  return !currentUser ? <Navigate to='/login' replace state={{ from: location }} /> : children;
};

export default AuthRoute;
