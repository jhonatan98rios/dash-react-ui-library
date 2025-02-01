/* eslint no-magic-numbers: 0 */
import React, { useState } from 'react';

import { WebsocketClient } from '../lib';

const App = () => {

    const [state, setState] = useState({value:'', label:'Type Here'});
    const setProps = (newProps) => {
            setState(newProps);
        };

    return (
        <div>
            <WebsocketClient
                setProps={setProps}
                {...state}
            />
        </div>
    )
};


export default App;
