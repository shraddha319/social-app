import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ path, ...props }) {
  const { token } = useSelector((state) => state.auth);
  return token ? (
    <Route {...props} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
