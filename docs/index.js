// TODO: Remove example diagram
var yourVlSpec = {
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
                type: 'mercator'
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
                type: 'mercator'
            }
        },
    ]


    // {
    //     data: {
    //         // USE LESS SITE DATA SO IT DOES NOT CRASH
    //         // url: "data/victoria_site.csv"
    //         url: "data/victoria_site.csv"
    //     },
    //     projection: { type: "mercator" },
    //     mark: "circle",
    //     encoding: {
    //         longitude: {
    //             field: "LONGITUDE",
    //             type: "quantitative"
    //         },
    //         latitude: {
    //             field: "LATITUDE",
    //             type: "quantitative"
    //         },
    //         size: { value: 10 },
    //         color: { value: "steelblue" }
    //     }
    // },





}
vegaEmbed('#vis', yourVlSpec);