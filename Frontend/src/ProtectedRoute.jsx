import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const usuario = JSON.parse(sessionStorage.getItem('datosUsuario'));

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    return children;
}
