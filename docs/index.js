const VegaLiteSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title: 'Normalised Cell Tower Stations per Suburb in Victoria',
    description: 'The count of cell towers distributed around australia per population (cell towers/person)',
    width: 800,
    height: 600,

    layer: [

        {
            data: {
                url: "data/victoria.topo.json",
                format: { type: "topojson", feature: "victoria" }
            },
            transform: [{
                lookup: "id",
                from: {
                    data: {
                        url: "data/id_to_num_stations.csv"
                    },
                    key: "id",
                    fields: ["station_count_by_area"]
                }
            },
            {
                // More than one station in a region
                // TODO: CONVERT THIS TO DISCRETE SCALE
                filter: "datum.station_count_by_area != 0"
            }],
            mark: {
                type: "geoshape",
                tooltip: {
                    content: "data"
                }
            },
            encoding: {
                color: {
                    field: "station_count_by_area",
                    type: "quantitative",
                    scale: {
                        type: "symlog"
                    }
                }
            },
            projection: {
                type: 'conicEqualArea'
            }
        },
        {
            data: {
                url: "data/victoria.topo.json",
                format: { type: "topojson", feature: "victoria" }
            },
            transform: [{
                lookup: "id",
                from: {
                    data: {
                        url: "data/id_to_num_stations.csv"
                    },
                    key: "id",
                    fields: ["station_count_by_area"]
                }
            },
            {
                // No stations
                filter: "datum.station_count_by_area == 0"
            }
            ],
            mark: {
                type: "geoshape",
                color: "black",
                tooltip: {
                    content: "data"
                }
            },

            projection: {
                type: 'conicEqualArea'
            }
        },
    ]


}

vegaEmbed('#vis', VegaLiteSpec);