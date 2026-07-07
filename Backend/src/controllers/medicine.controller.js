const { addMedicine, getMyMedicines, getMedicineById, updateMedicine, deleteMedicine } = require("../services/medicine.service");


const createMedicine = async (req, res) => {
    try {

        const result = await addMedicine(req.user._id, req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const getMedicines = async (req, res) => {
    try {
                console.log("Controller reached");

        const result = await getMyMedicines(req.user._id);

                console.log("Service completed");


        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getMedicine = async (req, res) => {
    try {

        const result = await getMedicineById(
            req.user._id,
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};
const updateMedicineController = async (req, res) => {
    try {

        const result = await updateMedicine(
            req.user._id,
            req.params.id,
            req.body
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};

const deleteMedicineController = async (req, res) => {
    try {

        const result = await deleteMedicine(
            req.user._id,
            req.params.id
        );

        res.status(200).json(result);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};
module.exports = {
    createMedicine,
    getMedicines,
    getMedicine,
    updateMedicineController,
    deleteMedicineController
};