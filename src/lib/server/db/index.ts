import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/chat-schema';
import { env } from '$env/dynamic/private';
import { eq, sql, and } from 'drizzle-orm';
import type { CoreMessage } from 'ai';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

export async function getChatById(chatId: string, userId: string) {
    try {
        const chat = await db
            .select()
            .from(schema.chats)
            .where(and(
                eq(schema.chats.chatid, chatId),
                eq(schema.chats.userid, userId)
            ))
            .limit(1);

        return (chat[0].data) || null; // Return first result or null if not found
    } catch (error) {
        if (error instanceof TypeError) {
            console.log("no chat data")
        } else {
            console.log("Error getting chat data:", error)
        }
    } finally {}
}

export async function saveChatsById(chatId: string, userId: string, AssistantMessage: string, UserMessage: string, title: string) {
    const userMessage: CoreMessage = {
        role: "user",
        content: UserMessage,
    }

    const assistantMessage: CoreMessage = {
        role: "assistant",
        content: AssistantMessage,
    }

    try {
    await db
        .insert(schema.chats)
        .values({
            chatid: chatId,
            data: [userMessage, assistantMessage],
            userid: userId,
            title: title,
        })
        .onConflictDoUpdate({
            target: [schema.chats.chatid, schema.chats.userid],
            set: {
                data: sql`coalesce(${schema.chats.data}, '[]'::jsonb) || ${JSON.stringify([userMessage, assistantMessage])}::jsonb`
            }
        });
    } catch (error) {
        console.error('Error saving to db:', error);
    }
}

export async function getChatIds(userId: string) {
    try {
        const chats = await db 
            .select()
            .from(schema.chats)
            .where(eq(schema.chats.userid, userId))

    return chats.map(chat => ({ chatid: chat.chatid, title: chat.title }));
    } catch (error) {
        console.log("Error getting chat history: ", error)
    }
}
