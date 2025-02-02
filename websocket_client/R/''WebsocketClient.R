# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''WebsocketClient <- function(id=NULL, url=NULL, value=NULL) {
    
    props <- list(id=id, url=url, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'WebsocketClient',
        namespace = 'websocket_client',
        propNames = c('id', 'url', 'value'),
        package = 'websocketClient'
        )

    structure(component, class = c('dash_component', 'list'))
}
