import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

import { GOOGLE_API_KEY } from '$env/static/private';
import { saveChatsById } from '$lib/server/db';
import { auth } from '$lib';
import { titleGen } from './titleGen';

const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_API_KEY,
});

export async function POST({ request }: any) {
    const session = await auth.api.getSession({
        headers: request.headers
    })
    const userId: string = session?.user.id || "";

    const { messages, model } = await request.json();


    let provider;

    if (model.startsWith('gemini-')) {
        provider = google(model);
    } //else if (model.startsWith('GPT-')) {
    //provider = openAI(model);
    //}
    else {
        // Default fallback
        provider = google('gemini-2.5-flash-preview-04-17');
    }

    const referer = request.headers.get('referer');
    let chatId: string;

    if (referer) {
        const refererUrl = new URL(referer);
        chatId = refererUrl.pathname.split('/')[2]
    } else {
        console.log('no chatId found')
        return null;
    }

    try {
        const result = streamText({
            model: provider,
            system: 'Please format your responses using GitHub Flavored Markdown (GFM). Use code blocks with language specifiers for code examples, and use other markdown formatting like **bold**, *italic*, headers, and lists where appropriate.',
            messages,
            onFinish: async () => {
                if (session?.user.id != null) {
                    const lastUserMessage = messages[messages.length - 1]
                    let aiMessage = await result.text
                    let userMessage = lastUserMessage?.content || '';
                    let title = "";
                    try {
                        title = await titleGen(messages)
                    } catch (error) {
                        console.log("Error generating title ", error)
                    }
                    try {
                        await saveChatsById(chatId, userId, aiMessage, userMessage, title)
                    } catch (error) {
                        console.log("Error saving chat: ", error)
                    }
                }
            }
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log("Error generating data stream", error)
        return error
    }
}
