import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [goal, setGoal] = useState("");

    return (
        <UserContext.Provider value={{ age, setAge, gender, setGender, goal, setGoal }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within a UserProvider");
    return ctx;
};
