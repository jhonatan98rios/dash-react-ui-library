import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Flickity from 'flickity'
import 'flickity/css/flickity.css';


const ReactFlickityCarousel = ({id, setProps, className, value, options, children }) => {

    const carouselRef = useRef(null)
    const flickityInstance = useRef(null)

    useEffect(() => {
        flickityInstance.current = new Flickity(carouselRef.current, options || {})
        
        return () => {
            flickityInstance.current.destroy()
            flickityInstance.current = null
        }
    }, [options])

    useEffect(() => {
        if (flickityInstance.current && typeof value === 'number') {
            flickityInstance.current.select(value); // Agora usa o índice absoluto
        }
    }, [value]);

    const handlePreviousClick = () => {
        if ((value - 1) < 0) {
            setProps({ value: children.length - 1 });
        } else {
            setProps({ value: (value - 1) % children.length }); 
        }
    }

    const handleNextClick = () => {
        setProps({ value: (value + 1) % children.length }); 
    }

    return (
        <div id={id} style={{ border: "1px solid black", padding: '2px', margin: '2px' }}>

            <div> Current value: {value} </div> 
            
            <div ref={carouselRef} className={`carousel ${className || ""}`}>
                {
                    children.map((child, index) => (
                        <div className="carousel-cell" key={index}>
                            {child}
                        </div>
                    ))
                }
            </div>
            
            <p> Updating the interface with Javascript </p>
            <div style={{ display: "flex" }}>
                <button onClick={handlePreviousClick}> Previous </button>
                <button onClick={handleNextClick}> Next </button>
            </div>
        </div>
    );
}

ReactFlickityCarousel.defaultProps = {};

ReactFlickityCarousel.propTypes = {
    id: PropTypes.string,
    setProps: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.number,
    options: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.node),
};

export default ReactFlickityCarousel;
