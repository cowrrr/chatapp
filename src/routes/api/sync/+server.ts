import { getChatById } from "$lib/server/db";
import { error } from '@sveltejs/kit'
import { auth } from "$lib";

export async function GET({ request }: any) { 
    const session = await auth.api.getSession({
        headers: request.headers
    })
    const userId: string = session?.user.id || "";
    const chatIdHeader = request.headers.get('chatId');
    let chatId: string;

    if (chatIdHeader) {
        chatId = chatIdHeader
    } else {
        console.log('no chatId found')
        throw new Error()
    }

    let chats;
    try {
         chats = await getChatById(chatId, userId)
    } catch (error) {
        console.log("error")
    }
    if (chats) {
        return new Response(JSON.stringify(chats));
    } else {
        throw error(400, 'Chat not found')
    }
}
