import React from 'react'
import {getTasksPerson, getTasksPersonForDay} from '../../actions/tasks';
import {changeDay} from '../../actions/dates';
import {connect} from 'react-redux';
import {Spinner} from '../../components/Spinner';
import TaskCard from '../../components/TaskCard';
import {formatDate, getDayName, moveDate} from '../../helpers/dateHelpers';
import {DatePicker} from '../../components/buttons/DatePicker';
import ModalComponent from '../createTask/ModalComponent';

class DailyTasks extends React.Component{

    componentDidMount(){
        if(this.props.isSignedIn){
            this.props.getTasksPersonForDay(formatDate(this.props.date));
        }
    }

    orderTasks = (tasks) => {
        return tasks.sort((a, b) => (a.startTime > b.startTime) ? 1: -1)
    }

    getDate = (type) => {
        this.props.changeDay(moveDate(this.props.date, type));
        this.props.getTasksPersonForDay(formatDate(moveDate(this.props.date, type)));
    }

    createList= () => {
        return this.orderTasks(this.props.allTasks).map(({id, title, description, startTime, endTime}) =>{
            return<TaskCard key={id} id={id} title={title} description={description} startTime={startTime} endTime={endTime}/>
        })
    }


    render(){
        if(this.props.loading){
            return(
                <div className="ui grid">
                    <Spinner/>
                </div>
            )   
        }

        if(!this.props.isSignedIn){
            return(
                <div className="ui">
                    <h1 className="ui center aligned header">Zaloguj się albo zarejestruj</h1>
                </div>
            )
        }

        if(this.props.showCreateTaskModal === true){            
            return(
                <ModalComponent />
            )
        }

        if(this.props.allTasks.length === 0){
            return(
                <div className="ui grid">
                    <div className="one column row">
                        <DatePicker 
                        formatDate={formatDate} 
                        getDayName={getDayName} 
                        getDate={this.getDate}
                        date={this.props.date}
                        /> 
                    </div>
                </div>   
            )
        }
        
        return(            
            <div className="ui grid">
                <div className="one column row">
                    <DatePicker 
                        formatDate={formatDate} 
                        getDayName={getDayName} 
                        getDate={this.getDate}
                        date={this.props.date}
                    />
                <hr/>
                    {this.createList()}
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        allTasks: state.tasks.allTasks,        
        showCreateTaskModal: state.tasks.showCreateTaskModal,
        isSignedIn: state.auth.isSignedIn,
        loading: state.spinner.loading,
        date: state.dates.date,
        disabledHours: state.tasks.disabledHours
    };
}



export default connect(mapStateToProps, {getTasksPerson, getTasksPersonForDay, changeDay})(DailyTasks);