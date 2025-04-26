import dotenv from "dotenv"
import axios from "axios"

dotenv.config();

export async function Gemma(prompt) {
    try {
        const output = await axios.post('http://localhost:11434/api/generate', {
            model: 'gemma3:1b-it-qat',
            prompt: `${prompt}`,
            stream: false,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return output.data.response;
    } catch (error) {
        return `Error communicating with Gemma: ${error.message}`;
    }
}



