<script lang="ts" setup>
const state = reactive({
  email: '',
  password: '',
  isLogin: true
});

const router = useRouter();
const toast = useToast();
const {auth} = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    router.push('/');
  }
});

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

async function handleSubmit() {
  // Prevent form submission if validation fails
  const errors = await validate(state);
  if (errors.length > 0) return;

  try {
    const response = state.isLogin
        ? await auth.signInWithPassword({
          email: state.email,
          password: state.password
        })
        : await auth.signUp({
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
  <div class="min-h-[70vh] w-full flex items-center justify-center px-4">
    <div class="w-full max-w-md rounded-xl shadow-lg p-6 space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold">
          {{ state.isLogin ? 'Welcome Back' : 'Create Account' }}
        </h1>
        <p class="mt-2">
          {{ state.isLogin ? 'Sign in to your account' : 'Start your journey with us' }}
        </p>
      </div>

      <UButton
          block
          class="relative overflow-hidden group hover:shadow-md transition-all py-2"
          color="neutral"
          icon="i-mdi-github"
          size="lg"
          variant="soft"
          @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })"
      >
        <div class="flex items-center justify-center gap-3">
          <i class="i-mdi-github text-xl"/>
          <span>Continue with GitHub</span>
        </div>
      </UButton>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-zinc-200 dark:border-zinc-700"/>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white dark:bg-zinc-800 text-zinc-500">
            Or continue with email
          </span>
        </div>
      </div>

      <UForm
        :state="state"
        :validate="validate"
        @submit="handleSubmit"
      >
        <div class="h-24">
          <UFormField
              class="w-full"
            label="Email address"
            name="email"
          >
            <UInput
                v-model="state.email"
                class="w-full rounded-lg mt-2"
                placeholder="you@example.com"
                size="lg"
                type="email"
            />
          </UFormField>
        </div>

        <div class="h-24">
          <UFormField
              class="w-full"
            label="Password"
            name="password"
          >
            <UInput
                v-model="state.password"
                class="w-full rounded-lg mt-2"
                placeholder="••••••••"
                size="lg"
                type="password"
            />
          </UFormField>
        </div>

        <UButton
            :label="state.isLogin ? 'Sign In' : 'Create Account'"
            block
            class="rounded-lg"
            color="primary"
            loading-auto
            size="lg"
            type="submit"
        />
      </UForm>

      <div class="text-center">
        <UButton
            :label="state.isLogin ? 'Need an account?' : 'Already have an account?'"
            class="text-sm"
            color="neutral"
            variant="link"
            @click="state.isLogin = !state.isLogin"
        />
      </div>
    </div>
  </div>
</template>