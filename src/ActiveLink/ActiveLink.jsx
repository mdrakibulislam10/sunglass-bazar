import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "bg-info p-2 rounded text-warning"
                    : ""
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;