import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import CardPage from "./pages/cardPage";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";
function App() {
    return (
        <>
            <Toaster position="bottom-right" richColors />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Dashboard/:age/:gender/:goal" element={<Dashboard />} />
                    <Route path="/card" element={<CardPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
