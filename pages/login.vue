<script setup lang="ts">
const email = ref('');
const password = ref('');

const router = useRouter();

const errorMessage = ref('');
const successMessage = ref('');

const client = useSupabaseClient();

async function login() {
  errorMessage.value = '';
  successMessage.value = '';
  try {
    const {error: loginError} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (loginError) {
      errorMessage.value = loginError.message;
    } else {
      successMessage.value = 'Logged in successfully.';
      await router.push('/');
    }
  } catch (error: any) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <label for="email">Email</label>
    <input v-model="email" type="email" id="email" name="email" required/>
    <label for="password">Password</label>
    <input v-model="password" type="password" id="password" name="password" required/>
    <button type="submit">Login</button>
  </form>
  <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  <p class="success" v-if="successMessage">{{ successMessage }}</p>
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

.error {
  color: red;
}

.success {
  color: green;
}
</style>