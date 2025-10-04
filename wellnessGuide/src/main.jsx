import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext";
import { TipsProvider } from "./context/tipsContext";

createRoot(document.getElementById("root")).render(
    <TipsProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </TipsProvider>
);
