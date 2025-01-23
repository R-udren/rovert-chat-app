<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

client.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    router.push('/');
  }
});

async function signOut() {
  try {
    await client.auth.signOut();
    await router.push('/');
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <h1>Profile</h1>
  <p>Welcome to your profile page!</p>
  <div v-if="!user">
    <p>Loading...</p>
  </div>
  <div v-else>
    <p>Email: {{ user.email }}</p>
    <button @click="signOut">Sign Out</button>
  </div>

</template>

<style scoped>

</style>