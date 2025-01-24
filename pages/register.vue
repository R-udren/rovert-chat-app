<script setup lang="ts">
const email = ref('');
const password = ref('');

const toast = useToast();

const client = useSupabaseClient();

async function signUp() {
  try {
    const {error: signUpError} = await client.auth.signUp({
      email: email.value,
      password: password.value
    });

    if (signUpError) {
      toast.add({
        color: 'error',
        title: 'Error',
        description: signUpError.message
      });
    } else {
      toast.add({
        color: 'success',
        title: 'Success',
        description: 'Account created successfully'
      });
    }
  } catch (error: any) {
    toast.add({
      color: 'error',
      title: 'Error',
      description: (error as Error).message
    });
  }
}

async function loginWithGithub() {
  try {
    const {error: githubError} = await client.auth.signInWithOauth({
      provider: 'github',
    });

    if (githubError) {
      toast.add({
        color: 'error',
        title: 'Error',
        description: githubError.message
      });
    } else {
      toast.add({
        color: 'success',
        title: 'Success',
        description: 'Logged in with Github successfully'
      });
    }
  } catch (error: any) {
    toast.add({
      color: 'error',
      title: 'Error',
      description: (error as Error).message
    });
  }
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <UInput v-model="email" type="email" placeholder="Email"/>
    <UInput v-model="password" type="password" placeholder="Password"/>
    <UButton label="Create Account" @click="signUp"/>
    <UButton label="Login with github" @click="loginWithGithub"/>
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