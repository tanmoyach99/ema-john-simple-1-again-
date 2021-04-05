import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div>
            <div className='logo' >
                <img src={logo} alt=""/>
            </div>
            <div className='nav'>
            
                <nav>
                
                    
                    <Link to="/shop">Shop</Link>
                    <Link to="/review">Items Review</Link>
                    <Link to="/manage">Manage inventory</Link>
                    <button onClick={() => setLoggedInUser({})}>Sign out</button>
                    
                </nav>
            </div>
        </div>
    );
};

export default Header;