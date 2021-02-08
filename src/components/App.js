import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import DailyTasks from './overview/DailyTasks';
import Header from './Header';

const App = () => {
    return (
        <div className="ui container">            
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={DailyTasks}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;