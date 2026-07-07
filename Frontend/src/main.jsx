import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { ReminderProvider } from "./context/ReminderContext";
import ReminderModal from "./Components/ReminderModal/ReminderModal.jsx";

createRoot(document.getElementById("root")).render(
<ReminderProvider>
    <App />
    <ReminderModal/>
    
</ReminderProvider>
);

