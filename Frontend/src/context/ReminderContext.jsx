import { createContext, useContext, useState } from "react";

const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {

    const [showReminder, setShowReminder] = useState(false);
    const [currentReminders, setCurrentReminders] = useState([]);
    const [reminderAudio, setReminderAudio] = useState(null);
    const [reminderActionHandler, setReminderActionHandler] = useState(null);

    const stopReminderAudio = () => {
        if (reminderAudio) {
            reminderAudio.pause();
            reminderAudio.currentTime = 0;
            setReminderAudio(null);
        }
    };

    const openReminder = (medicines, audio) => {
        const reminderList = Array.isArray(medicines) ? medicines : [medicines];
        setCurrentReminders(reminderList);
        if (audio) setReminderAudio(audio);
        setShowReminder(true);
    };

    const closeReminder = () => {
        stopReminderAudio();
        setCurrentReminders([]);
        setShowReminder(false);
    };

    const acknowledgeReminder = (medicine) => {
        setCurrentReminders((prev) =>
            prev.filter(
                (item) =>
                    item.medicineId !== medicine.medicineId ||
                    item.reminderTime !== medicine.reminderTime
            )
        );
    };

    const registerReminderActionHandler = (handler) => {
        setReminderActionHandler(() => handler);
    };

    return (
        <ReminderContext.Provider
            value={{
                showReminder,
                currentReminders,
                openReminder,
                closeReminder,
                acknowledgeReminder,
                reminderActionHandler,
                registerReminderActionHandler,
            }}
        >
            {children}
        </ReminderContext.Provider>
    );
};

export const useReminder = () => useContext(ReminderContext);