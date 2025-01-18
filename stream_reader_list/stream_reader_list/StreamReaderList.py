# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class StreamReaderList(Component):
    """A StreamReaderList component.


Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- style (dict; optional):
    The style used on the container.

- url (string; optional):
    The URL used to fetcch data.

- value (number; optional):
    The value used on the counter."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'stream_reader_list'
    _type = 'StreamReaderList'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, url=Component.UNDEFINED, style=Component.UNDEFINED, value=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'style', 'url', 'value']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'style', 'url', 'value']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(StreamReaderList, self).__init__(**args)
