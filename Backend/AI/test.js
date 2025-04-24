import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv"
import { response } from "express";

dotenv.config();

const client = new InferenceClient(process.env.HUGGINGFACE_API);

export async function DeepSeek(prompt) {
    const chatCompletion = await client.chatCompletion({
        provider: "nebius",
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [
            {
                role: "user",
                content: `${prompt}`,
            },
        ],
        max_tokens: 50,
    });
    return chatCompletion.choices[0].message.content.replace(/[^a-zA-Z0-9 ]/g, '');
}

export function GPT(prompt) {
    async function query(data) {
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/openai-community/gpt2",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    let answer = "";
    query({inputs: prompt}).then((response) => {
        answer = JSON.stringify(response);
    });
    return answer;
}


