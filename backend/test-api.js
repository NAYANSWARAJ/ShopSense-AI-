const axios = require("axios");


// ============================================================
// SHOP SENSE API TEST
// ============================================================

const API_URL =
    "http://127.0.0.1:5000/api/predict";


const sampleData = {

    Administrative: 5,

    Administrative_Duration: 120,

    Informational: 2,

    Informational_Duration: 50,

    ProductRelated: 18,

    ProductRelated_Duration: 850,

    BounceRates: 0.02,

    ExitRates: 0.04,

    PageValues: 12.5,

    SpecialDay: 0,

    Month: "Nov",

    OperatingSystems: 2,

    Browser: 1,

    Region: 1,

    TrafficType: 2,

    VisitorType: "Returning_Visitor",

    Weekend: true
};


// ============================================================
// SEND REQUEST
// ============================================================

const testPrediction = async () => {

    try {

        console.log("");
        console.log(
            "Sending prediction request..."
        );


        const response =
            await axios.post(

                API_URL,

                sampleData,

                {
                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        console.log("");
        console.log(
            "=================================================="
        );

        console.log(
            "SHOP SENSE PREDICTION"
        );

        console.log(
            "=================================================="
        );

        console.log(
            JSON.stringify(
                response.data,
                null,
                2
            )
        );

        console.log(
            "=================================================="
        );


    } catch (error) {

        console.error("");

        console.error(
            "Prediction request failed."
        );


        if (error.response) {

            console.error(
                error.response.data
            );

        } else {

            console.error(
                error.message
            );
        }
    }
};


testPrediction();