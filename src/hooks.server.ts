import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
 
export async function handle({ event, resolve }: any) {
    return svelteKitHandler({ event, resolve, auth });
}
