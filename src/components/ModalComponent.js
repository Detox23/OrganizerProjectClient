import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { Header, Modal} from 'semantic-ui-react'
import {showCreateTaskModal, createTask} from '../actions/tasks';
import { TimePicker } from 'antd';
import momentLocaliser from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css'
import 'antd/dist/antd.css';

const { RangePicker } = TimePicker;


class ModalComponent extends React.Component{
  constructor(props){
    super(props);
    momentLocaliser(this.props.date);
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

  renderTimeField = ({input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? 'error': null}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <RangePicker minuteStep={15} format={'HH:mm'} size="large"/>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues)=>{
    if(this.state !== null){
      this.props.showCreateTaskModal(false);
      var taskForCreation = {
        title: formValues.title,
        description: formValues.description,
        startTime: new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), this.state.start.getHours(), this.state.start.getMinutes()),     
        endTime: new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), this.state.end.getHours(), this.state.end.getMinutes())
      }    
      this.props.createTask(taskForCreation);
    }else{
      this.setState({stateNull: true})
    }
  }

  getdisabledHours = () => {
    var hours = [];
    for(var i =0; i < 2; i++){
        hours.push(i);
    }
    return hours;
  }

  hourPicked = (event) => {
    if(event === null){
      this.setState({start: null, end: null});
    }else{
      this.setState({start: event[0]._d, end: event[1]._d, stateNull:false});
    }
  }

  showDisabledHours = () => {
    var toReturn = []
    for(var key in this.props.disabledHours){
      if(this.props.disabledHours[key].length === 4){
        toReturn.push(parseInt(key))
      }
    }
    return toReturn
  }

  showDisabledMinutes = (chosenHour) => {
    return this.props.disabledHours[chosenHour]
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
                <div className="one column centered row">
                  <div className="column">
                    {this.state !== null ?
                      this.state.stateNull ? <div>
                        <lable>Wybierz godziny</lable>
                        <br/>
                        </div>: null
                    :null}                    
                    <RangePicker 
                    disabledHours={() => this.showDisabledHours()}
                    disabledMinutes={(selectedHour) => this.showDisabledMinutes(selectedHour)}                     
                    minuteStep={15} 
                    format={'HH:mm'} 
                    onChange={(e)=> this.hourPicked(e)} 
                    size="large"/>
                  </div>
                </div>             
              </div>
              <br/>
              <div className="one column centered row">
                  <div className="column">
                      <button type="submit" className="ui primary button">
                          Dodaj
                      </button>
                      <button onClick={() => this.props.showCreateTaskModal(false)} className="ui primary button">
                          Zamknij
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
