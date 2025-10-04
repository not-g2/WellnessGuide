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
      The user is ${age} years old, identifies as ${gender}, and their goal is "${goal}".
      Give 5 detailed and practical tips that are mutually exclusive if possible. Dont add any introductions. 
      Just the tips in a valid JSON format with a title as key and description as value.
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        //console.log(response.text);

        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // const result = await model.generateContent(prompt);

        return res.status(200).json({ tips: response.text });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch tips" });
    }
}
