import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const getBadgeColor = (score) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-red-500";
};

const TipsCard = ({ title, description, effectScore, timeScore, costScore }) => {
    return (
        <div className="w-full max-w-xs m-2 group">
            <div className="relative w-full h-52 card group-hover:rotate-y-180">
                <Card className="card-front absolute w-full h-full flex items-center justify-center bg-[#FF4052] text-white">
                    <CardContent className="text-center">
                        <CardTitle className="mb-2">{title}</CardTitle>

                        <div className="flex justify-center gap-4 mt-2 flex-col items-center">
                            <div className="flex items-center gap-1">
                                <img src="/productivity.png" alt="Effectiveness" className="w-9 h-9 " />
                                <span className={`px-2 py-0.5 rounded text-white ${getBadgeColor(effectScore)}`}>
                                    {effectScore}/10
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <img src="/clock.png" alt="Time" className="w-9 h-9" />
                                <span className={`px-2 py-0.5 rounded text-white ${getBadgeColor(10 - timeScore)}`}>
                                    {timeScore}/10
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <img src="/save-money.png" alt="Cost" className="w-9 h-9" />
                                <span className={`px-2 py-0.5 rounded text-white ${getBadgeColor(10 - costScore)}`}>
                                    {costScore}/10
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="card-back absolute w-full h-full flex flex-col justify-between bg-[#3A0E2B] text-white p-4">
                    <CardContent className="flex-1 text-center text-sm overflow-auto">
                        <p className="line-clamp-4">{description}</p>
                    </CardContent>

                    <div className="mt-2 space-y-1 text-xs text-center opacity-90">
                        <p>Effectiveness: {effectScore}/10</p>
                        <p>Time: {timeScore}/10</p>
                        <p>Cost: {costScore}/10</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TipsCard;
