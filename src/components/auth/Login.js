import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {signin} from '../../actions/auth';

class Login extends React.Component{
    renderError= ({error, touched})=>{
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput= ({input, label, type, meta})=>{
        const className = `field ${meta.error && meta.touched ? 'error': null}`;
        return(
            <div className={className}>
                <label>{label}</label>
                <input type={type} autoComplete="off" {...input}/>
                {this.renderError(meta)}
            </div>
        );
    }


    onSubmit = (formValues)=>{
        this.props.signin(formValues);
    }
    
    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}  className="ui form">
                <div className="ui grid">
                    <div className="one column centered row">
                        <div className="column">                        
                            <Field type="text" name="email" component={this.renderInput} label="Email"/>
                        </div>
                    </div>
                    
                    <div className="one column centered row">
                        <div className="column">
                            <Field type="password" name="password" component={this.renderInput} label="Hasło"/>
                        </div>
                    </div>

                    <div className="one column centered row">
                        <div className="column">
                            <button className="ui primary button">
                                Zaloguj
                            </button>
                        </div>
                    </div>   
                </div>
            </form>
        )
    }

}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = 'You must enter a title';
    }

    if(!formValues.description){
        errors.description = 'You must enter a description';
    }

    return errors;
}


const formWrapped =  reduxForm({
    form: 'streamCreate',
    validate
})(Login);

export default connect(null, {signin})(formWrapped);