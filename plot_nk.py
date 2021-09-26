import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_csv("docs/data/id_to_num_stations.csv")
print(data.head())  # to display the first 5 lines of loaded data
print(data["station_count_by_area"])

plt.figure(1)
# Follows power law distrabution
plt.hist(data["station_count_by_area"], bins=6, log=True)

plt.figure(2)
plt.hist(data["station_count"], log=True)
plt.show()
