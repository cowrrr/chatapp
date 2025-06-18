import { getChatIds } from "$lib/server/db";
import { error } from '@sveltejs/kit'
import { auth } from "$lib";

export async function GET({ request }: any) { 
    let session = await auth.api.getSession({
        headers: request.headers
    })
    const userId: string = session?.user.id || "";

    let chats;
    try {
         chats = await getChatIds(userId)
    } catch (error) {
        console.log("error")
    }
    if (chats) {
        return new Response (JSON.stringify(chats)) 
    } else {
        throw error(400, 'Chat not found')
    }
}
