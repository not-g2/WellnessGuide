// src/context/tipsContext.jsx
import React, { createContext, useState } from "react";

export const TipsContext = createContext();

export const TipsProvider = ({ children }) => {
    const [tips, setTips] = useState("");

    return <TipsContext.Provider value={{ tips, setTips }}>{children}</TipsContext.Provider>;
};
