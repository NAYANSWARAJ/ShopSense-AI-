const express = require("express");

const {
    predict
} = require("../controllers/predictionController");


const router = express.Router();


// ============================================================
// POST /api/predict
// ============================================================

router.post(
    "/predict",
    predict
);


module.exports = router;