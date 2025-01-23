<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <header>
    <h1>My App</h1>
    <nav>
      <ul>
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <template v-if="!user">
          <li>
            <nuxt-link to="/login">Login</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/register">Register</nuxt-link>
          </li>
        </template>
        <template v-else>
          <li>
            <nuxt-link to="/profile">Profile</nuxt-link>
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

nav ul li {
  list-style: none;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>