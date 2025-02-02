# AUTO GENERATED FILE - DO NOT EDIT

export ''_websocketclient

"""
    ''_websocketclient(;kwargs...)

A WebsocketClient component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `url` (String; required): A url connection that will be used to create the socket.
- `value` (Array; optional): The value displayed in the input.
"""
function ''_websocketclient(; kwargs...)
        available_props = Symbol[:id, :url, :value]
        wild_props = Symbol[]
        return Component("''_websocketclient", "WebsocketClient", "websocket_client", available_props, wild_props; kwargs...)
end

