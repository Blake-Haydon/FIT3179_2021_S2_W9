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
                url: "data/victoria.topo.json",
                format: { type: "topojson", feature: "victoria" }
            },
            mark: {
                type: "geoshape", color: "green", tooltip: "IM A TOOLTIP"
            },
            projection: { type: 'equalEarth' },
        },
        {
            data: {
                // USE LESS SITE DATA SO IT DOES NOT CRASH
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