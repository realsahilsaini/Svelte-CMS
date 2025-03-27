<script>
  import '../app.css';
</script>



<div class="app">
  <header>
    <div class="container">
      <h1>Customer Management System</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/posts">Customers</a>
        <a href="/admin">Admin</a>
      </nav>
    </div>
  </header>
  
  <main class="container">
    <slot />
  </main>
  
  <footer>
    <div class="container">
      <p style="text-align: center;">&copy; {new Date().getFullYear()} My CSM Application</p>
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
    background-color: #f5f5f5;
    padding: 1rem 0;
    margin-top: auto;
  }
</style>