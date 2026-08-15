import os
import pandas as pd


DATA_URL = (
    "https://archive.ics.uci.edu/ml/"
    "machine-learning-databases/00468/"
    "online_shoppers_intention.csv"
)

OUTPUT_PATH = "data/online_shoppers_intention.csv"


def download_dataset():

    print("Downloading ShopSense dataset...")

    os.makedirs("data", exist_ok=True)

    df = pd.read_csv(DATA_URL)

    df.to_csv(
        OUTPUT_PATH,
        index=False
    )

    print("Dataset downloaded successfully.")
    print(f"Saved to: {OUTPUT_PATH}")
    print(f"Dataset shape: {df.shape}")

    print("\nColumns:")
    print(df.columns.tolist())


if __name__ == "__main__":
    download_dataset()