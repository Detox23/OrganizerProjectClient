import React from 'react';
import {DatePickerButton} from './DatePickerButton';

export const DatePicker = ({formatDate, getDayName, getDate, date}) => {
    return (        
        <div  className="ui column centered grid">
            <DatePickerButton action={() => getDate(true)} visibleContent={"Wczorajsze zadania"} hiddenContent={<i className="left arrow icon"></i>}/>
            <DatePickerButton action={() => function(){}} visibleContent={getDayName(date)} hiddenContent={formatDate(date)}/>
            <DatePickerButton action={() => getDate(false)} visibleContent={"Jutrzejsze zadania"} hiddenContent={<i className="right arrow icon"></i>}/>
        </div>
    )
}