import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("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");

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