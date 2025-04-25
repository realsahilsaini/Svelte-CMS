<script>
  import { onMount } from 'svelte';
  import { fetchPosts } from '$lib/api';
  import { marked } from 'marked';
  
  let posts = [];
  let isLoading = true;
  let error = null;
  let totalSales = 0;
  // Fetch posts on mount of the component 
  onMount(async () => {
    try {
      posts = await fetchPosts();
      // console.log(posts);

      // Calculate total sales from posts
      posts.forEach(customer => {
        //This returns obejct with monthly sales with key as month and value as sales. Now get the sum of all the values.
        const monthlySales = customer.transactionByMonth;
        
        // Get the sum of all values in the object
        totalSales = Object.values(monthlySales).reduce((acc, value) => {
          return acc + value;
        }, 0);

        totalSales = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(totalSales);
    
        // console.log(totalSales);
        
      //  console.log(customer.transactionByMonth)
      });

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

<div class="container mx-auto">
  <section class="mt-8 border border-gray-400 dark:border-neutral-400 px-4 py-2 text-center rounded-lg">
    <h2 class="font-bold text-2xl">Welcome to the CSM Application</h2>
    <p class="font-extralight text-xs dark:text-gray-500">Built with
      <strong class="text-gray-400">Svelte</strong> and <strong class="text-gray-400">Strapi</strong>.</p>
  </section>
  
  
  <section class="grid grid-cols-2 gap-2 p-4 h-42 border border-gray-400 dark:border-neutral-400 rounded-lg mt-8">
  
    <div class="shadow-[inset_0px_0px_6px_3px_rgba(149,_157,_165,_0.2)] p-4 rounded-lg dark:border dark:border-gray-600">
      <h2 class="text-2xl font-light">Total Customer</h2>
      <p class="font-bold mt-4 text-2xl">
        {posts.length}
      </p>
    </div>
    
    <div class="shadow-[inset_0px_0px_6px_3px_rgba(149,_157,_165,_0.2)] p-4 rounded-lg dark:border dark:border-gray-600">
      <h2 class="text-2xl font-light">Total Sales</h2>
      <p class="font-bold mt-4 text-2xl">
        {totalSales}
      </p>
    </div>
  
    
  
  </section>
  
  <section class="mt-8 container">
    <h2 class="text-2xl font-bold mb-4">Customer List</h2>
    
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
          <div class="card bg-stone-200 dark:bg-slate-700 py-2 px-2 rounded-md border border-gray-300 dark:border dark:border-neutral-400">
            <h3 class="font-bold mb-2">{post.title}</h3>
            <!-- {#if post.image?.url}
              <img 
                src={`http://localhost:1337${post.image.url}`} 
                alt={"something"}
                style="width: 100%; height: auto; margin-bottom: 1rem;"
                class="rounded-md"
              />
            {/if} -->
            <div>
              {@html marked(post.content[0].children[0].text?.substring(0, 150) + '...' || '')}
            </div>
            <a href={`/posts/${post.documentId}`} class="font-bold underline text-blue-500 dark:text-blue-300">Read More</a>
          </div>
        {/each}
      </div>
      
      <div class="mt-8">
        <a href="/posts" class="mx-auto bg-gray-800 dark:border dark:border-neutral-400 text-white px-1.5 py-2 rounded-md">View All Customers</a>
      </div>
    {/if}
  </section>
</div>

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