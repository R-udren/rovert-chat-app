<script lang="ts" setup>
const state = reactive({
  email: '',
  password: '',
  isLogin: true
});

const router = useRouter();
const toast = useToast();
const client = useSupabaseClient();

async function handleSubmit() {
  // Prevent form submission if validation fails
  const errors = await validate(state);
  if (errors.length > 0) return;

  try {
    const response = state.isLogin
        ? await client.auth.signInWithPassword({
          email: state.email,
          password: state.password
        })
        : await client.auth.signUp({
          email: state.email,
          password: state.password
        });

    const {error} = response;

    if (error) {
      toast.add({
        color: 'error',
        title: 'Error',
        description: error.message,
        icon: 'i-lucide-circle-alert'
      });
      return;
    }

    toast.add({
      color: 'success',
      title: 'Success',
      description: state.isLogin
          ? 'Logged in successfully'
          : 'Account created successfully'
    });

    if (state.isLogin) {
      await router.push('/');
    }
  } catch (error: any) {
    toast.add({
      color: 'error',
      title: 'Unknown Error',
      description: error.message
    });
  }
}

async function validate(data: Partial<typeof state>) {
  const errors = [];
  
  if (!data.email) {
    errors.push({name: 'email', message: 'Email is required'});
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push({name: 'email', message: 'Invalid email format'});
  }

  if (!data.password) {
    errors.push({name: 'password', message: 'Password is required'});
  } else if (data.password.length < 8) {
    errors.push({name: 'password', message: 'Password must be at least 8 characters'});
  }

  return errors;
}
</script>

<template>
  <div class="max-w-md mx-auto p-4 space-y-6">
    <h1 class="text-2xl font-bold bg-gradient-to-tr bg-clip-text text-transparent from-blue-500 via-blue-400 to-cyan-500 mb-6 py-1">
      {{ state.isLogin ? 'Login' : 'Register' }}
    </h1>
    <UForm
        :state="state"
        :validate="validate"
        class="space-y-4 flex flex-col w-full"
        @submit="handleSubmit"
    >
      <UFormField label="Email" name="email">
        <UInput
            v-model="state.email"
            placeholder="you@example.com"
            type="email"
        />
      </UFormField>
      <UFormField label="Password" name="password">
        <UInput
            v-model="state.password"
            placeholder="Strong password"
            type="password"
        />
      </UFormField>
      <div class="flex space-x-4">
        <UButton
            :label="state.isLogin ? 'Switch to Register' : 'Switch to Login'"
            block
            color="secondary"
            type="button"
            variant="link"
            @click="state.isLogin = !state.isLogin"
        />
        <UButton
            :label="state.isLogin ? 'Login' : 'Register'"
            block
            color="primary"
            type="submit"
        />
      </div>
    </UForm>
  </div>
</template>