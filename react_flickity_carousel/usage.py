from react_flickity_carousel import ReactFlickityCarousel as RFCarousel
from dash import Dash, callback, html, Input, Output, State, ctx, no_update, dcc

app = Dash(__name__)

cardStyle = {
    "width": "200px", 
    "height": "100px",
    "background": "white",
    "margin": "0 8px",
    "borderRadius": "8px",
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center"
}

carouselItems = [
    html.Div("Card 1", style=cardStyle),
    html.Div("Card 2", style=cardStyle),
    html.Div("Card 3", style=cardStyle),
    html.Div("Card 4", style=cardStyle),
    html.Div("Card 5", style=cardStyle),
]

app.layout = html.Div([
    dcc.Store(id="carousel-store", data=0),
    RFCarousel(
        id='carousel',
        value=0,
        options={
            "initialIndex": 0,
            "cellAlign": "left",
            "contain": True,
            "prevNextButtons": False,
            "pageDots": False,
            "wrapAround": True,
        },
        children=carouselItems
    ),
    
    html.P("Updating the interface with Python"),
    html.Div([
        html.Button("Previous", id="previous"),
        html.Button("Next", id="next"),
    ], style={"style": "flex"})
    
], style={
    "background": "#ddd", 
    "width": "500px", 
    "margin": "0 auto",
    "padding": "2px"
})

@callback(
    [Output("carousel-store", "data"), Output("carousel", "value")],
    [Input('previous', 'n_clicks'), Input('next', 'n_clicks'), Input('carousel', 'value')],
    State('carousel-store', 'data'),
    prevent_initial_call=True
)
def navigate_carousel(previous, next, carousel, store_data):
    current_index = store_data
    elements_count = len(carouselItems)
    
    if ctx.triggered_id == "carousel":
        new_index = carousel
        
    elif ctx.triggered_id == "previous":
        new_index = (current_index - 1) % elements_count
    elif ctx.triggered_id == "next":
        new_index = (current_index + 1) % elements_count
    else:
        return no_update, no_update
    
    return new_index, new_index



if __name__ == '__main__':
    app.run(debug=True)
