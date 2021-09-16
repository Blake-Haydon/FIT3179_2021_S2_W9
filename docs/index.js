// TODO: Remove example diagram
var yourVlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title: 'Cell Tower Stations per xxxxx',
    description: 'The count of cell towers distributed around australia per population (cell towers/person)',
    width: 800,
    height: 600,

    layer: [
        {
            data: {
                url: "https://raw.githubusercontent.com/KaneSec/vega_lite/main/3_choropleth_map/js/ne_110m_admin_0_countries.topojson",
                format: { type: "topojson", feature: "ne_110m_admin_0_countries" }
            },
            mark: {
                type: "geoshape", color: "green", tooltip: "IM A TOOLTIP"
            },
            projection: { type: 'equalEarth' },
        },
        {
            data: {
                url: "data/small_site.csv"
            },
            projection: { type: "equalEarth" },
            mark: "circle",
            encoding: {
                longitude: {
                    field: "LONGITUDE",
                    type: "quantitative"
                },
                latitude: {
                    field: "LATITUDE",
                    type: "quantitative"
                },
                size: { value: 10 },
                color: { value: "steelblue" }
            }
        },


    ]


}
vegaEmbed('#vis', yourVlSpec);