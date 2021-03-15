import React from 'react';
import logo from '../../images/logo.png';
import './header.css'

const Header = () => {
    return (
        <div>
            <div className='logo' >
                <img src={logo} alt=""/>
            </div>
            <div className='nav'>
                <nav>
                    <a href="/shop">Shop</a>
                    <a href="/review">Items Review</a>
                    <a href="/manage">Manage inventory</a>
                </nav>
            </div>
        </div>
    );
};

export default Header;