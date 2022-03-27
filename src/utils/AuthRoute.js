import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};

export default AuthRoute;
