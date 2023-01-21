import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Navigate to='/' replace state={{ from: location }} /> : children;
};

export default ProtectedRoute;
