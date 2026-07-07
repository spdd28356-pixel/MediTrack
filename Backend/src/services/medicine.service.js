const Medicine = require("../models/Medicine");

const addMedicine = async (userId, medicineData) => {

    const medicine = await Medicine.create({
        ...medicineData,
        user: userId,
    });

    return {
        success: true,
        message: "Medicine added successfully.",
        medicine,
    };
};

const getMyMedicines = async (userId) => {

    const medicines = await Medicine.find({
        user: userId,
    }).select("-__v").sort({ createdAt: -1 });

    return {
        success: true,
        count: medicines.length,
        medicines,
    };
};

const getMedicineById = async (userId, medicineId) => {

    const medicine = await Medicine.findOne({
        _id: medicineId,
        user: userId,
    });

    if (!medicine) {
        throw new Error("Medicine not found.");
    }

    return {
        success: true,
        medicine,
    };
};
const updateMedicine = async (userId, medicineId, medicineData) => {

    const medicine = await Medicine.findOneAndUpdate(
        {
            _id: medicineId,
            user: userId,
        },
        medicineData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!medicine) {
        throw new Error("Medicine not found.");
    }

    return {
        success: true,
        message: "Medicine updated successfully.",
        medicine,
    };
};
const deleteMedicine = async (userId, medicineId) => {

    const medicine = await Medicine.findOneAndDelete({
        _id: medicineId,
        user: userId,
    });

    if (!medicine) {
        throw new Error("Medicine not found.");
    }

    return {
        success: true,
        message: "Medicine deleted successfully.",
    };
};


module.exports = {
    addMedicine,
    getMyMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
};