import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema/auth-schema"
import { GITHUB_CLIENT_ID } from "$env/static/private";
import { GITHUB_CLIENT_SECRET } from "$env/static/private";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema
        }
    }),
    plugins: [
        anonymous({
            onLinkAccount: async ({ anonymousUser, newUser }) => {}
        })
    ],

    socialProviders: { 
        github: { 
            clientId: GITHUB_CLIENT_ID as string, 
            clientSecret: GITHUB_CLIENT_SECRET as string, 
        }, 
    }, 
});
