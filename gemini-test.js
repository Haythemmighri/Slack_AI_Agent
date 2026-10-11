
import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    temperature: 0.3,
    apiKey: process.env.GOOGLE_API_KEY
});

try {
    const response = await model.invoke(
        "Return JSON with an insights array containing two example insights and a recommendations array containing two example recommendations."
    );

    console.log("Gemini response:");
    console.log(response.content);
} catch (error) {
    console.error("Gemini test failed:", error.message);
} 
