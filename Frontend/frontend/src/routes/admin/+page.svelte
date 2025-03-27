<script>
  import { onMount } from 'svelte';
  import { fetchPosts, deletePost } from '$lib/api';
  
  let posts = [];
  let isLoading = true;
  let error = null;
  
  onMount(async () => {
    await loadPosts();
  });
  
  async function loadPosts() {
    try {
      isLoading = true;
      posts = await fetchPosts();
      // console.log(posts);
      isLoading = false;
    } catch (err) {
      error = err.message;
      isLoading = false;
    }
  }
  
  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        await loadPosts();
        alert('Post deleted successfully');
      } catch (err) {
        alert('Error deleting post: ' + err.message);
      }
    }
  }
</script>

<svelte:head>
  <title>Admin Dashboard | My CSM Application</title>
</svelte:head>

<div class="mt-8">
  <h2 class="font-bold">Admin Dashboard</h2>
  
  <div class="font-bold bg-emerald-800 w-fit text-white px-1.5 py-2 rounded-md">
    <a href="/admin/create" class="button primary">Create New Customer</a>
  </div>
  
  <div class="mt-4">
    <h3 class="font-bold">Manage Customer</h3>
    
    {#if isLoading}
      <p>Loading customer...</p>
    {:else if error}
      <p class="error">Error: {error}</p>
    {:else if posts.length === 0}
      <p>No customer found. Create your first customer!</p>
    {:else}
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each posts as post}
            <tr>
              <td>{post.title}</td>
              <td>
                {post.publishedAt 
                  ? new Date(post.publishedAt).toLocaleDateString() 
                  : 'Draft'}
              </td>
              <td class="actions">
                <a href={`/posts/${post.documentId}`} class="button small">View</a>
                <a href={`/admin/edit/${post.documentId}`} class="button small primary">Edit</a>
                <button class="small danger text-white" on:click={() => handleDelete(post.documentId)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  
  .admin-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .admin-table th, .admin-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .admin-table th {
    background-color: #f5f5f5;
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .button.small, button.small {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
  
  .danger {
    background-color: #e53e3e;
  }
  
  .danger:hover {
    background-color: #c53030;
  }
</style>