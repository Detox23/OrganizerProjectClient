import React from 'react';
import {connect} from 'react-redux';
import {formatHours} from '../../helpers/dateHelpers';
import {removeTask} from '../../actions/tasks';

class TaskCard extends React.Component{
    render(){
        return(                            
            <div className="column">                        
                <div style={{width:"100%"}} className="ui card">
                    <div className="content">
                        <div className="header">
                            <div className="ui grid">
                                <div className="twelve wide column">
                                    {this.props.title}
                                </div>
                                <div className="two wide column">
                                    <i className="edit outline icon"></i>
                                </div>
                                <div onClick={()=> this.props.removeTask(this.props.id)} className="two wide column">
                                    <i className="trash alternate outline icon"></i>
                                   
                                </div>
                            </div>
                        </div>
                            
                    </div>
                    <div className="content">
                        <h4 className="ui sub header">
                            {this.props.description}
                        </h4>
                        <div className="ui small feed">
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        <label>
                                            Start: {formatHours(this.props.startTime)}
                                        </label>
                                    </div>
                                </div>
                            </div>
    
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        <label>
                                            Koniec: {formatHours(this.props.endTime)}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
    };
}



export default connect(mapStateToProps, {removeTask})(TaskCard);