const { getDashboardSummary, getTodayMedicines, getMedicineHistory} = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
    try {
        const result = await getDashboardSummary(req.user._id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getToday = async (req, res) => {
    try {
        const result = await getTodayMedicines(req.user._id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getHistory = async (req, res) => {
    try {

        const result = await getMedicineHistory(req.user._id);

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



module.exports = {
    getDashboard,
    getToday,
    getHistory,
};