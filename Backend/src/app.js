const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const medicineRoutes = require("./routes/medicine.routes");
const medicineLogRoutes = require("./routes/medicineLog.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/medicine-log", medicineLogRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to MediTrack API" 
    });
});

module.exports = app;