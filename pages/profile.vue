<script lang="ts" setup>
import type {Database} from "~~/types/Database";

definePageMeta({
  title: 'Profile',
  middleware: ['auth'],
});

const user = useSupabaseUser();
const supabase = useSupabaseClient<Database>();
const router = useRouter();
const toast = useToast();

const profile = ref({
  user_name: '',
  full_name: '',
  avatar_url: ''
});

const isEditing = ref(false);
const isLoading = ref(false);

// Load profile data
async function loadProfile() {
  if (!user.value?.id) return;

  const {data, error} = await supabase
      .from('profiles')
      .select()
      .eq('id', user.value.id)
      .single();

  if (error) {
    toast.add({
      title: 'Error',
      description: `Failed to load profile. Error: ${error.message}`,
      color: 'error'
    });
    return;
  }

  if (data) profile.value = data;
}

// Update profile
async function updateProfile() {
  isLoading.value = true;

  const {error} = await supabase
      .from('profiles')
      .upsert({
        id: user.value?.id,
        ...profile.value
      });

  isLoading.value = false;

  if (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update profile',
      color: 'error'
    });
    return;
  }

  isEditing.value = false;
  toast.add({
    title: 'Success',
    description: 'Profile updated successfully',
    color: 'success'
  });
}

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
    console.debug(error.message)
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

}

// Watch for auth changes
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    router.push('/');
  }
});

// Initial load
onMounted(loadProfile);
</script>

<template>
  <div class="w-1xl mx-auto p-6 space-y-8">
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
          <UAvatar
              :alt="profile.user_name"
              :src="profile.avatar_url || ''"
              size="3xl"
          />
          <div>
            <h3 class="text-lg font-medium">{{ profile.full_name || 'Not set' }}</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ user?.email }}</p>
          </div>
        </div>
      </template>

      <div class="space-y-6">
        <UFormField class="w-full" label="Username" name="username">
          <UInput v-model="profile.user_name"
                  :disabled="!isEditing"
                  class="w-full"
          />
        </UFormField>

        <UFormField class="w-full" label="Full Name" name="full_name">
          <UInput v-model="profile.full_name"
                  :disabled="!isEditing"
                  class="w-full"
          />
        </UFormField>

        <UFormField class="w-full" label="Avatar Url" name="avatar_url">
          <UInput v-model="profile.avatar_url"
                  :disabled="!isEditing"
                  class="w-full"
          />
        </UFormField>
      </div>

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
          <UButton
              :label="isEditing ? 'Save Changes' : 'Edit Profile'"
              :loading="isLoading"
              :variant="isEditing ? 'solid' : 'ghost'"
              color="primary"
              @click="isEditing ? updateProfile() : isEditing = true"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>