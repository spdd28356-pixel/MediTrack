const Medicine = require("../models/Medicine");
const MedicineLog = require("../models/MedicineLog");

const markAsTaken = async (userId, medicineId, reminderTime) => {

    // Check if medicine belongs to user
    const medicine = await Medicine.findOne({
        _id: medicineId,
        user: userId,
    });

    if (!medicine) {
        throw new Error("Medicine not found.");
    }

    // Validate reminder time
    if (!medicine.reminderTimes.includes(reminderTime)) {
        throw new Error("Invalid reminder time.");
    }

    const today = new Date().toISOString().split("T")[0];

    // Prevent duplicate logs
    const existingLog = await MedicineLog.findOne({
        user: userId,
        medicine: medicineId,
        date: today,
        reminderTime,
    });

    if (existingLog) {
        throw new Error("This dose has already been recorded.");
    }

    const log = await MedicineLog.create({
        user: userId,
        medicine: medicineId,
        date: today,
        reminderTime,
        status: "Taken",
        takenAt: new Date(),
    });

    return {
        success: true,
        message: "Medicine marked as taken.",
        log,
    };
};

const markAsMissed = async (userId, medicineId, reminderTime) => {

    // Check if medicine belongs to the user
    const medicine = await Medicine.findOne({
        _id: medicineId,
        user: userId,
    });

    if (!medicine) {
        throw new Error("Medicine not found.");
    }

    // Validate reminder time
    if (!medicine.reminderTimes.includes(reminderTime)) {
        throw new Error("Invalid reminder time.");
    }

    const today = new Date().toISOString().split("T")[0];

    // Prevent duplicate logs
    const existingLog = await MedicineLog.findOne({
        user: userId,
        medicine: medicineId,
        date: today,
        reminderTime,
    });

    if (existingLog) {
        throw new Error("This dose has already been recorded.");
    }

    const log = await MedicineLog.create({
        user: userId,
        medicine: medicineId,
        date: today,
        reminderTime,
        status: "Missed",
    });

    return {
        success: true,
        message: "Medicine marked as missed.",
        log,
    };
};


module.exports = {
    markAsTaken,
    markAsMissed,
    
};