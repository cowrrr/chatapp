import type { CoreMessage } from "ai";
import { jsonb, text, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const chats = pgTable("chats", {
    chatid: text("chat_id").notNull(),
    data: jsonb().$type<CoreMessage[]>(),
    title: text("title"),
    userid: text("user_id").notNull(),
}, (table) => (
    [primaryKey({ columns: [table.chatid, table.userid] })]
))
