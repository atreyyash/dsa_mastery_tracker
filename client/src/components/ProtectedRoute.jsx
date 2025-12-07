import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spin } from 'antd';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const { isAuthenticated, token, isLoading } = useAuth();

    useEffect(() => {
        if ((!isAuthenticated && !isLoading) || !token) {
            navigate('/login');
        }
    }, [isAuthenticated, token, navigate, isLoading]);

    if (isLoading) {
        return <Spin size='large' fullscreen></Spin>
    }

    if (isAuthenticated && token) {
        return (
            <>{children}</>
        );
    }
}

export default ProtectedRoute;
