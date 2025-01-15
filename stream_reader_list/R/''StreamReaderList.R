# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''StreamReaderList <- function(id=NULL, label=NULL, value=NULL) {
    
    props <- list(id=id, label=label, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'StreamReaderList',
        namespace = 'stream_reader_list',
        propNames = c('id', 'label', 'value'),
        package = 'streamReaderList'
        )

    structure(component, class = c('dash_component', 'list'))
}
