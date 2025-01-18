import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { csvReducer, initialState } from '../utils/reducer'

const StreamReaderList = ({ id, setProps, url, style }) => {

    const [state, dispatch] = useReducer(csvReducer, initialState);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;

                if (value) {
                    const rows = decoder.decode(value).split("\n").filter((row) => row.trim() !== "");
                    dispatch({ type: "ADD_ROWS", payload: rows });
                }
            }

        } catch (error) {
            console.error("Error fetching CSV data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setProps({ value: state.totalRows })
    }, [state.totalRows]);

    return (
        <div style={style} id={id}>
            {!state.data && <p>Loading...</p>}
            <ul>
                {state.data.map((row, index) => (
                    <li key={index}>{row}</li>
                ))}
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
