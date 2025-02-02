import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
const WebsocketClient = ({ id, value, url, setProps }) => {
    const [messages, setMessages] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [inputMessage, setInputMessage] = useState("")
    const messagesRef = useRef(value);
    const websocketRef = useRef(null)
    const heartbeatRef = useRef(null)

    const HEARTBEAT_INTERVAL = 30000 // 30 segundos

    useEffect(() => {
        if (!url) return

        const connectWebSocket = () => {
            websocketRef.current = new WebSocket(url)

            websocketRef.current.onopen = () => {
                console.log('WebSocket connected')
                setIsConnected(true)
                startHeartbeat()
            }

            websocketRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type == "message") {
                    messagesRef.current = [...messagesRef.current, { content: `Received: ${data.content}` }];
                    setProps({ value: messagesRef.current });
                    
                } else {
                    console.log(data)
                }
            }

            websocketRef.current.onclose = () => {
                console.log('WebSocket disconnected. Reconnecting...')
                setIsConnected(false)
                stopHeartbeat()
                setTimeout(connectWebSocket, 3000) // Reconecta após 3 segundos
            }

            websocketRef.current.onerror = (error) => {
                console.error('WebSocket error', error)
            }
        }

        const startHeartbeat = () => {
            stopHeartbeat() // Garante que não tenha múltiplos timers
            heartbeatRef.current = setInterval(() => {
                if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
                    websocketRef.current.send(JSON.stringify({ type: 'heartbeat', timestamp: Date.now() }))
                }
            }, HEARTBEAT_INTERVAL)
        }

        const stopHeartbeat = () => {
            if (heartbeatRef.current) {
                clearInterval(heartbeatRef.current)
                heartbeatRef.current = null
            }
        }

        connectWebSocket()

        return () => {
            stopHeartbeat()
            websocketRef.current?.close()
        }
    }, [url])

    const handleSendMessage = () => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN && inputMessage.trim()) {
            const content = { type: "message", content: inputMessage }
            const strContent = JSON.stringify(content)
            websocketRef.current.send(strContent)
            messagesRef.current = [...messagesRef.current, { content: `Sent: ${inputMessage}` }];
            setProps({ value: messagesRef.current });
            setInputMessage("")
        }
    }

    return (
        <div id={id}>
            <h3>WebSocket Client</h3>
            <p>Status: {isConnected ? 'Conectado' : 'Desconectado'}</p>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua mensagem"
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    )
}

WebsocketClient.defaultProps = {}

WebsocketClient.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A url connection that will be used to create the socket.
     */
    url: PropTypes.string.isRequired,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.array,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
}

export default WebsocketClient
