import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Spinner = () => {



    return(
        <div className="spinnerPlacement">
            <CircularProgress size={80}/>
            <h4 className="textCenter">Zapisuje...</h4>
        </div>
    )
}