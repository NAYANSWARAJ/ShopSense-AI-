const {
    predictWithMLModel
} = require("../services/mlService");

const Prediction =
    require("../models/Prediction");


const predict = async (req, res) => {

    try {

        const inputData = req.body;


        if (
            !inputData ||
            Object.keys(inputData).length === 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Prediction data is required."

            });

        }


        // ----------------------------------------------------
        // Get prediction from ML service
        // ----------------------------------------------------

        const result =
            await predictWithMLModel(
                inputData
            );


        // ----------------------------------------------------
        // Save prediction
        // ----------------------------------------------------

        const savedPrediction =
            await Prediction.create({

                input: inputData,

                prediction:
                    result.prediction,

                label:
                    result.label,

                purchaseProbability:
                    result.purchase_probability,

                confidence:
                    result.confidence,

                confidenceLevel:
                    result.confidence_level,

                model:
                    result.model

            });


        // ----------------------------------------------------
        // Response
        // ----------------------------------------------------

        return res.status(200).json({

            success: true,

            project: "ShopSense",

            data: result,

            predictionId:
                savedPrediction._id

        });


    } catch (error) {

        console.error(
            "Prediction error:",
            error.message
        );


        if (error.response) {

            return res.status(
                error.response.status || 500
            ).json({

                success: false,

                message:
                    "ML service returned an error.",

                error:
                    error.response.data

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to process prediction.",

            error:
                error.message

        });

    }

};


module.exports = {
    predict
};