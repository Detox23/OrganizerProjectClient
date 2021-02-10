import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import DailyTasks from './pages/landing/DailyTasks';
import Header from './components/Header';

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