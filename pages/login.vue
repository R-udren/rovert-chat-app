<script setup lang="ts">
const email = ref('');
const password = ref('');

const router = useRouter();

const toast = useToast();

const client = useSupabaseClient();

async function loginAccount() {
  if (!email.value || !password.value) {
    toast.add({
      title: 'Error',
      description: 'Please fill in all fields',
    });
    console.log('Please fill in all fields');
    return;
  }

  try {
    console.log('Logging in...');
    const {error: loginError} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (loginError) {
      toast.add({
        title: 'Error',
        description: loginError.message,
      });
    } else {
      toast.add({
        title: 'Success',
        description: 'Logged in successfully',
      });
      await router.push('/');
    }
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.message,
    });
  }
}
</script>

<template>
  <h1>Login</h1>
  <UInput label="Email" v-model="email" type="email" placeholder="Email" required/>
  <UInput label="Password" v-model="password" type="password" placeholder="Password" required/>
  <UButton @click="loginAccount">Login</UButton>
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