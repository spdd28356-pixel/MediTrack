const Medicine = require("../models/Medicine");
const MedicineLog = require("../models/MedicineLog");

// Dashboard Summary
const getDashboardSummary = async (userId) => {

    const today = new Date();

    const medicines = await Medicine.find({
        user: userId,
        isCompleted: false,
        startDate: { $lte: today },
        endDate: { $gte: today },
    });

    let total = 0;

    medicines.forEach((medicine) => {
        total += medicine.reminderTimes.length;
    });

    const todayString = new Date().toISOString().split("T")[0];

    const logs = await MedicineLog.find({
        user: userId,
        date: todayString,
    });

    const taken = logs.filter(log => log.status === "Taken").length;
    const missed = logs.filter(log => log.status === "Missed").length;

    const pending = total - taken - missed;

    let completionRate = 0;

    if (total > 0) {
        completionRate = Number(((taken / total) * 100).toFixed(1));
    }

    return {
        success: true,
        summary: {
            total,
            taken,
            missed,
            pending,
            completionRate,
        },
    };
};


// Today's Medicines
const getTodayMedicines = async (userId) => {

    const today = new Date();

    const medicines = await Medicine.find({
        user: userId,
        isCompleted: false,
        startDate: { $lte: today },
        endDate: { $gte: today },
    });

    const todayString = new Date().toISOString().split("T")[0];

    const logs = await MedicineLog.find({
        user: userId,
        date: todayString,
    });

    const todayMedicines = [];

    for (const medicine of medicines) {

        for (const reminderTime of medicine.reminderTimes) {

            const log = logs.find(
                (log) =>
                    log.medicine.toString() === medicine._id.toString() &&
                    log.reminderTime === reminderTime
            );

            todayMedicines.push({
                medicineId: medicine._id,
                medicineName: medicine.medicineName,
                dosage: medicine.dosage,
                reminderTime,
                mealTiming: medicine.mealTiming,
                notes: medicine.notes,
                status: log ? log.status : "Pending",
            });

        }

    }

    todayMedicines.sort((a, b) =>
        a.reminderTime.localeCompare(b.reminderTime)
    );

    return {
        success: true,
        todayMedicines,
    };
};

const getMedicineHistory = async (userId) => {

    const logs = await MedicineLog.find({
        user: userId,
    })
    .populate("medicine", "medicineName dosage mealTiming")
    .sort({
        date: -1,
        reminderTime: 1,
    });

    const history = logs.map((log) => ({
    logId: log._id,
    medicineName: log.medicine?.medicineName || "Medicine Deleted",
    dosage: log.medicine?.dosage || "-",
    mealTiming: log.medicine?.mealTiming || "-",
    date: log.date,
    reminderTime: log.reminderTime,
    status: log.status,
    }));

    return {
        success: true,
        count: history.length,
        history,
    };
};

module.exports = {
    getDashboardSummary,
    getTodayMedicines,
    getMedicineHistory,

};