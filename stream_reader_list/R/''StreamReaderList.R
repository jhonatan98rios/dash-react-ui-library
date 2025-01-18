# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''StreamReaderList <- function(id=NULL, style=NULL, url=NULL, value=NULL) {
    
    props <- list(id=id, style=style, url=url, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'StreamReaderList',
        namespace = 'stream_reader_list',
        propNames = c('id', 'style', 'url', 'value'),
        package = 'streamReaderList'
        )

    structure(component, class = c('dash_component', 'list'))
}
