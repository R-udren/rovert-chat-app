<script lang="ts" setup>
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
      color: 'error',
      icon: 'i-lucide-error'
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
        color: 'error',
        icon: 'i-lucide-error'

      });
    } else {
      toast.add({
        title: 'Success',
        description: 'Logged in successfully',
        color: 'success'
      });
      await router.push('/');
    }
  } catch (error: any) {
    toast.add({
      title: 'Unknown Error',
      description: error.message,
      color: 'error'
    });
  }
}
</script>

<template>
  <h1>Login</h1>
  <UInput v-model="email" label="Email" placeholder="Email" required type="email"/>
  <UInput v-model="password" label="Password" placeholder="Password" required type="password"/>
  <UButton loading-auto @click="loginAccount">Login</UButton>
</template>