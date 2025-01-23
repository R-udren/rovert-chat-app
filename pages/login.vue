<script setup lang="ts">
const email = ref('');
const password = ref('');
const router = useRouter();

const client = useSupabaseClient();

async function login() {
  try {
    const {error: loginError} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (loginError) {
      throw new Error(loginError.message);
    }

    await router.push('/');
  } catch (error: any) {
    console.error(error);
  }
}
</script>

<template>
  <h1>Login</h1>
  <form>
    <label for="email">Email</label>
    <input type="email" id="email" name="email"/>
    <label for="password">Password</label>
    <input type="password" id="password" name="password"/>
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 5px;
}

button {
  padding: 5px;
}

h1 {
  margin-bottom: 10px;
}
</style>