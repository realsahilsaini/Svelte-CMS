<script>
  import { onMount } from 'svelte';
  import { fetchPostById } from '$lib/api';
  import { marked } from 'marked';
  
  export let data;

  
  let post = null;
  let isLoading = true;
  let error = null;
  
  onMount(async () => {
    try {
      console.log(data);
      post = await fetchPostById(data.id);
      isLoading = false;
    } catch (err) {
      error = err.message;
      isLoading = false;
    }
  });
</script>

<svelte:head>
  <title>{post ? post.title : 'Loading Post'} | My CSM Application</title>
</svelte:head>

<div class="post-container">
  {#if isLoading}
    <p>Loading post...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else if !post}
    <p class="error">Post not found</p>
    <a href="/posts" class="button">Back to Posts</a>
  {:else}
    <div class="post-header">
      <h2>{post.title}</h2>
      {#if post.publishedAt}
        <div class="post-date">
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </div>
      {/if}
    </div>
    
    {#if post.image?.url}
      <div class="post-image-container">
        <img 
          src={`http://localhost:1337${post.image?.url}`} 
          alt={post.title}
          class="post-image"
        />
      </div>
    {/if}
    
    <div class="post-content">
      {@html marked(post.content[0].children[0].text || '')}
    </div>
    
    <div class="post-footer">
      <a href="/posts" class="mx-auto bg-gray-800 text-white px-1.5 py-2 rounded-md">Back to Posts</a>
    </div>
  {/if}
</div>

<style>
  .error {
    color: red;
  }
  
  .post-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .post-header {
    margin-bottom: 1.5rem;
  }
  
  .post-date {
    color: #666;
  }
  
  .post-image-container {
    margin-bottom: 2rem;
  }
  
  .post-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .post-content {
    line-height: 1.8;
    margin-bottom: 2rem;
  }
  
  .post-content :global(h2) {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .post-content :global(p) {
    margin-bottom: 1rem;
  }
  
  .post-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
</style>