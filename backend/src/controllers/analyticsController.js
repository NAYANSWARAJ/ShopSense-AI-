const Prediction =
    require("../models/Prediction");


const getAnalytics = async (req, res) => {

    try {

        const total =
            await Prediction.countDocuments();


        const purchases =
            await Prediction.countDocuments({

                prediction: 1

            });


        const notPurchases =
            await Prediction.countDocuments({

                prediction: 0

            });


        const average =
            await Prediction.aggregate([

                {

                    $group: {

                        _id: null,

                        averageProbability: {
                            $avg:
                                "$purchaseProbability"
                        }

                    }

                }

            ]);


        const averageProbability =
            average.length > 0
                ? average[0].averageProbability
                : 0;


        return res.status(200).json({

            success: true,

            data: {

                totalPredictions: total,

                purchasePredictions: purchases,

                notPurchasePredictions:
                    notPurchases,

                averagePurchaseProbability:
                    Number(
                        averageProbability.toFixed(4)
                    )

            }

        });


    } catch (error) {

        console.error(
            "Analytics error:",
            error.message
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch analytics."

        });

    }

};


module.exports = {
    getAnalytics
};