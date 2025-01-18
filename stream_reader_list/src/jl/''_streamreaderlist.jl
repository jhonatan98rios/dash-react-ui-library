# AUTO GENERATED FILE - DO NOT EDIT

export ''_streamreaderlist

"""
    ''_streamreaderlist(;kwargs...)

A StreamReaderList component.

Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `style` (Dict; optional): The style used on the container.
- `url` (String; optional): The URL used to fetcch data.
- `value` (Real; optional): The value used on the counter.
"""
function ''_streamreaderlist(; kwargs...)
        available_props = Symbol[:id, :style, :url, :value]
        wild_props = Symbol[]
        return Component("''_streamreaderlist", "StreamReaderList", "stream_reader_list", available_props, wild_props; kwargs...)
end

