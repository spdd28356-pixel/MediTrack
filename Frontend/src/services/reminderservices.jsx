import reminderSound from "../assets/sounds/Reminder_Sound.mp3";

const shownReminders = new Set();

export const startReminderService = (
    todayMedicines,
    openReminder
) => {

    if (typeof Notification !== "undefined") {
        Notification.requestPermission();
    }

    const intervalId = setInterval(() => {

        const now = new Date();

        const currentTime =
            now.getHours().toString().padStart(2, "0") +
            ":" +
            now.getMinutes().toString().padStart(2, "0");

        const dueMedicines = [];

        todayMedicines.forEach((medicine) => {

            if (medicine.status !== "Pending") return;

            if (medicine.reminderTime !== currentTime) return;

            const key =
                medicine.medicineId +
                medicine.reminderTime +
                now.toDateString();

            if (shownReminders.has(key)) return;

            dueMedicines.push(medicine);
            shownReminders.add(key);
        });

        if (!dueMedicines.length) return;

        const audio = typeof Audio !== "undefined" ? new Audio(reminderSound) : null;
        if (audio) {
            audio.play().catch(() => {});
        }

        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            const title = dueMedicines.length === 1 ? "Medicine Reminder" : "Multiple Medicine Reminders";
            const body = dueMedicines.length === 1
                ? `Time to take ${dueMedicines[0].medicineName}`
                : `You have ${dueMedicines.length} medicines due now.`;

            new Notification(title, { body });
        }

        openReminder(dueMedicines, audio);

    }, 30000);

    return intervalId;
};