import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv"

dotenv.config();

const client = new InferenceClient(process.env.HUGGINGFACE_API);

const chatCompletion = await client.chatCompletion({
    provider: "nebius",
    model: "deepseek-ai/DeepSeek-V3-0324",
    messages: [
        {
            role: "user",
            content: "Who is Elon Musk",
        },
    ],
    max_tokens: 30,
});

console.log(chatCompletion.choices[0].message.content);