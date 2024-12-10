import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ redirectTo }) => {
    const isAuthenticated = !!localStorage.getItem("user"); // Kiểm tra người dùng đã đăng nhập hay chưa

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
    // Nếu đã đăng nhật rồi thì sẽ render các thành phần con của PrivateRoute
};

export default PrivateRoute;