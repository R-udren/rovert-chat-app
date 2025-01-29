<script lang="ts" setup>
definePageMeta({
  title: 'Profile',
  middleware: ['auth'],
});

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();
const toast = useToast();

const isLoading = ref(false);


// Reset password
async function resetPassword() {
  isLoading.value = true;
  
  const { error } = await supabase.auth.resetPasswordForEmail(
    user.value?.email as string,
    { redirectTo: `${useRuntimeConfig().public.baseUrl}/reset-password` }
  );

  isLoading.value = false;
  
  if (error) {
    toast.add({
      title: 'Password Reset Error',
      description: 'Failed to send reset email',
      color: 'error'
    });
    return;
  }

  toast.add({
    title: 'Password Reset',
    description: 'Success! Password reset email sent',
    color: 'success'
  });
}

async function signOut() {
  isLoading.value = true;
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to sign out',
      color: 'error'
    });
    return;
  }

  await router.push('/');
}

// Watch for auth changes
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    router.push('/');
  }
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Profile Settings</h1>
        <p class="text-zinc-600 dark:text-zinc-400">
          Manage your account settings and preferences
        </p>
      </div>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center space-x-4">
          <div>
            <h3 class="text-lg font-medium">ProfileName</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ user?.email }}</p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-between items-center">
          <UButton
            :loading="isLoading"
            color="error"
            label="Sign Out"
            variant="ghost"
            @click="signOut"
          />
          <UButton
            :loading="isLoading"
            color="warning"
            label="Reset Password"
            variant="ghost"
            @click="resetPassword"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>