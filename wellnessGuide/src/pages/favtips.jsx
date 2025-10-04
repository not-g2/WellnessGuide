import React, { useEffect, useState } from "react";
import TipsCard from "@/components/tipsCard";
import { useNavigate } from "react-router-dom";

const FavTips = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favoriteTips") || "[]");
        setFavorites(saved);
    }, []);

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 p-4">
                <img src="/broken-heart.png" alt="No favorites" className="w-32 h-32" />
                <p className="text-lg mb-2">You haven't saved any favorite tips yet.</p>
                <p className="mb-4 text-center">
                    Browse the wellness tips and mark the ones you like to save them here for quick access later.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-[#FF4052] text-white px-6 py-2 rounded-lg shadow hover:bg-[#e63946] transition"
                >
                    Explore Tips
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-[#FFF2E6] text-[#3A0E2B]">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Favorite Tips</h2>

            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-items-center">
                {favorites.map((tip, i) => (
                    <TipsCard key={i} {...tip} className="w-full max-w-sm" />
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-[#FF4052] hover:bg-[#e63946] text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default FavTips;
