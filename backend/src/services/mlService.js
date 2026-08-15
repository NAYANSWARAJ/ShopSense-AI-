const axios = require("axios");


// ============================================================
// SHOP SENSE ML SERVICE CLIENT
// ============================================================

const ML_SERVICE_URL =
    process.env.ML_SERVICE_URL ||
    "http://127.0.0.1:8001";


// ============================================================
// SEND DATA TO PYTHON ML SERVICE
// ============================================================

const predictWithMLModel = async (data) => {

    try {

        const response = await axios.post(

            `${ML_SERVICE_URL}/predict`,

            data,

            {
                timeout: 10000,

                headers: {
                    "Content-Type": "application/json"
                }
            }
        );


        return response.data;

    } catch (error) {

        console.error(
            "ML Service Error:",
            error.message
        );


        throw error;
    }
};


// ============================================================
// CHECK ML SERVICE
// ============================================================

const checkMLService = async () => {

    try {

        const response = await axios.get(

            `${ML_SERVICE_URL}/health`,

            {
                timeout: 5000
            }
        );


        return response.data;

    } catch (error) {

        return {
            status: "unavailable",
            model_loaded: false
        };
    }
};


module.exports = {

    predictWithMLModel,

    checkMLService

};