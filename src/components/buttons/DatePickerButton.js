import React from 'react';

export const DatePickerButton =({action, visibleContent, hiddenContent}) => {
    return (               
        <div onClick={() => action()} className="ui animated fade button" tabIndex="0">
            <div className="visible content">{visibleContent}</div>
            <div className="hidden content">
                {hiddenContent}
            </div>
        </div>            
    )
}