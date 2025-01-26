<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<template>
  <header class="flex items-center justify-between px-4 py-3 shadow-sm">
    <div class="flex items-center space-x-4">
      <ULink class="px-3 py-1 rounded-full font-bold text-xl tracking-wider" to="/">
        ChatApp
      </ULink>
    </div>
    <div class="flex items-center space-x-4">
      <nav>
        <ul class="flex space-x-4">
          <template v-if="!user">
            <li>
              <UButton
                  class="px-3 py-1"
                  color="primary"
                  label="Login"
                  size="sm"
                  to="/login"
                  variant="solid"
              />
            </li>
          </template>
          <template v-else>
            <li>
              <ULink
                  class="hover:text-blue-500 transition"
                  to="/profile"
              >
                Profile
              </ULink>
            </li>
          </template>
        </ul>
      </nav>
      <ColorModeButton/>
    </div>
  </header>
</template>