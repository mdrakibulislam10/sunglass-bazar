import React from 'react';
// import { Link } from 'react-router-dom';
import ActiveLink from '../../ActiveLink/ActiveLink';

const Header = () => {
    return (
        <div className='d-flex justify-content-end gap-5 bg-secondary px-5 py-4'>
            <ActiveLink to={"/"}><span className='text-white'>Home</span></ActiveLink>
            <ActiveLink to={"/sign-in"}><span className='text-white'>Sign In</span></ActiveLink>
            <ActiveLink to={"/sign-up"}><span className='text-white'>Sign Up</span></ActiveLink>
        </div>
    );
};

export default Header;