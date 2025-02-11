<script setup>
import {init} from "@aptabase/web";

init("A-EU-9438518681");
</script>


<template>
  <div class="flex flex-col items-center">
    <h1
      class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[var(--ui-primary)] to-[var(--ui-secondary)]"
    >
      Home
    </h1>
    <p class="mt-4">Welcome to the home page</p>
    <div class="mt-4">
      <UButton class="mr-4" label="Navigate to profile" to="/profile" />
      <UButton color="secondary" label="Navigate to sign in page" to="/login" />
    </div>
  </div>
</template>