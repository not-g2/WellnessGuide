import React from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
    const { age, gender, goal } = useParams();

    return (
        <div>
            {age}
            {goal}
            {gender}
        </div>
    );
};

export default Dashboard;
