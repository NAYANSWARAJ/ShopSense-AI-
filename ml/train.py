import os
import json
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.compose import ColumnTransformer

from sklearn.pipeline import Pipeline

from sklearn.preprocessing import (
    OneHotEncoder,
    StandardScaler
)

from sklearn.impute import SimpleImputer

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    classification_report,
    confusion_matrix
)

from xgboost import XGBClassifier


# ============================================================
# SHOP SENSE
# Online Shopping Intention Prediction
# ============================================================


# ============================================================
# CONFIGURATION
# ============================================================

DATA_PATH = "data/online_shoppers_intention.csv"

MODEL_DIR = "models"

MODEL_PATH = (
    "models/shopping_intention_pipeline.joblib"
)

METRICS_PATH = (
    "models/metrics.json"
)


# ============================================================
# CREATE MODEL DIRECTORY
# ============================================================

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)


# ============================================================
# LOAD DATA
# ============================================================

print("\n" + "=" * 70)
print("SHOP SENSE")
print("ONLINE SHOPPING INTENTION PREDICTION")
print("=" * 70)

print("\nLoading dataset...")

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully.")

print(
    f"Dataset shape: {df.shape}"
)


# ============================================================
# BASIC INFORMATION
# ============================================================

print("\n" + "=" * 70)
print("DATASET INFORMATION")
print("=" * 70)

print("\nColumns:")

for column in df.columns:
    print("-", column)


print("\nMissing values:")

print(
    df.isnull().sum()
)


print("\nTarget distribution:")

print(
    df["Revenue"].value_counts()
)


print("\nTarget percentage:")

print(
    df["Revenue"]
    .value_counts(normalize=True)
    .mul(100)
)


# ============================================================
# TARGET
# ============================================================

df["Revenue"] = (
    df["Revenue"]
    .astype(int)
)


# ============================================================
# FEATURES / TARGET
# ============================================================

X = df.drop(
    columns=["Revenue"]
)

y = df["Revenue"]


# ============================================================
# FEATURE TYPES
# ============================================================

numerical_features = [

    "Administrative",

    "Administrative_Duration",

    "Informational",

    "Informational_Duration",

    "ProductRelated",

    "ProductRelated_Duration",

    "BounceRates",

    "ExitRates",

    "PageValues",

    "SpecialDay"
]


categorical_features = [

    "Month",

    "OperatingSystems",

    "Browser",

    "Region",

    "TrafficType",

    "VisitorType",

    "Weekend"
]


# ============================================================
# TRAIN / TEST SPLIT
# ============================================================

print("\n" + "=" * 70)
print("TRAIN / TEST SPLIT")
print("=" * 70)

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.30,

    random_state=42,

    stratify=y
)


print(
    f"Training samples: {len(X_train)}"
)

print(
    f"Testing samples: {len(X_test)}"
)


# ============================================================
# NUMERICAL PREPROCESSING
# ============================================================

numerical_pipeline = Pipeline(
    steps=[

        (
            "imputer",

            SimpleImputer(
                strategy="median"
            )
        ),

        (
            "scaler",

            StandardScaler()
        )
    ]
)


# ============================================================
# CATEGORICAL PREPROCESSING
# ============================================================

categorical_pipeline = Pipeline(
    steps=[

        (
            "imputer",

            SimpleImputer(
                strategy="most_frequent"
            )
        ),

        (
            "encoder",

            OneHotEncoder(

                handle_unknown="ignore",

                sparse_output=False
            )
        )
    ]
)


# ============================================================
# COMBINE PREPROCESSING
# ============================================================

preprocessor = ColumnTransformer(

    transformers=[

        (
            "numerical",

            numerical_pipeline,

            numerical_features
        ),

        (
            "categorical",

            categorical_pipeline,

            categorical_features
        )
    ]
)


# ============================================================
# XGBOOST MODEL
# ============================================================

xgb_model = XGBClassifier(

    n_estimators=300,

    max_depth=6,

    learning_rate=0.05,

    subsample=0.8,

    colsample_bytree=0.8,

    objective="binary:logistic",

    eval_metric="logloss",

    random_state=42,

    n_jobs=-1
)


# ============================================================
# COMPLETE PIPELINE
# ============================================================

pipeline = Pipeline(

    steps=[

        (
            "preprocessor",

            preprocessor
        ),

        (
            "model",

            xgb_model
        )
    ]
)


# ============================================================
# TRAIN
# ============================================================

print("\n" + "=" * 70)
print("TRAINING XGBOOST MODEL")
print("=" * 70)

pipeline.fit(

    X_train,

    y_train
)

print(
    "Training completed successfully."
)


# ============================================================
# PREDICTION
# ============================================================

print("\nGenerating predictions...")

y_pred = pipeline.predict(
    X_test
)

y_probability = pipeline.predict_proba(
    X_test
)[:, 1]


# ============================================================
# METRICS
# ============================================================

accuracy = accuracy_score(

    y_test,

    y_pred
)


precision = precision_score(

    y_test,

    y_pred,

    zero_division=0
)


recall = recall_score(

    y_test,

    y_pred,

    zero_division=0
)


f1 = f1_score(

    y_test,

    y_pred,

    zero_division=0
)


roc_auc = roc_auc_score(

    y_test,

    y_probability
)


# ============================================================
# DISPLAY RESULTS
# ============================================================

print("\n" + "=" * 70)
print("MODEL PERFORMANCE")
print("=" * 70)

print(
    f"Accuracy  : {accuracy:.4f}"
)

print(
    f"Precision : {precision:.4f}"
)

print(
    f"Recall    : {recall:.4f}"
)

print(
    f"F1 Score  : {f1:.4f}"
)

print(
    f"ROC-AUC   : {roc_auc:.4f}"
)


# ============================================================
# CLASSIFICATION REPORT
# ============================================================

print("\n" + "=" * 70)
print("CLASSIFICATION REPORT")
print("=" * 70)

print(

    classification_report(

        y_test,

        y_pred,

        target_names=[

            "Not Purchase",

            "Purchase"
        ],

        zero_division=0
    )
)


# ============================================================
# CONFUSION MATRIX
# ============================================================

print("\n" + "=" * 70)
print("CONFUSION MATRIX")
print("=" * 70)

cm = confusion_matrix(

    y_test,

    y_pred
)

print(cm)


# ============================================================
# SAVE COMPLETE PIPELINE
# ============================================================

print("\n" + "=" * 70)
print("SAVING MODEL")
print("=" * 70)

joblib.dump(

    pipeline,

    MODEL_PATH
)

print(
    f"Model saved at: {MODEL_PATH}"
)


# ============================================================
# SAVE METRICS
# ============================================================

metrics = {

    "project": "ShopSense",

    "model": "XGBoost",

    "accuracy": float(
        accuracy
    ),

    "precision": float(
        precision
    ),

    "recall": float(
        recall
    ),

    "f1_score": float(
        f1
    ),

    "roc_auc": float(
        roc_auc
    ),

    "training_samples": int(
        len(X_train)
    ),

    "testing_samples": int(
        len(X_test)
    ),

    "features": list(
        X.columns
    )
}


with open(

    METRICS_PATH,

    "w"
) as file:

    json.dump(

        metrics,

        file,

        indent=4
    )


print(
    f"Metrics saved at: {METRICS_PATH}"
)


# ============================================================
# FINAL MESSAGE
# ============================================================

print("\n" + "=" * 70)
print("SHOP SENSE ML PIPELINE READY")
print("=" * 70)

print(
    "\nProduction model:"
)

print(
    MODEL_PATH
)

print(
    "\nMetrics:"
)

print(
    METRICS_PATH
)