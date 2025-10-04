import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext";
import { TipsProvider } from "./context/tipsContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <TipsProvider>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </TipsProvider>
);
