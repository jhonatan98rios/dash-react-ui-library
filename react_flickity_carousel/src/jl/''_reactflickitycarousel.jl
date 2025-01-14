# AUTO GENERATED FILE - DO NOT EDIT

export ''_reactflickitycarousel

"""
    ''_reactflickitycarousel(;kwargs...)
    ''_reactflickitycarousel(children::Any;kwargs...)
    ''_reactflickitycarousel(children_maker::Function;kwargs...)


A ReactFlickityCarousel component.

Keyword arguments:
- `children` (Array of a list of or a singular dash component, string or numbers; optional)
- `id` (String; optional)
- `className` (String; optional)
- `options` (Dict; optional)
- `value` (Real; optional)
"""
function ''_reactflickitycarousel(; kwargs...)
        available_props = Symbol[:children, :id, :className, :options, :value]
        wild_props = Symbol[]
        return Component("''_reactflickitycarousel", "ReactFlickityCarousel", "react_flickity_carousel", available_props, wild_props; kwargs...)
end

''_reactflickitycarousel(children::Any; kwargs...) = ''_reactflickitycarousel(;kwargs..., children = children)
''_reactflickitycarousel(children_maker::Function; kwargs...) = ''_reactflickitycarousel(children_maker(); kwargs...)

