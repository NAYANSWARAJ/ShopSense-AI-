const mongoose = require("mongoose");


const predictionSchema = new mongoose.Schema(
    {
        input: {
            Administrative: Number,

            Administrative_Duration: Number,

            Informational: Number,

            Informational_Duration: Number,

            ProductRelated: Number,

            ProductRelated_Duration: Number,

            BounceRates: Number,

            ExitRates: Number,

            PageValues: Number,

            SpecialDay: Number,

            Month: String,

            OperatingSystems: Number,

            Browser: Number,

            Region: Number,

            TrafficType: Number,

            VisitorType: String,

            Weekend: Boolean
        },

        prediction: {
            type: Number,
            required: true
        },

        label: {
            type: String,
            required: true
        },

        purchaseProbability: {
            type: Number,
            required: true
        },

        confidence: {
            type: Number,
            required: true
        },

        confidenceLevel: {
            type: String,
            required: true
        },

        model: {
            type: String,
            default: "XGBoost"
        }
    },

    {
        timestamps: true
    }
);


module.exports = mongoose.model(
    "Prediction",
    predictionSchema
);