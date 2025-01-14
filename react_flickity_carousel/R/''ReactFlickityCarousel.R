# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''ReactFlickityCarousel <- function(children=NULL, id=NULL, className=NULL, options=NULL, value=NULL) {
    
    props <- list(children=children, id=id, className=className, options=options, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'ReactFlickityCarousel',
        namespace = 'react_flickity_carousel',
        propNames = c('children', 'id', 'className', 'options', 'value'),
        package = 'reactFlickityCarousel'
        )

    structure(component, class = c('dash_component', 'list'))
}
