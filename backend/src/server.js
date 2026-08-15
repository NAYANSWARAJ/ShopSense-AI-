require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDatabase = require("./config/database");

const {
    checkMLService
} = require("./services/mlService");

const predictionRoutes =
    require("./routes/predictionRoutes");

const historyRoutes =
    require("./routes/historyRoutes");

const analyticsRoutes =
    require("./routes/analyticsRoutes");


// ============================================================
// APP INITIALIZATION
// ============================================================

const app = express();


// ============================================================
// CONFIGURATION
// ============================================================

const PORT =
    process.env.PORT || 5000;


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
    cors({
        origin: "*",

        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);


app.use(
    express.json({
        limit: "1mb"
    })
);


app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb"
    })
);


// ============================================================
// ROOT ROUTE
// ============================================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({

            success: true,

            project: "ShopSense",

            message:
                "ShopSense backend is running.",

            version: "1.0.0",

            environment:
                process.env.NODE_ENV || "development"

        });

    }
);


// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
    "/api/health",
    async (req, res) => {

        try {

            const mlService =
                await checkMLService();


            const database =
                require("mongoose").connection;


            const databaseConnected =
                database.readyState === 1;


            const overallHealthy =
                databaseConnected &&
                mlService.status === "healthy";


            return res.status(
                overallHealthy ? 200 : 503
            ).json({

                success: overallHealthy,

                service:
                    "ShopSense Node.js Backend",

                backend: "healthy",

                database: {

                    status:
                        databaseConnected
                            ? "connected"
                            : "disconnected"

                },

                ml_service: mlService

            });

        } catch (error) {

            console.error(
                "Health check error:",
                error.message
            );


            return res.status(503).json({

                success: false,

                service:
                    "ShopSense Node.js Backend",

                backend: "unhealthy",

                message:
                    "Health check failed."

            });

        }

    }
);


// ============================================================
// API ROUTES
// ============================================================

// Prediction

app.use(
    "/api",
    predictionRoutes
);


// Prediction history

app.use(
    "/api",
    historyRoutes
);


// Analytics

app.use(
    "/api",
    analyticsRoutes
);


// ============================================================
// 404 HANDLER
// ============================================================

app.use(
    (req, res) => {

        return res.status(404).json({

            success: false,

            message:
                `Route ${req.method} ${req.originalUrl} not found.`

        });

    }
);


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
    (
        error,
        req,
        res,
        next
    ) => {

        console.error(
            "Global Error:",
            error
        );


        if (res.headersSent) {

            return next(error);

        }


        return res.status(500).json({

            success: false,

            message:
                "Internal server error."

        });

    }
);


// ============================================================
// START SERVER
// ============================================================

const startServer = async () => {

    try {

        // ----------------------------------------------------
        // Connect MongoDB
        // ----------------------------------------------------

        await connectDatabase();


        // ----------------------------------------------------
        // Start Express
        // ----------------------------------------------------

        app.listen(
            PORT,
            () => {

                console.log("");

                console.log(
                    "=================================================="
                );

                console.log(
                    "              SHOP SENSE BACKEND"
                );

                console.log(
                    "=================================================="
                );

                console.log(
                    `Environment : ${
                        process.env.NODE_ENV ||
                        "development"
                    }`
                );

                console.log(
                    `Server      : http://localhost:${PORT}`
                );

                console.log(
                    `Health      : http://localhost:${PORT}/api/health`
                );

                console.log(
                    `Prediction  : POST http://localhost:${PORT}/api/predict`
                );

                console.log(
                    `History     : GET http://localhost:${PORT}/api/history`
                );

                console.log(
                    `Analytics   : GET http://localhost:${PORT}/api/analytics`
                );

                console.log(
                    "=================================================="
                );

                console.log("");

            }
        );

    } catch (error) {

        console.error("");

        console.error(
            "=================================================="
        );

        console.error(
            "SHOP SENSE BACKEND FAILED TO START"
        );

        console.error(
            "=================================================="
        );

        console.error(
            error.message
        );

        console.error(
            "=================================================="
        );

        process.exit(1);

    }

};


// ============================================================
// START APPLICATION
// ============================================================

startServer();