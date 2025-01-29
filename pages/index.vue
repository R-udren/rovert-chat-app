<template>
  <div class="flex flex-col items-center">
    <h1 class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 via-blue-400 to-cyan-500">Home</h1>
    <p class="mt-4">Welcome to the home page</p>
    <div class="space-x-4 mt-4">
      <UButton label="Navigate to profile"
               to="/profile"
      />
      <UButton
          color="secondary"
          label="Navigate to sign in page"
          to="/login"
      />
    </div>
  </div>
</template>