<script lang="ts" setup>
import { trackEvent } from "@aptabase/web";
import type { Database } from "~~/types/Database";

definePageMeta({
  title: "Profile",
  middleware: ["auth"],
});

const user = useSupabaseUser();
const supabase = useSupabaseClient<Database>();
const router = useRouter();
const toast = useToast();

const profile = ref({
  user_name: "",
  full_name: "",
  avatar_url: "",
});

const isEditing = ref(false);
const isLoading = ref(false);

// Load profile data
async function loadProfile() {
  if (!user.value?.id) return;

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.value.id)
    .single();

  if (error) {
    toast.add({
      title: "Error",
      description: `Failed to load profile. Error: ${error.message}`,
      color: "error",
    });
    return;
  }

  await trackEvent("profile", { action: "load" });

  if (data) profile.value = data;
}

// Update profile
async function updateProfile() {
  isLoading.value = true;

  const { error } = await supabase.from("profiles").upsert({
    id: user.value?.id,
    ...profile.value,
  });

  isLoading.value = false;

  if (error) {
    toast.add({
      title: "Error",
      description: "Failed to update profile",
      color: "error",
    });
    return;
  }

  await trackEvent("profile", { action: "update" });

  isEditing.value = false;
  toast.add({
    title: "Success",
    description: "Profile updated successfully",
    color: "success",
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

  await trackEvent("auth", { action: "reset-password" });

  if (error) {
    toast.add({
      title: "Password Reset Error",
      description: "Failed to send reset email",
      color: "error",
    });
    console.debug(error.message);
    return;
  }

  toast.add({
    title: "Password Reset",
    description: "Success! Password reset email sent",
    color: "success",
  });
}

async function signOut() {
  isLoading.value = true;

  const { error } = await supabase.auth.signOut();

  await trackEvent("auth", { action: "sign-out" });

  if (error) {
    toast.add({
      title: "Error",
      description: "Failed to sign out",
      color: "error",
    });
    return;
  }
}

// Watch for auth changes
supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_OUT") {
    router.push("/");
  }
});

// Initial load
onMounted(loadProfile);
</script>

<template>
  <div class="flex flex-col items-center justify-between p-6">
    <h1 class="text-3xl font-bold">Profile Settings</h1>
    <p class="text-zinc-600 dark:text-zinc-400 my-4">
      Manage your account settings and preferences
    </p>

    <UCard class="w-md">
      <template #header>
        <div class="flex items-center">
          <UAvatar
            class="mr-4 size-14"
            :alt="profile.user_name"
            :src="profile.avatar_url || ''"
          />
          <div>
            <h3 class="text-lg font-medium">
              {{ profile.full_name || "Not set" }}
            </h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              @{{ profile?.user_name }}
            </p>
          </div>
        </div>
      </template>

      <div class="">
        <div class="flex flex-row gap-4 mb-6">
          <UFormField class="w-full" label="Username" name="username">
            <UInput
              v-model="profile.user_name"
              :disabled="!isEditing"
              class="w-full"
            />
          </UFormField>

          <UFormField class="w-full" label="Full Name" name="full_name">
            <UInput
              v-model="profile.full_name"
              :disabled="!isEditing"
              class="w-full"
            />
          </UFormField>
        </div>
        <UFormField class="w-full" label="Avatar Url" name="avatar_url">
          <UInput
            v-model="profile.avatar_url"
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
            @click="isEditing ? updateProfile() : (isEditing = true)"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>
