import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server'
import {Database} from "~~/types/Database";


export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        return {"status": "error", "message": "not authorized"}
    }

    const body = await readBody(event)

    const client = await serverSupabaseClient<Database>(event)
    return await client
        .from('profiles')
        .insert({
            id: user.id,
            user_name: body.user_name,
            full_name: body.full_name,
            avatar_url: body.avatar_url
        })
})