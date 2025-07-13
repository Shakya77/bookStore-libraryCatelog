import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return <Navigate to={`/${user.role}`} />;
    }

    return <Outlet />;
};

export default PublicRoute;
