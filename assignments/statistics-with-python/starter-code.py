import csv
from pathlib import Path
from statistics import mean, median

import matplotlib.pyplot as plt


data_path = Path(__file__).with_name("data.csv")
with data_path.open(newline="", encoding="utf-8") as data_file:
    rows = list(csv.DictReader(data_file))

scores = [int(row["score"]) for row in rows]

# TODO: Calculate and print the mean and median of scores.

# TODO: Create a histogram of scores with a title and labeled axes.
# Use plt.hist(scores, bins=5, edgecolor="black") and plt.show().