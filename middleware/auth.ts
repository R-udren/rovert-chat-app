export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()

    const toast = useToast()

    if (!user.value) {
        navigateTo('/login')
        toast.add({
            title: 'Unauthorized',
            description: 'You must be logged in to access this page',
            color: 'error',
            duration: 5000,
        })
        return false
    }

    return true
})
