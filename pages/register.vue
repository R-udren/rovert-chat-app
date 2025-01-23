<script setup lang="ts">
import {useSupabaseClient} from "#imports";

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const client = useSupabaseClient();

async function signUp() {
  errorMessage.value = '';
  successMessage.value = '';
  try {
    const {error: signUpError} = await client.auth.signUp({
      email: email.value,
      password: password.value
    });

    if (signUpError) {
      errorMessage.value = signUpError.message;
    } else {
      successMessage.value = 'Seems like you have successfully signed up. Please check your email for verification.';
    }
  } catch (error: any) {
    errorMessage.value = (error as Error).message;
  }
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <input v-model="email" type="email" placeholder="Email"/>
    <input v-model="password" type="password" placeholder="Password"/>
    <button @click="signUp">Sign Up</button>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="success" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
}

button {
  display: block;
  margin-top: 10px;
}

p {
  margin-top: 10px;
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