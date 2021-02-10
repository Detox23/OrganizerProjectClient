import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { Header, Modal} from 'semantic-ui-react'
import {showCreateTaskModal, createTask} from '../../actions/tasks';
import { HourPickers } from '../../components/buttons/HourPickers';
import momentLocaliser from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css'

const hoursError = "Musisz wybrać godziny"

class ModalComponent extends React.Component{
  constructor(props){
    super(props);
    momentLocaliser(this.props.date);
    this.state = {}
  }

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

  setHours = (hour, type) => {
    if(type === 1){
      this.setState({
        start:hour
      })
    }else{
      this.setState({
        end: hour
      })
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

  createDate = (hour) =>{
    var date = new Date(
      this.props.date.getFullYear(),
      this.props.date.getMonth(),
      this.props.date.getDate(), 
      hour.toString().substring(0,2), 
      hour.toString().substring(3,5)
    )
    var timeZoneOffset = date.getTimezoneOffset() * 60000;
    var newDate = new Date(date.getTime() - timeZoneOffset);
    return newDate;
  }

  onSubmit = (formValues)=>{
    if(this.state.start === undefined || this.state.end === undefined){
      this.setState({hoursError: true}, console.log(this.state));
    }else{
      if(this.state !== null){
        this.props.showCreateTaskModal(false);
        var taskForCreation = {
          title: formValues.title,
          description: formValues.description,
          startTime: this.createDate(this.state.start),
          endTime: this.createDate(this.state.end)
        }
        this.props.createTask(taskForCreation);
      }else{
        this.setState({stateNull: true})
      }
    }

    
  }

  render(){
    return (
      <Modal open={true}>
        <Modal.Header>Dodaj zadanie na:</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Wypełnij poniższe pola i zatwiedź</Header>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
              <div className="ui grid">
                <div className="one column centered row">
                  <div className="column">                        
                      <Field type="text" name="title" component={this.renderInput} label="Tytuł"/>
                  </div>
                </div>
                <div className="one column centered row">
                    <div className="column">
                        <Field type="text" name="description" component={this.renderInput} label="Opis"/>
                    </div>
                </div>
                <div className="one column row">
                  <div className="column">
                    <h3>Wybierz godziny</h3>
                    {this.state.hoursError ? <h5 className="textCenter errorColor">{hoursError}</h5>: null}
                  </div>                  
                </div>
                <div className="one column row">
                  <div className="column">
                    <HourPickers disabledHours={this.props.disabledHours} setHours={this.setHours}/>
                  </div>
                </div>                      
              </div>
              <br/>
             
              <div className="one column centered row">
                  <div className="column">                      
                      <button onClick={() => this.props.showCreateTaskModal(false)} className="ui primary button buttonFixedSize">
                          Zamknij
                      </button>
                      <button type="submit" className="ui primary button buttonFixedSize elementRight">
                          Dodaj
                      </button>
                  </div>
              </div>  
            </form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
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
  if(!formValues.time){
    errors.time = 'You must enter a time';
  }
  return errors;
}

const formWrapped =  reduxForm({
  form: 'taskCreate',
  validate
})(ModalComponent);

const mapStateToProps = (state) =>{
  return {
    disabledHours: state.tasks.disabledHours,
    date: state.dates.date
  };
}
  
export default connect(mapStateToProps, {showCreateTaskModal,  createTask})(formWrapped);
