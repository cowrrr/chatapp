import { redirect } from "@sveltejs/kit";

export function load() {
    const id = crypto.randomUUID()
    throw redirect(308, `/chat/${id}`)
}
