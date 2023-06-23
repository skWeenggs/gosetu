import React from 'react';
import { Navigate, Outlet} from 'react-router-dom'

const AdminComponent= ()=>{
    const auth = sessionStorage.getItem('admin');
   
    
    return auth ?<Outlet />:<Navigate to="/" replace />
}

export default AdminComponent;