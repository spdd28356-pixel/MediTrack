const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        medicineName: {
            type: String,
            required: true,
            trim: true,
        },

        dosage: {
            type: String,
            required: true,
        },


        reminderTimes: [
            {
                type: String,
                required: true,
            },
        ],

        mealTiming: {
            type: String,
            enum: ["Before Food", "After Food", "With Food"],
            default: "After Food",
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },

        notes: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Medicine", medicineSchema);