<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <header>
    <h1>My App</h1>
    <nav>
      <ul>
        <li>
          <ULink to="/">Home</ULink>
        </li>
        <template v-if="!user">
          <li>
            <ULink to="/login">Login</ULink>
          </li>
          <li>
            <ULink to="/register">Register</ULink>
          </li>
        </template>
        <template v-else>
          <li>
            <ULink to="/profile">Profile</ULink>
          </li>
        </template>
        <ColorModeButton/>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

nav ul {
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>