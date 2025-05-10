<script>
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
  import '../app.css';
</script>



<div class="app">
  <header>
    <div class="container">
      <a href="/" class="font-bold border-2 py-1 px-2 border-stone-500 rounded">Customer Management System</a>
      <div class="flex justify-between items-center gap-2">
        <nav>
          <a href="/">Home</a>
          <a href="/posts">Customers</a>
          <a href="/admin">Admin</a>
        </nav>
        <DarkModeToggle/>
      </div>
    </div>
  </header>
  
  <main class=" dark:bg-gray-900 dark:text-neutral-100">
    <slot />
  </main>
  
  <footer class="dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 dark:text-gray-600 font-extralight">
    <div class="container">
      <p style="text-align: center;">&copy; {new Date().getFullYear()} Sahil Saini</p>
    </div>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  header {
    background-color: #333;
    color: white;
    padding: 1rem 0;
  }
  
  header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  nav a {
    color: white;
    margin-left: 1rem;
    text-decoration: none;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  
  main {
    flex: 1;
    padding: 2rem 0;
  }
  
  footer {
    /* background-color: #f5f5f5; */
    padding: 1rem 0;
    margin-top: auto;
  }
</style>