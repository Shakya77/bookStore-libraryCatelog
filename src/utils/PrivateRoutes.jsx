import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes({ role }) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return <Navigate to="/login" />;

    if (role && user.type !== role) return <Navigate to={`/dashboard`} />;

    return <Outlet />;
}
