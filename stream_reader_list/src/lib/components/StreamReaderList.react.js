import React, { useState, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { csvReducer, initialState } from '../utils/reducer'

const StreamReaderList = ({ id, setProps, url, style }) => {

    const [state, dispatch] = useReducer(csvReducer, initialState);
    const frame = useRef(null);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            
            requestAnimationFrame(() => fetchNextChunk(reader, decoder));

        } catch (error) {
            console.error("Error fetching CSV data:", error);
        }
    };

    function fetchNextChunk(reader, decoder) {
        reader.read()
            .then(({ value, done }) => {
                if (value && !done) {
                    const rows = decoder
                        .decode(value)
                        .split("\n")
                        .filter((row) => row.trim() !== "")
                    dispatch({ type: "ADD_ROWS", payload: rows });
                    setInterval(() => fetchNextChunk(reader, decoder), 2000);
                }
            });
    }

    useEffect(() => {
        fetchData();
        () => frame.current = null;
    }, []);

    useEffect(() => {
        setProps({ value: state.totalRows })
    }, [state.totalRows]);

    return (
        <div style={style} id={id}>
            {!state.data && <p>Loading...</p>}
            <ul style={{ listStyle: 'none' }}>
                {state.data.map((row, index) => {
                    
                    try {
                        const obj = JSON.parse(row.replace(/'/g, '"'))
                        return (
                            <li 
                                key={index} 
                                style={{ 
                                    width: '80%', 
                                    minHeight: '48px', 
                                    margin: '12px auto', 
                                    padding: '12px 24px', 
                                    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)', 
                                    background: '#fff',
                                    borderRadius: '12px'
                                }}>
                                <p style={{ margin: '0px'}}> {obj.title} </p>
                                <p style={{ margin: '0px'}}> {obj.production_companies} </p>
                                <p style={{ margin: '0px'}}> {obj.genres} </p>
                            </li>
                        )
                    } catch (err) {
                        return <></>
                    }
                })}
            </ul>
        </div>
    );
}

StreamReaderList.defaultProps = {};

StreamReaderList.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * The URL used to fetcch data.
     */
    url: PropTypes.string,

    /**
     * The style used on the container.
     */
    style: PropTypes.object,

    /**
     * The value used on the counter.
     */
    value: PropTypes.number
};

export default StreamReaderList;
