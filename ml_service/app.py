from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

import pandas as pd
import joblib
import os


# ============================================================
# SHOP SENSE ML SERVICE
# ============================================================

app = FastAPI(
    title="ShopSense ML Service",
    description="Machine Learning service for ShopSense",
    version="1.0.0"
)


# ============================================================
# MODEL PATH
# ============================================================

MODEL_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../models/shopping_intention_pipeline.joblib"
    )
)


# ============================================================
# LOAD MODEL
# ============================================================

model = None

try:

    model = joblib.load(MODEL_PATH)

    print("=" * 60)
    print("ShopSense ML Model Loaded Successfully")
    print("=" * 60)
    print(f"Model path: {MODEL_PATH}")

except Exception as error:

    print("=" * 60)
    print("ERROR: Failed to Load ShopSense ML Model")
    print("=" * 60)
    print(error)


# ============================================================
# REQUEST SCHEMA
# ============================================================

class PredictionRequest(BaseModel):

    Administrative: int = Field(
        ge=0
    )

    Administrative_Duration: float = Field(
        ge=0
    )

    Informational: int = Field(
        ge=0
    )

    Informational_Duration: float = Field(
        ge=0
    )

    ProductRelated: int = Field(
        ge=0
    )

    ProductRelated_Duration: float = Field(
        ge=0
    )

    BounceRates: float = Field(
        ge=0,
        le=1
    )

    ExitRates: float = Field(
        ge=0,
        le=1
    )

    PageValues: float = Field(
        ge=0
    )

    SpecialDay: float = Field(
        ge=0,
        le=1
    )

    Month: str

    OperatingSystems: int = Field(
        ge=0
    )

    Browser: int = Field(
        ge=0
    )

    Region: int = Field(
        ge=0
    )

    TrafficType: int = Field(
        ge=0
    )

    VisitorType: str

    Weekend: bool


# ============================================================
# ROOT ROUTE
# ============================================================

@app.get("/")
def root():

    return {
        "project": "ShopSense",
        "service": "Machine Learning Service",
        "status": "running",
        "model": "XGBoost"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model": "XGBoost"
    }


# ============================================================
# PREDICTION ROUTE
# ============================================================

@app.post("/predict")
def predict(request: PredictionRequest):

    # --------------------------------------------------------
    # Check model
    # --------------------------------------------------------

    if model is None:

        raise HTTPException(
            status_code=500,
            detail="ShopSense ML model is not loaded."
        )


    try:

        # ----------------------------------------------------
        # Convert request to dictionary
        # ----------------------------------------------------

        input_data = request.model_dump()


        # ----------------------------------------------------
        # Convert dictionary to DataFrame
        # ----------------------------------------------------

        input_dataframe = pd.DataFrame(
            [input_data]
        )


        # ----------------------------------------------------
        # Generate prediction
        # ----------------------------------------------------

        prediction = model.predict(
            input_dataframe
        )[0]


        # ----------------------------------------------------
        # Generate probability
        # ----------------------------------------------------

        probabilities = model.predict_proba(
            input_dataframe
        )[0]


        purchase_probability = probabilities[1]


        # ----------------------------------------------------
        # Determine label
        # ----------------------------------------------------

        if prediction == 1:

            label = "Purchase"

        else:

            label = "Not Purchase"


        # ----------------------------------------------------
        # Confidence
        # ----------------------------------------------------

        confidence = max(probabilities)


        if confidence >= 0.80:

            confidence_level = "High"

        elif confidence >= 0.60:

            confidence_level = "Medium"

        else:

            confidence_level = "Low"


        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return {

            "prediction": int(prediction),

            "label": label,

            "purchase_probability": round(
                float(purchase_probability),
                4
            ),

            "confidence": round(
                float(confidence),
                4
            ),

            "confidence_level": confidence_level,

            "model": "XGBoost"
        }


    except Exception as error:

        raise HTTPException(

            status_code=500,

            detail=str(error)
        )