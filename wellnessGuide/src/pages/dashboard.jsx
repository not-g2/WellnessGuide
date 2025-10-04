import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [tips, setTips] = useState("");
    const fetchTips = async () => {
        try {
            const res = await fetch("/api/wellness", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    age,
                    gender,
                    goal,
                }),
            });

            const data = await res.json();
            try {
                let raw = data.tips;
                raw = raw
                    .replace(/^```json\s*/i, "")
                    .replace(/```$/i, "")
                    .trim();
                const parsed = JSON.parse(raw);
                setTips(parsed);
            } catch (err) {
                console.error("Error parsing JSON:", err);
                toast.error("Invalid response format");
            }

            setLoading(false);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        }
    };

    const { age, gender, goal } = useParams();
    useEffect(() => {
        fetchTips();
        console.log(tips);
    }, []);

    return (
        <div>
            {age}
            {goal}
            {gender}

            {loading && <div className="animate-pulse">Tips are being generated</div>}
            {Object.entries(tips).map(([title, description], index) => (
                <div key={index} className="p-4 border rounded-lg shadow">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-gray-700">{description}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
