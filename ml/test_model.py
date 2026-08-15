import joblib
import pandas as pd


MODEL_PATH = (
    "models/shopping_intention_pipeline.joblib"
)


# ============================================================
# LOAD MODEL
# ============================================================

print("Loading ShopSense model...")

model = joblib.load(
    MODEL_PATH
)

print("Model loaded successfully.")


# ============================================================
# SAMPLE USER SESSION
# ============================================================

sample = pd.DataFrame([

    {

        "Administrative": 5,

        "Administrative_Duration": 120.0,

        "Informational": 2,

        "Informational_Duration": 50.0,

        "ProductRelated": 18,

        "ProductRelated_Duration": 850.0,

        "BounceRates": 0.02,

        "ExitRates": 0.04,

        "PageValues": 12.5,

        "SpecialDay": 0.0,

        "Month": "Nov",

        "OperatingSystems": 2,

        "Browser": 1,

        "Region": 1,

        "TrafficType": 2,

        "VisitorType": "Returning_Visitor",

        "Weekend": True
    }

])


# ============================================================
# PREDICTION
# ============================================================

prediction = model.predict(
    sample
)[0]


probability = model.predict_proba(
    sample
)[0][1]


# ============================================================
# RESULT
# ============================================================

print("\n" + "=" * 60)
print("SHOP SENSE PREDICTION")
print("=" * 60)


if prediction == 1:

    print(
        "Prediction : PURCHASE"
    )

else:

    print(
        "Prediction : NOT PURCHASE"
    )


print(
    f"Purchase Probability : {probability * 100:.2f}%"
)


print("=" * 60)