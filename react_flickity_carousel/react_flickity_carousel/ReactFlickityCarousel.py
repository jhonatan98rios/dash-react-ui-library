# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ReactFlickityCarousel(Component):
    """A ReactFlickityCarousel component.


Keyword arguments:

- children (list of a list of or a singular dash component, string or numbers; optional)

- id (string; optional)

- className (string; optional)

- options (dict; optional)

- value (number; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'react_flickity_carousel'
    _type = 'ReactFlickityCarousel'
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, className=Component.UNDEFINED, value=Component.UNDEFINED, options=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'className', 'options', 'value']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'className', 'options', 'value']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        super(ReactFlickityCarousel, self).__init__(children=children, **args)
