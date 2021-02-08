import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signout} from '../actions/auth';
import {showCreateTaskModal} from '../actions/tasks';



class Header extends React.Component {
    
    render(){
        return (
            <div className="ui secondary pointing menu">
                <Link onClick={()=> this.props.showCreateTaskModal(false)} to='/' className='item'> Strona główna </Link>
                {this.props.isSignedIn ?
                    <button onClick={() => this.props.showCreateTaskModal(true)}  className='item'>Dodaj zadanie</button>
                    :
                    null            
                }
                <div className="right menu">
                    {   this.props.isSignedIn ?
                        <Link onClick={() => this.props.signout()} to="/" className="item">Wyloguj</Link>
                    :
                    <div className="right menu">
                        <Link to="/login" className="item">Zaloguj</Link>
                    
                        <Link to="/register" className="item">Rejestracja</Link>
                    </div>

                    }
                    
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = (state) =>{
    return {
        isSignedIn: state.auth.isSignedIn,
        showCreateTaskModal: state.tasks.showCreateTaskModal
    };
}

export default connect(mapStateToProps, {signout, showCreateTaskModal})(Header);