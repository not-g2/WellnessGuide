import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { goal } = req.body;

        if (!goal) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const ai = new GoogleGenAI({});
        const prompt = `
            You are an assistant that validates user goals for a wellness app.
        The user entered: "${goal}"

        Rules:
        - If the goal is a legitimate medical, fitness, or wellness goal (e.g., "Lose Weight", "Build Muscle", "Improve Flexibility"), return it exactly as written.
        - If the goal is unrelated, random, or nonsensical, return the string "INVALID".
        - Do not add explanations or other text.

        Output only one string.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return res.status(200).json({ response: response.text });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch tips" });
    }
}
