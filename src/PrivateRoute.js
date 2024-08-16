import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Component bảo vệ route
const PrivateRoute = ({ redirectTo }) => {
    const isAuthenticated = !!localStorage.getItem("user"); // Kiểm tra người dùng đã đăng nhập hay chưa

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;