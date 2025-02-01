import React, { useEffect, useRef } from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'

function MovieCard({ movie }) {
    return (
        <div id={movie.title.toLowerCase().replaceAll(" ", "_")} style={{ border: "1px solid black", margin: "8px", padding: "8px", width: "calc(50vw - 64px)" }}>
            <h2>{movie.title}</h2>
            <p style={{ width: "100%" }}>Companies: {movie.production_companies}</p>
            <p style={{ width: "100%" }}>Genres: {movie.genres}</p>
            <p style={{ width: "100%" }}>Relase Date: {movie.release_date}</p>
            <p style={{ width: "100%" }}>Original Language: {movie.original_language} </p>
            <p style={{ width: "100%" }}>Available Languages: {movie.spoken_languages} </p>
        </div>
    )
}

const StreamReaderList = ({ id, setProps, url, style }) => {

    const containerRef = useRef(null)
    const counterRef = useRef(0)

    useEffect(() => {
        let reader
        let buffer = ""
        let isReading = true

        const processChunk = async () => {
            if (!isReading) return

            try {
                const { value, done } = await reader.read()
                if (done) {
                    isReading = false
                    return
                }

                const decoder = new TextDecoder()
                buffer += decoder.decode(value, { stream: true })

                const parts = buffer.split("\n")
                buffer = parts.pop() // Store uncompleted data

                parts.forEach((jsonString) => {
                    try {
                        const movieData = JSON.parse(jsonString)
                        const container = containerRef.current
                        if (container) {
                            const wrapper = document.createElement("div")
                            container.appendChild(wrapper)
                            ReactDOM.render(<MovieCard movie={movieData} />, wrapper)

                            counterRef.current += 1
                        }
                    } catch (error) {
                        console.error("Error while parsing JSON:", error)
                    }
                })

                requestAnimationFrame(processChunk)
            } catch (error) {
                console.error("Error while consuming stream:", error)
            }
        }

        const startStream = async () => {
            try {
                const response = await fetch(url)
                reader = response.body.getReader()
                requestAnimationFrame(processChunk)
            } catch (error) {
                console.error("Error while initializing stream:", error)
            }
        }

        const updateCounter = () => {
            setProps({
                value: counterRef.current
            })

            setTimeout(updateCounter, 500)
        }

        startStream()
        updateCounter()

        return () => {
            isReading = false
        }
    }, [])

    return (
        <div id={id}>
            <h1>Realtime Movies</h1>
            <div ref={containerRef} style={style} />
        </div>
    )
}

StreamReaderList.defaultProps = {}

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
}

export default StreamReaderList
