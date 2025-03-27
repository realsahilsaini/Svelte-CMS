<script>
  import { onMount } from 'svelte';
  import { fetchPosts } from '$lib/api';
  import { marked } from 'marked';
  
  let posts = [];
  let isLoading = true;
  let error = null;
  
  // Fetch posts on mount of the component 
  onMount(async () => {
    try {
      posts = await fetchPosts();
      isLoading = false;
    } catch (err) {
      error = err.message;
      isLoading = false;
    }
  });
</script>

<svelte:head>
  <title>Home | My CSM Application</title>
</svelte:head>

<section class="mt-8 bg-gray-300 px-4 py-2 text-center rounded-lg">
  <h2 class="font-bold">Welcome to the CSM Application</h2>
  <p class="font-light text-xs">This is a simple customer management system built with Svelte and Strapi.</p>
</section>

<section class="mt-8">
  <h2 class="text-2xl font-bold">Customer List</h2>
  
  {#if isLoading}
    <p>Loading customer...</p>
    <div class="loader"></div>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else if posts.length === 0}
    <p>No customer found. Create some in the admin section!</p>
  {:else}
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each posts as post}
        <div class="card bg-stone-200 py-2 px-2 rounded-md border border-gray-300">
          <h3 class="font-bold mb-2">{post.title}</h3>
          {#if post.image?.url}
            <img 
              src={`http://localhost:1337${post.image.url}`} 
              alt={"something"}
              style="width: 100%; height: auto; margin-bottom: 1rem;"
              class="rounded-md"
            />
          {/if}
          <div>
            {@html marked(post.content[0].children[0].text?.substring(0, 150) + '...' || '')}
          </div>
          <a href={`/posts/${post.documentId}`} class="font-bold underline text-blue-500">Read More</a>
        </div>
      {/each}
    </div>
    
    <div class="mt-8">
      <a href="/posts" class="mx-auto bg-gray-800 text-white px-1.5 py-2 rounded-md">View All Customers</a>
    </div>
  {/if}
</section>

<style>
  .error {
    color: red;
  }
  /* HTML: <div class="loader"></div> */
.loader {
  width: 120px;
  height: 20px;
  -webkit-mask:linear-gradient(90deg,#000 70%,#0000 0) 0/20%;
  background:
   linear-gradient(#000 0 0) 0/0% no-repeat
   #ddd;
  animation: l4 2s infinite steps(6);
}
@keyframes l4 {
    100% {background-size:120%}
}
</style>