import json
from shapely.geometry import shape, Point
import csv

# load GeoJSON file containing sectors
with open("docs/data/victoria.geo.json") as f:
    victoria_json = json.load(f)
print("LOADED VICTORIA GEO_JSON DATA!")

# Load in station data
station_lng_lat = []
with open("docs/data/victoria_site.csv") as f:
    temp_station_lng_lat = csv.DictReader(f)

    for station in temp_station_lng_lat:
        lng = float(station["LONGITUDE"])
        lat = float(station["LATITUDE"])
        station_lng_lat.append({"LONGITUDE": lng, "LATITUDE": lat})

i = 1
fields = ["id", "suburb", "area", "station_count", "station_count_by_area"]
rows = []
for feature in victoria_json["features"]:
    polygon = shape(feature["geometry"])

    # data to write to CSV
    polygon_area = polygon.area
    label_id = feature["id"]
    label_suburb = feature["properties"]["vic_loca_2"]
    suburb_station_count = 0

    for station in station_lng_lat:
        # construct point based on lon/lat returned by geocoder
        lng = float(station["LONGITUDE"])
        lat = float(station["LATITUDE"])
        station_point = Point(lng, lat)

        # Add to station count when one is found in the polygon area
        if polygon.contains(station_point):
            suburb_station_count += 1
            print(f"Found containing polygon: {label_suburb} ({suburb_station_count})")

    print(f"##### {i} {label_suburb} TOTAL: {suburb_station_count} #####")
    i += 1

    rows.append(
        [
            label_id,
            label_suburb,
            polygon_area,
            suburb_station_count,
            suburb_station_count / polygon_area,
        ]
    )

# Name of csv file
filename = "id_to_num_stations.csv"

# Write to csv file
with open(filename, "w") as csvfile:
    # creating a csv writer object
    csvwriter = csv.writer(csvfile)

    # writing the fields
    csvwriter.writerow(fields)

    # writing the data rows
    csvwriter.writerows(rows)


# check each polygon to see if it contains the point

# fields = ["id", "rate", "suburb"]
# rows = []
# i = 1
# for area in js["objects"]["victoria"]["geometries"]:
#     rows.append([area["id"], i, i])
#     print(area["id"])
#     i += 1

#     # print(area["properties"]["lc_ply_pid"])
#     # print(area["properties"]["loc_pid"])
#     # print(area["properties"]["vic_loca_2"])

#     # LOCAL NAME vic_loca_2

#     # print(vic_loca_5)`1`
#     # print(vic_loca_7)

# for feature in js["features"]:
#     polygon = shape(feature["geometry"])
#     if polygon.contains(point):
#         print("Found containing polygon:", feature)
