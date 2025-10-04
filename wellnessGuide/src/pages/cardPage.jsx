import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CardPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, description, effectScore, costScore, timeScore } = location.state || {};

    if (!title) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF2E6] text-[#3A0E2B]">
                <p className="text-lg">No tip data found.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-[#FF4052] text-white px-4 py-2 rounded-lg shadow hover:bg-[#e63946] transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const getBadgeColor = (score) => {
        if (score >= 8) return "bg-green-500";
        if (score >= 5) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="min-h-screen bg-[#FFF2E6] flex items-center justify-center p-6">
            <Card className="max-w-2xl w-full shadow-2xl rounded-2xl bg-[#3A0E2B] text-white">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-[#FFB6C1]">{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="prose prose-sm text-gray-200">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                        <div className="p-3 bg-[#4a1b35] rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Effectiveness</p>
                            <span className={`px-3 py-1 rounded-lg text-white ${getBadgeColor(effectScore)}`}>
                                {effectScore}/10
                            </span>
                        </div>

                        <div className="p-3 bg-[#4a1b35] rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Cost</p>
                            <span className={`px-3 py-1 rounded-lg text-white ${getBadgeColor(10 - costScore)}`}>
                                {costScore}/10
                            </span>
                        </div>

                        <div className="p-3 bg-[#4a1b35] rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Time</p>
                            <span className={`px-3 py-1 rounded-lg text-white ${getBadgeColor(10 - timeScore)}`}>
                                {timeScore}/10
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-[#FF4052] hover:bg-[#e63946] text-white px-6 py-2 rounded-lg shadow-md transition"
                        >
                            Back to Tips
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CardPage;
