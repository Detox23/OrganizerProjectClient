import React from 'react';
import {Link} from 'react-router-dom';


const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to='/' className='item'> Strona główna </Link>
            <div className="right menu">
                <Link to="/login" className="item">Zaloguj</Link>
            </div>
        </div>
    );
}

export default Header;