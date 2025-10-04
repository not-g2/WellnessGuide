import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { age, gender, goal } = req.body;

        if (!age || !gender || !goal) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const ai = new GoogleGenAI({});
        const prompt = `
            You are a wellness coach.

        User Information:
        - Age: ${age} years old
        - Gender: ${gender}
        - Goal: "${goal}"

        Instructions:
        1. Provide exactly 5 practical tips for achieving the user's goal.
        2. The tips should be mutually exclusive whenever possible.
        3. Do NOT include introductions or explanations—just the tips in JSON format.
        4. Format the output as valid JSON, where each tip has:
        - The title as the key.
        - The value is an object containing:
            a) description: Write a detailed explanation (~200 words) of how and when to apply this tip. Include practical guidance 
            and use bullet points to emphasize the most important steps or recommendations.
            b) effectivenessScore: A number from 1 to 10 indicating the impact of this tip for achieving the goal.
            c) costScore: A number from 1 to 10 indicating how inexpensive or costly it is to follow.
            d) timeScore: A number from 1 to 10 indicating whether it takes a short or long time to implement.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return res.status(200).json({ tips: response.text });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch tips" });
    }
}
