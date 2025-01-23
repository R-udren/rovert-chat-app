<script setup lang="ts">
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
    <UInput v-model="email" type="email" placeholder="Email"/>
    <UInput v-model="password" type="password" placeholder="Password"/>
    <UButton label="Create Account" @click="signUp"/>
  </div>
</template>

<style scoped>
UInput, UButton {
  margin-bottom: 10px;
  gap: 1rem;
}

h1 {
  margin-bottom: 10px;
}
</style>