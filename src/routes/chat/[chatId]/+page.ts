import type { CoreMessage, Message } from 'ai'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {

    const chatId = params?.chatId 
    const messageData = await fetch("/api/sync", {
        headers: { 'chatId': chatId }
    })
    const initialMessages = await messageData.json()

    if (initialMessages.message != "Chat not found") {    
        return { initialMessages };
    } else {
        return;
    }
}
