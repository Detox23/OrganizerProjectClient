import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './auth/Login';
import MainPage from './main/MainPage';
import Header from './Header';

const App = () => {

    return (
        <div className="ui container">            
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/login" exact component={Login}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;