<script lang="ts" setup>
const state = reactive({
  email: '',
  password: ''
});

const toast = useToast();

const client = useSupabaseClient();

async function signUp() {
  try {
    const {error: signUpError} = await client.auth.signUp({
      email: state.email,
      password: state.password
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
      title: 'Unknown Error',
      description: (error as Error).message
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
    <h1>Register</h1>
  <UForm :state="state" :validate="validate" @submit="signUp">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" placeholder="Email" type="email"/>
    </UFormField>
    <UFormField label="Password" name="password">
      <UInput v-model="state.password" placeholder="Password" type="password"/>
    </UFormField>
    <UButton label="Create Account" loading-auto type="submit"/>
  </UForm>
</template>