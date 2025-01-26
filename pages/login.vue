<script lang="ts" setup>
const state = reactive({
  email: '',
  password: ''
});


const router = useRouter();

const toast = useToast();

const client = useSupabaseClient();

async function loginAccount() {
  try {
    console.log('Logging in...');
    const {error: loginError} = await client.auth.signInWithPassword({
      email: state.email,
      password: state.password
    });

    if (loginError) {
      toast.add({
        title: 'Error',
        description: loginError.message,
        color: 'error',
        icon: 'i-lucide-circle-alert'

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

async function validate(data: Partial<typeof state>) {
  if (!data.email) {
    return [{name: 'email', message: 'Email is required'}];
  }

  if (!data.password) {
    return [{name: 'password', message: 'Password is required'}];
  }

  return [];
}
</script>

<template>
    <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 via-blue-400 to-cyan-500">
      Login
    </h1>
    <UForm :state="state" :validate="validate" class="space-y-4 flex flex-col items-center" @submit="loginAccount">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" placeholder="email" type="email"/>
      </UFormField>
      <UFormField label="Password" name="password">
        <UInput v-model="state.password" placeholder="strong-password" type="password"/>
      </UFormField>
      <UButton class="px-4" label="Login" loading-auto type="submit"/>
    </UForm>
</template>