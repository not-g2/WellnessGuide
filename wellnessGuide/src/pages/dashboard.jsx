import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import TipsCard from "../components/tipsCard";

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
                console.log(parsed);
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
        if (!tips) {
            fetchTips();
        }
    }, []);

    return (
        <div className="p-4 bg-[#FFF2E6] min-h-screen text-[#3A0E2B]">
            {loading && <div className="animate-pulse text-center text-gray-600">Tips are being generated...</div>}

            {!loading && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 justify-items-center">
                    {Object.entries(tips).map(([title, tipData], i) => (
                        <TipsCard
                            key={i}
                            title={title}
                            description={tipData.description}
                            effectScore={tipData.effectivenessScore}
                            costScore={tipData.costScore}
                            timeScore={tipData.timeScore}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
