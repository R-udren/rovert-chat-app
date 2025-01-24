<script setup lang="ts">
definePageMeta({
  title: 'Profile',
  middleware: ['auth'],
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

const toast = useToast();

client.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    router.push('/');
  }
});

async function signOut() {
  try {
    await client.auth.signOut();
    await router.push('/');

    toast.add({
      title: 'Success',
      description: 'Signed out successfully',
      color: 'success',
      duration: 5000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      title: 'Error',
      description: 'An error occurred while signing out',
      color: 'error',
      duration: 5000,
    });
  }
}
</script>

<template>
  <h1>Profile</h1>
  <p>Welcome to your profile page!</p>
  <div v-if="user">
    <p>Email: {{ user.email }}</p>
    <UButton label="Sign Out" @click="signOut"/>
  </div>

</template>

<style scoped>

</style>