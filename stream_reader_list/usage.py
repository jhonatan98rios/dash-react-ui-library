from stream_reader_list import StreamReaderList as Stream
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div([
    Stream(
        value=0,
        id='stream',
        url='http://localhost:8000/stream-csv',
        style={ 
            'height': '500px',
            'width': '100%',
            'max-width': '100vw',
            'overflow-y': 'scroll',
            'overflow-x': "clip",
            'border': '1px solid #ccc',
            "display": "flex",
            "flex-wrap": "wrap",
        }
    ),
    html.Div(id="total_rows")
])


@callback(
    Output("total_rows", "children"),
    Input("stream", "value")
)
def update_total_rows(value):
    return f"Number of rows: {value}"

if __name__ == '__main__':
    app.run(debug=True)
