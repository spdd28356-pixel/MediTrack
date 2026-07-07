const { markAsTaken, markAsMissed } = require("../services/medicineLog.service");
const medicineLogService = require("../services/medicineLog.service");
console.log(medicineLogService);
const markMedicineAsTaken = async (req, res) => {
    try {
        const { reminderTime } = req.body;

        const result = await markAsTaken(
            req.user._id,
            req.params.id,
            reminderTime
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const markMedicineAsMissed = async (req, res) => {
    try {

        const { reminderTime } = req.body;

        if (!reminderTime) {
            return res.status(400).json({
                success: false,
                message: "Reminder time is required.",
            });
        }

        const result = await markAsMissed(
            req.user._id,
            req.params.id,
            reminderTime
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};
module.exports = {
    markMedicineAsTaken,
    markMedicineAsMissed,

};