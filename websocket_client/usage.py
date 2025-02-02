import json
import websocket_client
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div([
    websocket_client.WebsocketClient(
        id='client',
        value=[],
        url='http://localhost:3000/ws'
    ),
    html.Div([
        html.H1("Messages: "),
        html.Div(id='output')
    ])
])


@callback(Output('output', 'children'), Input('client', 'value'))
def display_output(value):
    return [ html.Div(msg["content"]) for msg in value ]


if __name__ == '__main__':
    app.run(debug=True)
