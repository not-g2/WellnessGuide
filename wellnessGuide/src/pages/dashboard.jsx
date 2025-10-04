import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import TipsCard from "../components/tipsCard";
import { Button } from "@/components/ui/button";
import { TipsContext } from "@/context/tipsContext";

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const { tips, setTips } = useContext(TipsContext);
    const { age, gender, goal } = useParams();
    const navigate = useNavigate();

    const fetchTips = async (force = false) => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch("/api/wellness", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ age, gender, goal }),
            });

            const data = await res.json();
            let raw = data.tips;

            try {
                raw = raw
                    .replace(/^```json\s*/i, "")
                    .replace(/```$/i, "")
                    .trim();
                const parsed = JSON.parse(raw);
                setTips(parsed);
                toast.success(force ? "Tips regenerated!" : "Tips loaded!");
            } catch (err) {
                console.error("Error parsing JSON:", err);
                toast.error("Invalid response format");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!tips) fetchTips();
    }, []);

    return (
        <div className="p-4 bg-[#FFF2E6] min-h-screen text-[#3A0E2B]">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Personalized Wellness Tips</h1>
                <Button
                    onClick={() => fetchTips(true)}
                    disabled={loading}
                    className="bg-[#FF4052] text-white hover:bg-[#d93645]"
                >
                    {loading ? "Regenerating..." : "Regenerate Tips"}
                </Button>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-t-[#FF4052] border-[#ffd6db] animate-spin"></div>
                    </div>

                    <div className="text-lg font-medium text-[#3A0E2B] animate-pulse">
                        Generating personalized wellness tips...
                    </div>

                    <p className="text-sm text-gray-500 animate-fade-in">Balancing your energy ✨ Please wait...</p>
                </div>
            )}

            {!loading && tips && (
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

            <div className="flex justify-between items-center mb-6">
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#FF4052] hover:bg-[#e63946] text-white px-6 py-2 rounded-lg shadow-md transition"
                    >
                        Go Back
                    </button>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate("/fav")}
                        className="bg-[#FF4052] hover:bg-[#e63946] text-white px-6 py-2 rounded-lg shadow-md transition"
                    >
                        Go to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
