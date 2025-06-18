import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, type CoreMessage } from 'ai';

import { GOOGLE_API_KEY } from '$env/static/private';

const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_API_KEY,
});

export async function titleGen(messages: CoreMessage[]) {

    try {
        const provider = google('gemini-2.0-flash');

        const result = streamText({
            model: provider,
            system: 'You are an assistant that generates short, descriptive titles for chat conversations. Summarize the conversation in under 24 letters. Do not include punctuation. Make the title clear and relevant.',
            messages,
        }
        );
        const idk = result.toDataStreamResponse() // doesnt work without this
        return await result.text
    } catch (error) {
        console.log("Error generating title: ", error)
    }
}
