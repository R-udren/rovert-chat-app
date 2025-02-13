<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<template>
  <header class="flex items-center justify-between px-4 py-3 shadow-sm">
    <div class="flex items-center">
      <ULink
        class="px-3 py-1 rounded-full font-bold text-xl tracking-wider"
        to="/"
      >
        ChatApp
      </ULink>
    </div>
    <div class="flex items-center ml-4">
      <nav>
        <ul class="flex mr-4">
          <template v-if="!user">
            <li>
              <UButton
                color="primary"
                label="Sign In"
                size="lg"
                to="/login"
                variant="outline"
              />
            </li>
          </template>
          <template v-else>
            <li>
              <ULink class="hover:underline transition" to="/profile">
                Profile
              </ULink>
            </li>
          </template>
        </ul>
      </nav>
      <ColorModeButton />
    </div>
  </header>
</template>
