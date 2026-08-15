const Prediction =
    require("../models/Prediction");


const getHistory = async (req, res) => {

    try {

        const limit =
            Math.min(
                Number(req.query.limit) || 20,
                100
            );


        const predictions =
            await Prediction
                .find()
                .sort({
                    createdAt: -1
                })
                .limit(limit)
                .lean();


        return res.status(200).json({

            success: true,

            count: predictions.length,

            data: predictions

        });


    } catch (error) {

        console.error(
            "History error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch prediction history."

        });

    }

};


module.exports = {
    getHistory
};