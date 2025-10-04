import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import CardPage from "./pages/cardPage";
import FavTips from "./pages/favtips";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/sonner";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage";
import { useEffect } from "react";

function App() {
    const location = useLocation();

    useEffect(() => {
        document.body.classList.add("animating");
        const timeout = setTimeout(() => {
            document.body.classList.remove("animating");
        }, 1000);
        return () => clearTimeout(timeout);
    }, [location.pathname]);
    return (
        <>
            <Toaster position="bottom-right" richColors />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <AnimatedPage>
                                <Home />
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="/dashboard/:age/:gender/:goal"
                        element={
                            <AnimatedPage>
                                <Dashboard />
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="/card"
                        element={
                            <AnimatedPage>
                                <CardPage />
                            </AnimatedPage>
                        }
                    />
                    <Route
                        path="/fav"
                        element={
                            <AnimatedPage>
                                <FavTips />
                            </AnimatedPage>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
